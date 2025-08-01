import { Request, Response } from "express";
import { TryCatch } from "../../utils/Error/ErrorHandler";
import { sendResponse } from "../../utils/response";
import { generateAccessToken, generateRefreshToken, decodeAccessToken } from "../../utils/WebToken";
import { sendTokenCookies } from "../../utils/Cookies";
import { FifteenMinutesFromNow, OneDayFromNow } from "../../utils/Date";
import { cloudinary } from "../../config/Claudenary";
import { AuthenticatedStaffRequest } from "../../middleware/CheckLogin/isStafflogin";

import { Session } from "../../models/session.model";
import { Staff } from "../../models/Staff.model";
import OTP from "../../models/OTP.model";

// 📧 Email Utilities
import { SendMail } from "../../config/Nodemailer";
import { generateOtpEmailHtml } from "../../const/Mail/OTP.templete";
import { generateResetOtpEmailHtml } from "../../const/Mail/ResepOTP.templete";
import { generateWelcomeEmailHtml } from "../../const/Mail/Welcome.templete";
import { CreateOTP } from "../../utils/OTPGen";

// ✅ Register Staff (send OTP via email)
export const RegisterStaff = TryCatch(async (req: Request, res: Response) => {
    const {
        name,
        title,
        email,
        jobTitle,
        mobileNumber,
        securityCode,
        password
    } = req.body;

    // Check if already registered
    const existingStaff = await Staff.findOne({ email });
    if (existingStaff) {
        return sendResponse(res, 400, false, "Staff already registered");
    }

    const newStaff = new Staff({
        name,
        title,
        email,
        jobTitle,
        mobileNumber,
        password,
        securityCode,
        expireAt: OneDayFromNow(),
        isVerified: false
    });

    await newStaff.save();

    // 📧 Create and send OTP
    const otpCode = CreateOTP();
    await OTP.create({
        email,
        OTP: otpCode,
        OTPexpire: FifteenMinutesFromNow(),
        Type: "Email"
    });

    await SendMail(email, "Staff OTP Verification", generateOtpEmailHtml(otpCode));

    return sendResponse(res, 201, true, "Staff registered successfully, OTP sent to email");
});

// ✅ Verify Staff OTP
export const VerifyStaffRegisterOTP = TryCatch(async (req: Request, res: Response) => {
    const { email, otp } = req.body;

    const otpRecord = await OTP.findOne({ email, Type: "Email" });
    if (!otpRecord) return sendResponse(res, 400, false, "Invalid or expired OTP");

    const isOtpValid = await otpRecord.compareOtp(otp);
    const isOtpExpired = otpRecord.OTPexpire < new Date();
    if (!isOtpValid || isOtpExpired) return sendResponse(res, 400, false, "Invalid or expired OTP");

    const staff = await Staff.findOne({ email });
    if (!staff) return sendResponse(res, 404, false, "Staff not found");

    staff.isVerified = true;
    staff.expireAt = null;
    await staff.save();

    // Create tokens
    const accessToken = generateAccessToken(staff._id as string);
    const refreshToken = generateRefreshToken(staff._id as string);

    // Save session
    await Session.create({
        staffId: staff._id,
        accessToken,
        refreshToken,
        sessionType: "LOGIN",
        expireAt: OneDayFromNow(),
        date: new Date(),
    });

    sendTokenCookies(res, accessToken, refreshToken);

    // 📧 Send welcome email
    await SendMail(email, "Welcome to the Platform", generateWelcomeEmailHtml(staff.name));

    return sendResponse(res, 200, true, "Staff verified successfully");
});

