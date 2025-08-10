import { Request, Response } from "express";
import { Session } from "../../models/session.model";
import { TryCatch } from "../../utils/Error/ErrorHandler";

export const LoginUsers = TryCatch(async (req: Request, res: Response) => {
    const sessions = await Session.find({
        sessionType: "LOGIN",
        expireAt: { $gt: new Date() },
    })
        .populate("doctorId", "fullName title professionalEmail mobileNumber photo")
        .populate("staffId", "name title email jobTitle mobileNumber photo")
        .populate("studentId", "name indexNumber universityEmail contactNumber photo")
        .sort({ date: -1 });

    const data = sessions.map((session) => {
        let userType = "";
        let userData: any = null;

        if (session.doctorId) {
            userType = "Doctor";
            userData = session.doctorId;
        } else if (session.staffId) {
            userType = "Staff";
            userData = session.staffId;
        } else if (session.studentId) {
            userType = "Student";
            userData = session.studentId;
        } else {
            userType = "Unknown";
        }

        return {
            sessionId: session._id,
            userType,
            user: userData,
            loginDate: session.date,
            accessToken: session.accessToken,
            expireAt: session.expireAt,
            active: session.expireAt > new Date(),
        };
    });

    res.status(200).json({
        success: true,
        count: data.length,
        users: data,
    });
});
