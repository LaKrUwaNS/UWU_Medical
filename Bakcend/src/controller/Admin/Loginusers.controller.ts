import { Request, Response } from "express";
import { Session } from "../../models/session.model";
import { TryCatch } from "../../utils/Error/ErrorHandler";
import { sendResponse } from "../../utils/response";
import Student from "../../models/Student.model";
import Doctor from "../../models/Doctor.model";
import { Staff } from "../../models/Staff.model";

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


export const GetAllStudents = TryCatch(async (req: Request, res: Response) => {
    const students = await Student.find().select('-password'); // exclude password for security
    return sendResponse(res, 200, true, "Students fetched successfully", students);
});

export const GetAllDoctors = TryCatch(async (req: Request, res: Response) => {
    const doctors = await Doctor.find().select('-password'); // exclude sensitive fields
    return sendResponse(res, 200, true, "Doctors fetched successfully", doctors);
});

export const GetAllStaff = TryCatch(async (req: Request, res: Response) => {
    const staffMembers = await Staff.find().select('-password'); // exclude sensitive fields if any
    return sendResponse(res, 200, true, "Staff fetched successfully", staffMembers);
});