// ✅ Staff Login
// ✅ Staff Login
export const StaffLogin = TryCatch(async (req: Request, res: Response) => {
    const accessTokenFromCookie = req.cookies.accessToken;
    const refreshTokenFromCookie = req.cookies.refreshToken;

    // 🔹 1️⃣ Check Access Token in cookies
    if (accessTokenFromCookie) {
        try {
            const staffId = decodeAccessToken(accessTokenFromCookie);
            if (staffId) {
                const activeSession = await Session.findOne({
                    staffId,
                    accessToken: accessTokenFromCookie,
                    sessionType: "LOGIN",
                    expireAt: { $gt: new Date() }
                });

                if (activeSession) {
                    const staff = await Staff.findById(staffId);
                    if (staff) {
                        return sendResponse(res, 200, true, "Staff is already logged in", {
                            staff: {
                                id: staff._id,
                                name: staff.name,
                                title: staff.title,
                                email: staff.email,
                                jobTitle: staff.jobTitle,
                                mobileNumber: staff.mobileNumber,
                                photo: staff.photo
                            }
                        }, true);
                    }
                }
            }
        } catch (err) {
            // Invalid access token → try refresh token below
        }
    }

    // 🔹 2️⃣ Check Refresh Token in cookies
    if (refreshTokenFromCookie) {
        try {
            const staffIdFromRefresh = decodeAccessToken(refreshTokenFromCookie);
            if (staffIdFromRefresh) {
                const activeSession = await Session.findOne({
                    staffId: staffIdFromRefresh,
                    refreshToken: refreshTokenFromCookie,
                    sessionType: "LOGIN",
                    expireAt: { $gt: new Date() }
                });

                if (activeSession) {
                    const newAccessToken = generateAccessToken(staffIdFromRefresh);
                    const newRefreshToken = generateRefreshToken(staffIdFromRefresh);

                    // Update session with new tokens
                    activeSession.accessToken = newAccessToken;
                    activeSession.refreshToken = newRefreshToken;
                    await activeSession.save();

                    // Send updated cookies
                    sendTokenCookies(res, newAccessToken, newRefreshToken);

                    const staff = await Staff.findById(staffIdFromRefresh);
                    if (staff) {
                        return sendResponse(res, 200, true, "Staff is already logged in (session refreshed)", {
                            staff: {
                                id: staff._id,
                                name: staff.name,
                                title: staff.title,
                                email: staff.email,
                                jobTitle: staff.jobTitle,
                                mobileNumber: staff.mobileNumber,
                                photo: staff.photo
                            }
                        }, true);
                    }
                }
            }
        } catch (err) {
            // Invalid refresh token → fall back to normal login
        }
    }

    // 🔹 3️⃣ Normal Login Flow
    const { email, password } = req.body;
    if (!email || !password) {
        return sendResponse(res, 400, false, "Email and password are required");
    }

    const staff = await Staff.findOne({ email });
    if (!staff) {
        return sendResponse(res, 404, false, "Staff not found");
    }

    if (!staff.isVerified) {
        return sendResponse(res, 403, false, "Please verify your email first");
    }

    const isPasswordValid = await staff.comparePass(password);
    if (!isPasswordValid) {
        return sendResponse(res, 401, false, "Invalid password");
    }

    // End old sessions
    await Session.updateMany(
        { staffId: staff._id, sessionType: "LOGIN" },
        { $set: { sessionType: "LOGOUT" } }
    );

    // Generate new tokens
    const accessToken = generateAccessToken(staff._id as string);
    const refreshToken = generateRefreshToken(staff._id as string);

    // Create new login session
    await Session.create({
        staffId: staff._id,
        accessToken,
        refreshToken,
        sessionType: "LOGIN",
        expireAt: OneDayFromNow(),
        date: new Date(),
    });

    // Send cookies
    sendTokenCookies(res, accessToken, refreshToken);

    return sendResponse(res, 200, true, "Login successful", {
        staff: {
            id: staff._id,
            name: staff.name,
            title: staff.title,
            email: staff.email,
            jobTitle: staff.jobTitle,
            mobileNumber: staff.mobileNumber,
            photo: staff.photo
        }
    }, true);
});




// ✅ Upload Staff Profile Photo
export const UploadStaffPhoto = TryCatch(async (req: AuthenticatedStaffRequest, res: Response) => {
    const staffUser = req.user;
    if (!staffUser?.id) {
        return sendResponse(res, 401, false, "Unauthorized: Staff not found");
    }

    const file = req.file as Express.Multer.File | undefined;
    if (!file) {
        return sendResponse(res, 400, false, "No file uploaded");
    }

    const uploadResult = await cloudinary.uploader.upload(file.path, {
        folder: "staff_photos",
    });

    const staff = await Staff.findById(staffUser.id);
    if (!staff) return sendResponse(res, 404, false, "Staff not found");

    staff.photo = uploadResult.secure_url;
    await staff.save();

    return sendResponse(res, 200, true, "Profile photo uploaded successfully", {
        photoUrl: uploadResult.secure_url,
        publicId: uploadResult.public_id
    });
});

