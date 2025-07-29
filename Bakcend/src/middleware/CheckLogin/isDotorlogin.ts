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

export const isDoctorLogin = TryCatch(async (req: AuthenticatedRequest, res: Response) => {
    const accessToken = req.cookies.accessToken;
    if (!accessToken) {
        return sendResponse(res, 401, false, "Not logged in");
    }

    const session = await Session.findOne({
        accessToken,
        sessionType: "LOGIN",
        expireAt: { $gt: new Date() },
    });

    if (!session) {
        return sendResponse(res, 401, false, "Session not found or expired");
    }

    const doctor = await Doctor.findById(session.doctorId);
    if (!doctor) {
        return sendResponse(res, 404, false, "Doctor not found");
    }

    return sendResponse(res, 200, true, "Doctor is logged in", {
        doctor: {
            id: doctor._id,
            fullName: doctor.fullName,
            userName: doctor.userName,
            photo: doctor.photo,
            professionalEmail: doctor.professionalEmail,
        },
    }, true);
});