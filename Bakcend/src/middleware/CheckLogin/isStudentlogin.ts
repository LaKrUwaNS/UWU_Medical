import { Request, Response, NextFunction } from "express";
import { TryCatch } from "../../utils/Error/ErrorHandler";
import Student from "../../models/Student.model";
import { sendResponse } from "../../utils/response";
import { Session } from "../../models/session.model";

export interface AuthenticatedStudentRequest extends Request {
    user?: {
        id: string;
        name: string;
        indexNumber: string;
        degree: string;
        photo?: string;
    };
}

export const isStudentLogin = TryCatch(
    async (req: AuthenticatedStudentRequest, res: Response, next: NextFunction) => {
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

        // Fetch student info using session.studentId
        const student = await Student.findById(session.studentId);
        if (!student) {
            return sendResponse(res, 404, false, "Student not found");
        }

        // Attach student info to req.user
        req.user = {
            id: student.id.toString(),
            name: student.name,
            indexNumber: student.indexNumber,
            degree: student.degree as string,
            photo: student.photo
        };

        next();
    }
);
