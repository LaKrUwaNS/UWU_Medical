import { Response } from "express";
import { AuthenticatedStudentRequest } from "../../../middleware/CheckLogin/isStudentlogin";
import { TryCatch } from "../../../utils/Error/ErrorHandler";
import Student from "../../../models/Student.model";
import OTP from "../../../models/OTP.model";
import { SendMail } from "../../../config/Nodemailer";
import { CreateOTP } from "../../../utils/OTPGen";
import { generateAccountChangeOtpEmailHtml } from "../../../const/Mail/UpdateUser.templete";

// ---------------------
// Get Student Data
// ---------------------
export const StudentdataGET = TryCatch(async (req: AuthenticatedStudentRequest, res: Response) => {
    if (!req.user?.id) {
        return res.status(401).json({ success: false, message: "Unauthorized: User not found" });
    }

    const studentData = await Student.findById(req.user.id).select("-password");
    if (!studentData) {
        return res.status(404).json({ success: false, message: "Student data not found" });
    }

    return res.status(200).json({ success: true, message: "Student data fetched", data: studentData });
});

// ---------------------
// Send OTP to Email for Verification (only email required here)
// ---------------------
export const StudentDateEdit = TryCatch(async (req: AuthenticatedStudentRequest, res: Response) => {
    const { email } = req.body;

    if (!email) {
        return res.status(400).json({ success: false, message: "Email is required to send OTP" });
    }

    const user = req.user;
    if (!user?.id) {
        return res.status(401).json({ success: false, message: "Unauthorized: User not found" });
    }

    const generatedOTP = CreateOTP();
    const OTPexpire = new Date(Date.now() + 5 * 60 * 1000 * 3);

    await OTP.deleteMany({ email, Type: "Email" });

    await OTP.create({
        email,
        OTP: generatedOTP,
        OTPexpire,
        Type: "Email"
    });

    await SendMail(
        email,
        "OTP for updating student info",
        generateAccountChangeOtpEmailHtml(user.name, generatedOTP)
    );

    return res.status(200).json({ success: true, message: "OTP sent to email" });
});

// ---------------------
// Verify OTP & Update Student Data (email, otp and other data received here)
// ---------------------
export const VerifyandUpdate = TryCatch(async (req: AuthenticatedStudentRequest, res: Response) => {
    const userId = req.user?.id;
    if (!userId) {
        return res.status(401).json({ success: false, message: "Unauthorized: User not found" });
    }

    const { email, otp, ...updates } = req.body;

    if (!email || !otp) {
        return res.status(400).json({ success: false, message: "Email and OTP are required" });
    }

    const otpRecord = await OTP.findOne({
        email,
        Type: "Email",
        OTPexpire: { $gt: new Date() }
    });

    if (!otpRecord) {
        return res.status(400).json({ success: false, message: "Invalid or expired OTP" });
    }

    const isMatch = await otpRecord.compareOtp(otp);
    if (!isMatch) {
        return res.status(400).json({ success: false, message: "Invalid OTP" });
    }

    const updateData = {
        ...updates,
        email,
    };

    const student = await Student.findByIdAndUpdate(userId, updateData, { new: true });
    if (!student) {
        return res.status(404).json({ success: false, message: "Student not found" });
    }

    await OTP.deleteOne({ _id: otpRecord._id });

    return res.status(200).json({ success: true, message: "Student data updated successfully", data: student });
});
