import { Request, Response, NextFunction } from "express";
import { TryCatch } from "../../utils/Error/ErrorHandler";
import Doctor from "../../models/Doctor.model";
import { sendResponse } from "../../utils/response";
import { Session } from "../../models/session.model";

export interface AuthenticatedRequest extends Request {
    user?: {
        id: string;
        userName: string;
        fullName: string;
        professionalEmail: string;
        photo?: string;
    };
}

export const isDoctorLogin = TryCatch(
    async (req: AuthenticatedRequest, res: Response, next: NextFunction) => {
        const accessToken = req.cookies.accessToken;

        if (!accessToken) {
            return sendResponse(res, 401, false, "Not logged in");
        }

        // Find session with valid access token and not expired
        const session = await Session.findOne({
            accessToken,
            sessionType: "LOGIN",
            expireAt: { $gt: new Date() },
        });

        if (!session) {
            return sendResponse(res, 401, false, "Session not found or expired");
        }

        // Fetch doctor info from Doctor collection using session.doctorId
        const doctor = await Doctor.findById(session.doctorId);
        if (!doctor) {
            return sendResponse(res, 404, false, "Doctor not found");
        }

        // Attach doctor info to req.user
        req.user = {
            id: doctor._id.toString(),
            userName: doctor.userName,
            fullName: doctor.fullName,
            professionalEmail: doctor.professionalEmail,
            photo: doctor.photo,
        };

        next();
    }
);
