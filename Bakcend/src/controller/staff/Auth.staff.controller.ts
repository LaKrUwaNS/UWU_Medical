import { Request, Response } from "express";
import { TryCatch } from "../../utils/Error/ErrorHandler";
import { SendMail } from "../../config/Nodemailer";
import { generateOtpEmailHtml } from "../../const/Mail/OTP.templete";
import { generateResetOtpEmailHtml } from "../../const/Mail/ResepOTP.templete";
import { CreateOTP } from "../../utils/OTPGen";
import { sendTokenAsCookie } from "../../utils/Cookies";
import { generateAccessToken } from "../../utils/WebToken";
import { FifteenMinutesFromNow, OneDayFromNow } from "../../utils/Date";
import OTP from "../../models/OTP.model";
import { Session } from "../../models/session.model";
import { cloudinary } from "../../config/Claudenary";
import { Staff } from "../../models/Staff.model";
import { sendResponse } from "../../utils/response";
import { AuthenticatedRequest } from "../../middleware/CheckLogin/isDotorlogin";
import { generateWelcomeEmailHtml } from "../../const/Mail/Welcome.templete";

// ✅ Register Staff
export const RegisterStaff = TryCatch(async (req: Request, res: Response) => {
    const {
        name,
        title,
        email,
        password,
        jobTitle,
        mobileNumber,
        securityCode
    } = req.body;

    if (!name || !title || !email || !password || !jobTitle || !mobileNumber || !securityCode) {
        return sendResponse(res, 400, false, "All fields are required");
    }

    const existingStaff = await Staff.findOne({ email });
    if (existingStaff) {
        return sendResponse(res, 400, false, "Staff already exists");
    }

    const newStaff = new Staff({
        name,
        title,
        email,
        password,
        jobTitle,
        mobileNumber,
        securityCode,
        expireAt: OneDayFromNow()
    });

    await newStaff.save();

    const otpCode = CreateOTP();
    await OTP.create({
        email,
        OTP: otpCode,
        OTPexpire: FifteenMinutesFromNow(),
        Type: "Email"
    });

    await SendMail(email, "OTP Verification", generateOtpEmailHtml(otpCode));

    return sendResponse(res, 201, true, "Staff registered successfully, OTP sent");
});

// ✅ Verify Register OTP
export const VerifyStaffOTP = TryCatch(async (req: Request, res: Response) => {
    const { email, otp } = req.body;

    const otpRecord = await OTP.findOne({ email, Type: "Email" });
    if (!otpRecord) {
        return sendResponse(res, 400, false, "Invalid or expired OTP");
    }

    const isOtpValid = await otpRecord.compareOtp(otp);
    const isOtpExpired = otpRecord.OTPexpire < new Date();
    if (!isOtpValid || isOtpExpired) {
        return sendResponse(res, 400, false, "Invalid or expired OTP");
    }

    const staff = await Staff.findOne({ email }) as InstanceType<typeof Staff> | null;
    if (!staff) {
        return sendResponse(res, 404, false, "Staff not found");
    }

    staff.isVerified = true;
    staff.expireAt = null;
    await staff.save();

    await otpRecord.deleteOne();

    const accessToken = generateAccessToken(staff._id as string);
    sendTokenAsCookie(res, accessToken);

    await Session.create({
        doctorId: staff._id, // optional: rename model or session field
        accessToken,
        sessionType: "LOGIN",
        expireAt: OneDayFromNow(),
        date: new Date()
    });

    await SendMail(staff.email, "Welcome to Our Platform", generateWelcomeEmailHtml(staff.name));

    return sendResponse(res, 200, true, "OTP verified successfully");
});

// ✅ Staff Login
export const StaffLogin = TryCatch(async (req: Request, res: Response) => {
    const { email, password } = req.body;

    const token = req.cookies.accessToken;
    if (token) {
        const existingSession = await Session.findOne({ accessToken: token });
        if (existingSession)
            return sendResponse(res, 400, true, "User already logged in");
    }

    const staff = await Staff.findOne({ email });
    if (!staff)
        return sendResponse(res, 404, false, "No staff found");

    const isPasswordValid = await staff.comparePass(password);
    if (!isPasswordValid)
        return sendResponse(res, 400, false, "Invalid email or password");

    const accessToken = generateAccessToken(staff._id as string);
    sendTokenAsCookie(res, accessToken);

    await Session.create({
        doctorId: staff._id, // optional: rename model or session field
        accessToken,
        sessionType: "LOGIN",
        expireAt: OneDayFromNow(),
        date: new Date()
    });

    return sendResponse(res, 200, true, "Login successful");
});

// ✅ Forgot Password
export const StaffForgotPassword = TryCatch(async (req: Request, res: Response) => {
    const { email } = req.body;

    const staff = await Staff.findOne({ email });
    if (!staff)
        return sendResponse(res, 404, false, "No staff found");

    const otp = CreateOTP();
    await SendMail(email, "Password Reset OTP", generateResetOtpEmailHtml(otp));

    await OTP.create({
        email,
        OTP: otp,
        OTPexpire: FifteenMinutesFromNow(),
        Type: "Reset"
    });

    return sendResponse(res, 200, true, "OTP has been sent");
});

// ✅ Reset Password
export const StaffResetPassword = TryCatch(async (req: Request, res: Response) => {
    const { email, otp, password: newPassword } = req.body;

    const otpRecord = await OTP.findOne({ email, Type: "Reset" });
    if (!otpRecord)
        return sendResponse(res, 400, false, "Invalid or expired OTP");

    const isOtpValid = await otpRecord.compareOtp(otp);
    const isOtpExpired = otpRecord.OTPexpire < new Date();
    if (!isOtpValid || isOtpExpired)
        return sendResponse(res, 400, false, "Invalid or expired OTP");

    const staff = await Staff.findOne({ email });
    if (!staff)
        return sendResponse(res, 404, false, "No staff found");

    staff.password = newPassword;
    await staff.save();

    await otpRecord.deleteOne();

    return sendResponse(res, 200, true, "Password reset successfully");
});

// ✅ Logout
export const StaffLogout = TryCatch(async (req: Request, res: Response) => {
    const token = req.cookies.accessToken;
    if (!token)
        return sendResponse(res, 400, false, "No token found");

    const session = await Session.findOne({ accessToken: token });
    if (!session)
        return sendResponse(res, 404, false, "No session found");

    await session.deleteOne();
    res.clearCookie("accessToken");

    return sendResponse(res, 200, true, "Logout successfully");
});

// ✅ Profile Photo Upload
export const StaffPhotoUpload = TryCatch(async (req: AuthenticatedRequest, res: Response) => {
    const user = req.user;
    const file = req.file as Express.Multer.File | undefined;

    if (!file) {
        return sendResponse(res, 400, false, "No file uploaded");
    }

    if (!user || !user.id) {
        return sendResponse(res, 401, false, "Unauthorized: User not found");
    }

    const uploadResult = await cloudinary.uploader.upload(file.path, {
        folder: "staff_photos"
    });

    const staff = await Staff.findById(user.id);
    if (!staff) {
        return sendResponse(res, 404, false, "Staff not found");
    }

    staff.photo = uploadResult.url;
    await staff.save();

    return sendResponse(res, 200, true, "Photo uploaded successfully", uploadResult);
});