// ✅ Forgot Password - Send Reset OTP
export const StaffForgotPassword = TryCatch(async (req: Request, res: Response) => {
    const { email } = req.body;

    const staff = await Staff.findOne({ email });
    if (!staff) return sendResponse(res, 404, false, "Staff not found");

    const otpCode = CreateOTP();
    await OTP.create({
        email,
        OTP: otpCode,
        OTPexpire: FifteenMinutesFromNow(),
        Type: "Reset"
    });

    await SendMail(email, "Staff Password Reset OTP", generateResetOtpEmailHtml(otpCode));

    return sendResponse(res, 200, true, "Password reset OTP sent to email");
});

// ✅ Reset Password with OTP
export const StaffResetPassword = TryCatch(async (req: Request, res: Response) => {
    const { email, otp, password } = req.body;

    const otpRecord = await OTP.findOne({ email, Type: "Reset" });
    if (!otpRecord) return sendResponse(res, 400, false, "Invalid or expired OTP");

    const isOtpValid = await otpRecord.compareOtp(otp);
    const isOtpExpired = otpRecord.OTPexpire < new Date();
    if (!isOtpValid || isOtpExpired) return sendResponse(res, 400, false, "Invalid or expired OTP");

    const staff = await Staff.findOne({ email });
    if (!staff) return sendResponse(res, 404, false, "Staff not found");

    staff.password = password;
    await staff.save();

    await otpRecord.deleteOne();

    return sendResponse(res, 200, true, "Password reset successfully");
});

// ✅ Staff Logout
export const StaffLogout = TryCatch(async (req: Request, res: Response) => {
    const refreshToken = req.cookies.refreshToken;
    if (!refreshToken) {
        return sendResponse(res, 401, false, "Not logged in");
    }

    await Session.updateOne(
        { refreshToken, sessionType: "LOGIN" },
        { $set: { sessionType: "LOGOUT" } }
    );

    res.clearCookie("accessToken");
    res.clearCookie("refreshToken");

    return sendResponse(res, 200, true, "Logout successful");
});

// ✅ Check if Staff is logged in
export const CheckIsStaffLoggedIn = TryCatch(async (req: AuthenticatedStaffRequest, res: Response) => {
    const accessToken = req.cookies.accessToken;
    const refreshToken = req.cookies.refreshToken;

    if (accessToken) {
        try {
            const staffId = decodeAccessToken(accessToken);
            if (staffId) {
                const session = await Session.findOne({ accessToken, sessionType: "LOGIN" });
                if (session) {
                    const staff = await Staff.findById(session.staffId);
                    if (staff) {
                        return sendResponse(res, 200, true, "Staff is logged in", { staff }, true);
                    }
                }
            }
        } catch { }
    }

    if (!refreshToken) return sendResponse(res, 401, false, "Not logged in");

    const staffIdFromRefresh = decodeAccessToken(refreshToken);
    if (!staffIdFromRefresh) return sendResponse(res, 401, false, "Invalid or expired refresh token");

    const session = await Session.findOne({
        refreshToken,
        sessionType: "LOGIN",
        expireAt: { $gt: new Date() }
    });

    if (!session) return sendResponse(res, 401, false, "Session expired or not found");

    const newAccessToken = generateAccessToken(staffIdFromRefresh);
    const newRefreshToken = generateRefreshToken(staffIdFromRefresh);

    session.accessToken = newAccessToken;
    session.refreshToken = newRefreshToken;
    await session.save();

    sendTokenCookies(res, newAccessToken, newRefreshToken);

    const staff = await Staff.findById(session.staffId);
    if (!staff) return sendResponse(res, 404, false, "Staff not found");

    return sendResponse(res, 200, true, "Staff is logged in (refreshed)", { staff }, true);
});
