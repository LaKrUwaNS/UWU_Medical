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
import Doctor from "../../models/Doctor.model";
import { sendResponse } from "../../utils/response";
import { AuthenticatedRequest } from "../../middleware/CheckLogin/isDotorlogin";
import { generateWelcomeEmailHtml } from "../../const/Mail/Welcome.templete";

//! Testing Controllers
// ✅ Test Mail
export const TestMail = TryCatch(async (req: Request, res: Response) => {
    const { Email } = req.body;
    await SendMail(Email, "Test Email", "<h1>This is a test mail</h1>");
    res.status(200).json({ message: "Mail sent successfully" });
});

// ✅ Test Multer
export const TestMulter = TryCatch(async (req: Request, res: Response) => {
    const file = req.file as Express.Multer.File;

    if (!file) {
        return res.status(400).json({ message: "No file uploaded" });
    }

    // Upload the file to Cloudinary
    const uploadResult = await cloudinary.uploader.upload(file.path, {
        folder: "test_uploads", // optional folder name on Cloudinary
    });

    res.status(200).json({
        message: "File uploaded successfully to Cloudinary",
        cloudinaryResult: uploadResult,
    });
});



// !✅ Register Doctor
export const RegisterDoctor = TryCatch(async (req: Request, res: Response) => {
    const {
        userName,
        fullName,
        password,
        personalEmail,
        professionalEmail,
        securityCode,
        title
    } = req.body;


    if (!userName || !fullName || !password || !personalEmail || !professionalEmail || !securityCode || !title) {
        return sendResponse(res, 400, false, "All fields are required");
    }

    /*if (VERIFY_CODE !== securityCode) {
        return sendResponse(res, 400, false, "Invalid security code");
    }*/
    const existingDoctor = await Doctor.findOne({ professionalEmail: professionalEmail });

    if (existingDoctor) {
        return sendResponse(res, 400, false, "User already exists");
    }

    const newDoctor = new Doctor({
        userName,
        fullName,
        password,
        personalEmail,
        professionalEmail,
        securityCode,
        title,
        expireAt: OneDayFromNow()
    });

    await newDoctor.save();

    const otpCode = CreateOTP();

    await OTP.create({
        email: professionalEmail,
        OTP: otpCode,
        OTPexpire: FifteenMinutesFromNow(),
        Type: "Email",
    });

    await SendMail(professionalEmail, "OTP Verification", generateOtpEmailHtml(otpCode));

    return sendResponse(res, 201, true, "Doctor registered successfully, OTP sent");
});



// !✅ Profile Photo Upload
export const ProfilePhotoupload = TryCatch(async (req: AuthenticatedRequest, res: Response) => {
    const user = req.user;

    const file = req.file as Express.Multer.File | undefined;
    if (!file) {
        return sendResponse(res, 400, false, "No file uploaded");
    }

    if (!user || !user.id) {
        return sendResponse(res, 401, false, "Unauthorized: User not found");
    }

    const uploadResult = await cloudinary.uploader.upload(file.path, {
        folder: "doctors_photos",
    });

    const FindDoctor = await Doctor.findById(user.id);
    if (!FindDoctor) {
        return sendResponse(res, 404, false, "Doctor not found");
    }

    FindDoctor.photo = uploadResult.url as string;
    await FindDoctor.save();

    return sendResponse(res, 200, true, "File uploaded successfully to Cloudinary", uploadResult);
});


// !✅ Verify Register OTP
export const VerifyRegisterOTP = TryCatch(async (req: Request, res: Response) => {
    const { email, otp } = req.body;

    // Check if OTP record exists
    const otpRecord = await OTP.findOne({ email, Type: "Email" });
    if (!otpRecord) {
        return sendResponse(res, 400, false, "Invalid or expired OTP")
    }

    // Validate OTP and expiry
    const isOtpValid = await otpRecord.compareOtp(otp);
    const isOtpExpired = otpRecord.OTPexpire < new Date();
    if (!isOtpValid || isOtpExpired) {
        return sendResponse(res, 400, false, "Invalid or expired OTP")
    }

    // Find the doctor by email
    const doctor = await Doctor.findOne({ professionalEmail: email });
    if (!doctor) {
        return sendResponse(res, 404, false, "Doctor not found")
    }

    // Mark as verified
    doctor.Verified = true;
    doctor.expireAt = null;
    await doctor.save();

    // Delete OTP after successful verification
    await otpRecord.deleteOne();

    const accessToken = generateAccessToken(doctor._id.toString());
    sendTokenAsCookie(res, accessToken);

    await Session.create({
        doctorId: doctor._id,
        accessToken,
        sessionType: "LOGIN",
        expireAt: OneDayFromNow(),
        date: new Date(),
    });

    // send welcome email
    await SendMail(doctor.professionalEmail, "Welcome to Our Platform", generateWelcomeEmailHtml(doctor.fullName));

    // Return success response
    return sendResponse(res, 200, true, "OTP verified successfully")
});


