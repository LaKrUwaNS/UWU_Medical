import { Response } from "express";
import { AuthenticatedRequest } from "../../../middleware/CheckLogin/isDotorlogin";
import { TryCatch } from "../../../utils/Error/ErrorHandler";
import Doctor from "../../../models/Doctor.model";
import OTP from "../../../models/OTP.model";
import { SendMail } from "../../../config/Nodemailer";
import { CreateOTP } from "../../../utils/OTPGen";
import { generateAccountChangeOtpEmailHtml } from "../../../const/Mail/UpdateUser.templete";



// ---------------------
// Get Doctor Data
// ---------------------
export const DoctorDataGET = TryCatch(async (req: AuthenticatedRequest, res: Response) => {
    if (!req.user?.id) {
        return res.status(401).json({ success: false, message: "Unauthorized: User not found" });
    }

    const doctorData = await Doctor.findById(req.user.id).select("-password -securityCode");
    if (!doctorData) {
        return res.status(404).json({ success: false, message: "Doctor data not found" });
    }

    return res.status(200).json({ success: true, message: "Doctor data fetched", data: doctorData });
});

// ---------------------
// Send OTP to Email for Verification
// ---------------------
export const DoctorDataEdit = TryCatch(async (req: AuthenticatedRequest, res: Response) => {
    const { email } = req.body;

    if (!email) {
        return res.status(400).json({ success: false, message: "Email is required to send OTP" });
    }

    const user = req.user;
    if (!user?.id) {
        return res.status(401).json({ success: false, message: "Unauthorized: User not found" });
    }

    const generatedOTP = CreateOTP();
    const OTPexpire = new Date(Date.now() + 5 * 60 * 1000 * 3); // 15 mins

    await OTP.deleteMany({ email, Type: "Email" });

    await OTP.create({
        email,
        OTP: generatedOTP,
        OTPexpire,
        Type: "Email"
    });

    await SendMail(
        email,
        "OTP for updating doctor info",
        generateAccountChangeOtpEmailHtml(user.fullName, generatedOTP)
    );

    return res.status(200).json({ success: true, message: "OTP sent to email" });
});



// ---------------------
// Verify OTP & Update Doctor Data
// ---------------------
export const VerifyAndUpdateDoctor = TryCatch(async (req: AuthenticatedRequest, res: Response) => {
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
        professionalEmail: email,
    };

    const doctor = await Doctor.findByIdAndUpdate(userId, updateData, { new: true });
    if (!doctor) {
        return res.status(404).json({ success: false, message: "Doctor not found" });
    }

    await OTP.deleteOne({ _id: otpRecord._id });

    return res.status(200).json({ success: true, message: "Doctor data updated successfully", data: doctor });
});
