import { Request, Response, NextFunction } from "express";
import { TryCatch } from "../../utils/Error/ErrorHandler";
import Doctor from "../../models/Doctor.model";
import { sendResponse } from "../../utils/response";
import { Session } from "../../models/session.model";
import { decodeAccessToken, generateAccessToken } from "../../utils/WebToken";
import { sendTokenAsCookie } from "../../utils/Cookies";

export interface AuthenticatedRequest extends Request {
    user?: {
        id: string;
        userName: string;
        fullName: string;
        professionalEmail: string;
    };
}

export const isDoctorLogin = TryCatch(
    async (req: AuthenticatedRequest, res: Response, next: NextFunction) => {
        let token = req.cookies.accessToken as string | undefined;

        if (!token) {
            return sendResponse(res, 401, false, "Unauthorized: Please log in");
        }

        // 1) Decode & verify JWT
        const doctorId = decodeAccessToken(token);
        if (!doctorId) {
            return sendResponse(res, 401, false, "Unauthorized: Invalid or expired token");
        }

        // 2) Look for an active session
        const session = await Session.findOne({ accessToken: token });
        if (!session || session.sessionType !== "LOGIN" || !session.isActive?.()) {
            return sendResponse(res, 401, false, "Unauthorized: Session not found or expired");
        }

        // 3) Fetch the doctor record
        const doctor = await Doctor.findById(doctorId);
        if (!doctor) {
            return sendResponse(res, 404, false, "Doctor not found");
        }

        // 4) (Optional) Refresh session expiry & token
        //    If you want sliding sessions, uncomment:
        // session.expireAt = new Date(Date.now() + 15 * 60 * 1000);
        // await session.save();
        // token = generateAccessToken(doctor._id.toString());
        // sendTokenAsCookie(res, token);

        // 5) Attach user and continue
        req.user = {
            id: doctor._id.toString(),
            userName: doctor.userName,
            fullName: doctor.fullName,
            professionalEmail: doctor.professionalEmail,
        };

        next();
    }
);