// !✅ Doctor Login
export const DoctorLogging = TryCatch(async (req: Request, res: Response) => {
    const { email, password } = req.body;

    const Token = req.cookies.accessToken;
    if (Token) {
        const FindSession = await Session.findOne({ accessToken: Token });
        if (FindSession)
            return sendResponse(res, 400, true, "User already logged in");
    }

    const FindUser = await Doctor.findOne({ professionalEmail: email });
    if (!FindUser)
        return sendResponse(res, 404, false, "No user found");

    const Checkpassword = await FindUser.Doctorpasswordcompare(password);
    if (!Checkpassword)
        return sendResponse(res, 400, false, "Invalid email or password");

    const accessToken = generateAccessToken(FindUser._id.toString());

    // ✅ ONLY sets cookie
    sendTokenAsCookie(res, accessToken);

    await Session.create({
        doctorId: FindUser._id,
        accessToken,
        sessionType: "LOGIN",
        expireAt: OneDayFromNow(),
        date: new Date(),
    });

    return sendResponse(res, 200, true, "Login successful");
});



// !✅ Logout
export const Logout = TryCatch(async (req: Request, res: Response) => {
    const Token = req.cookies.accessToken;
    if (!Token)
        return sendResponse(res, 400, false, "No token found")

    const FindSession = await Session.findOne({ accessToken: Token });
    if (!FindSession)
        return sendResponse(res, 404, false, "No session found")

    await FindSession.deleteOne();
    res.clearCookie("accessToken");
    return sendResponse(res, 200, true, "Logout successfully")
});


// !✅ Forgot Password
export const ForgotPassword = TryCatch(async (req: Request, res: Response) => {
    const { email } = req.body;

    const FindUser = await Doctor.findOne({ professionalEmail: email });
    if (!FindUser)
        return sendResponse(res, 404, false, "No user found")

    const otp = CreateOTP();
    await SendMail(email, "Password Reset OTP", generateResetOtpEmailHtml(otp));

    await OTP.create({
        email,
        OTP: otp,
        OTPexpire: FifteenMinutesFromNow(),
        Type: "Reset",
    });

    return sendResponse(res, 200, true, "OTP has been sent")
});

// !✅ Reset Password
export const ResetPassword = TryCatch(async (req: Request, res: Response) => {
    const { email, otp, password: Newpassword } = req.body;

    const otpRecord = await OTP.findOne({ email, Type: "Reset" });
    if (!otpRecord) {
        return sendResponse(res, 400, false, "Invalid or expired OTP")
    }

    const isOtpValid = await otpRecord.compareOtp(otp);
    const isOtpExpired = otpRecord.OTPexpire < new Date();
    if (!isOtpValid || isOtpExpired) {
        return sendResponse(res, 400, false, "Invalid or expired OTP")
    }

    const FindUser = await Doctor.findOne({ professionalEmail: email });
    if (!FindUser)
        return sendResponse(res, 404, false, "No user found")

    FindUser.password = Newpassword;
    await FindUser.save();

    await otpRecord.deleteOne();

    return sendResponse(res, 200, true, "Password reset successfully")
});

// !check Doctor is Login
export const CheckIsDoctorLoggedIn = TryCatch(async (req: AuthenticatedRequest, res: Response) => {
    const token = req.cookies.accessToken;

    if (!token) {
        return sendResponse(res, 401, false, "Not logged in");
    }

    const session = await Session.findOne({ accessToken: token, sessionType: "LOGIN" });
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
            professionalEmail: doctor.professionalEmail
        }
    });
});

