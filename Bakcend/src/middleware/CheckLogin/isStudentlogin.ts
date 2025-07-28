import { Request, Response, NextFunction } from "express";
import { TryCatch } from "../../utils/Error/ErrorHandler";
import Student from "../../models/Student.model";
import { sendResponse } from "../../utils/response";
import { Session } from "../../models/session.model";
import { decodeAccessToken, generateAccessToken } from "../../utils/WebToken";
import { sendTokenAsCookie } from "../../utils/Cookies";

export interface AuthenticatedStudentRequest extends Request {
    user?: {
        id: string;
        name: string;
        indexNumber: string;
        degree: string;
    };
}

export const isStudentLoggedIn = TryCatch(
    async (req: AuthenticatedStudentRequest, res: Response, next: NextFunction) => {
        let token = req.cookies.accessToken as string | undefined;

        if (!token) {
            return sendResponse(res, 401, false, "Unauthorized: Please log in");
        }

        // Decode & verify JWT
        const studentId = decodeAccessToken(token);
        if (!studentId) {
            return sendResponse(res, 401, false, "Unauthorized: Invalid or expired token");
        }

        // Check active session
        const session = await Session.findOne({ accessToken: token });
        if (!session || session.sessionType !== "LOGIN" || !session.isActive?.()) {
            return sendResponse(res, 401, false, "Unauthorized: Session not found or expired");
        }

        // Fetch student record
        const student = await Student.findById(studentId);
        if (!student) {
            return sendResponse(res, 404, false, "Student not found");
        }

        // Optional: Refresh session expiry/token
        // session.expireAt = new Date(Date.now() + 15 * 60 * 1000);
        // await session.save();
        // token = generateAccessToken(student._id.toString());
        // sendTokenAsCookie(res, token);

        // Attach student to request
        req.user = {
            id: student._id as string,
            name: student.name,
            indexNumber: student.indexNumber,
            degree: student.degree
        };

        next();
    }
);
