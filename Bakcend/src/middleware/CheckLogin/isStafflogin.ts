import { Request, Response, NextFunction } from "express";
import { TryCatch } from "../../utils/Error/ErrorHandler";
import { Staff } from "../../models/Staff.model";
import { sendResponse } from "../../utils/response";
import { Session } from "../../models/session.model";
import { decodeAccessToken, generateAccessToken } from "../../utils/WebToken";
import { sendTokenAsCookie } from "../../utils/Cookies";

export interface AuthenticatedStaffRequest extends Request {
    user?: {
        id: string;
        name: string;
        email: string;
        jobTitle: string;
    };
}

export const isStaffLoggedIn = TryCatch(
    async (req: AuthenticatedStaffRequest, res: Response, next: NextFunction) => {
        let token = req.cookies.accessToken as string | undefined;

        if (!token) {
            return sendResponse(res, 401, false, "Unauthorized: Please log in");
        }

        // 1) Decode & verify JWT
        const staffId = decodeAccessToken(token);
        if (!staffId) {
            return sendResponse(res, 401, false, "Unauthorized: Invalid or expired token");
        }

        // 2) Look for an active session
        const session = await Session.findOne({ accessToken: token });
        if (!session || session.sessionType !== "LOGIN" || !session.isActive?.()) {
            return sendResponse(res, 401, false, "Unauthorized: Session not found or expired");
        }

        // 3) Fetch the staff record
        const staff = await Staff.findById(staffId);
        if (!staff) {
            return sendResponse(res, 404, false, "Staff not found");
        }

        // Optional: Refresh session expiry & token for sliding sessions
        // session.expireAt = new Date(Date.now() + 15 * 60 * 1000);
        // await session.save();
        // token = generateAccessToken(staff._id.toString());
        // sendTokenAsCookie(res, token);

        // 4) Attach staff user to request
        req.user = {
            id: staff._id as string,
            name: staff.name,
            email: staff.email,
            jobTitle: staff.jobTitle
        };

        next();
    }
);
