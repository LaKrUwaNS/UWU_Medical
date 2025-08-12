import { Request, Response } from "express";
import { TryCatch } from "../../utils/Error/ErrorHandler";
import { SendMail } from "../../config/Nodemailer";
import { generateOtpEmailHtml } from "../../const/Mail/OTP.templete";
import { generateResetOtpEmailHtml } from "../../const/Mail/ResepOTP.templete";
import { CreateOTP } from "../../utils/OTPGen";
import { sendTokenCookies } from "../../utils/Cookies";
import { decodeAccessToken, generateAccessToken, generateRefreshToken } from "../../utils/WebToken";
import { FifteenMinutesFromNow, OneDayFromNow, SevenDaysFromNow } from "../../utils/Date";
import OTP from "../../models/OTP.model";
import { Session } from "../../models/session.model";
import { cloudinary } from "../../config/Claudenary";
import Doctor from "../../models/Doctor.model";
import { sendResponse } from "../../utils/response";
import { AuthenticatedRequest } from "../../middleware/CheckLogin/isDotorlogin";
import { generateWelcomeEmailHtml } from "../../const/Mail/Welcome.templete";

// ---------- Helper function to check session and return doctor ----------
async function validateSessionAndGetDoctor(token: string, tokenType: "access" | "refresh"): Promise<{ session: any, doctor: any } | null> {
    const query: any = { sessionType: "LOGIN" };
    if (tokenType === "access") {
        query.accessToken = token;
    } else {
        query.refreshToken = token;
        query.expireAt = { $gt: new Date() };
    }

    const session = await Session.findOne(query);
    if (!session) return null;

    // Optionally check if session.isActive exists and call it
    if (typeof session.isActive === "function" && !session.isActive()) return null;

    const doctor = await Doctor.findById(session.doctorId);
    if (!doctor) return null;

    return { session, doctor };
}

// ---------- Check if Doctor is Logged In + Refresh tokens if needed ----------
export const CheckIsDoctorLoggedIn = TryCatch(async (req: AuthenticatedRequest, res: Response) => {
    const { accessToken, refreshToken } = req.cookies;

    if (!accessToken && !refreshToken) {
        return sendResponse(res, 401, false, "Not logged in");
    }

    // Try access token first
    if (accessToken) {
        try {
            const doctorId = decodeAccessToken(accessToken);
            if (doctorId) {
                const result = await validateSessionAndGetDoctor(accessToken, "access");
                if (result) {
                    const { doctor } = result;
                    return sendResponse(res, 200, true, "Doctor is logged in", {
                        doctor: {
                            id: doctor._id,
                            fullName: doctor.fullName,
                            userName: doctor.userName,
                            photo: doctor.photo,
                            professionalEmail: doctor.professionalEmail,
                        },
                    }, true);
                }
            }
        } catch {
            // Invalid/expired access token, try refresh below
        }
    }

    // Try refresh token if access token invalid or missing
    if (!refreshToken) {
        return sendResponse(res, 401, false, "Not logged in");
    }

    const doctorIdFromRefresh = decodeAccessToken(refreshToken);
    if (!doctorIdFromRefresh) {
        return sendResponse(res, 401, false, "Invalid or expired refresh token");
    }

    const result = await validateSessionAndGetDoctor(refreshToken, "refresh");
    if (!result) {
        return sendResponse(res, 401, false, "Session expired or not found");
    }

    const { session, doctor } = result;

    // Generate new tokens and update session
    const newAccessToken = generateAccessToken(doctorIdFromRefresh);
    const newRefreshToken = generateRefreshToken(doctorIdFromRefresh);

    session.accessToken = newAccessToken;
    session.refreshToken = newRefreshToken;
    await session.save();

    sendTokenCookies(res, newAccessToken, newRefreshToken);

    return sendResponse(res, 200, true, "Doctor is logged in (refreshed)", {
        doctor: {
            id: doctor._id,
            fullName: doctor.fullName,
            userName: doctor.userName,
            photo: doctor.photo,
            professionalEmail: doctor.professionalEmail,
        },
    }, true);
});

// ---------- Doctor Login ----------
export const DoctorLogging = TryCatch(async (req: Request, res: Response) => {
    const { accessToken, refreshToken } = req.cookies;

    // Check if already logged in with valid access token
    if (accessToken) {
        try {
            const doctorId = decodeAccessToken(accessToken);
            if (doctorId) {
                const session = await Session.findOne({
                    doctorId,
                    accessToken,
                    sessionType: "LOGIN",
                    expireAt: { $gt: new Date() }
                });

                if (session) {
                    const doctor = await Doctor.findById(doctorId);
                    if (doctor) {
                        return sendResponse(res, 200, true, "Doctor is already logged in", {
                            doctor: {
                                id: doctor._id,
                                fullName: doctor.fullName,
                                userName: doctor.userName,
                                photo: doctor.photo,
                                professionalEmail: doctor.professionalEmail
                            }
                        }, true);
                    }
                }
            }
        } catch {
            // Invalid access token, continue
        }
    }

    // Check if refresh token valid → refresh session
    if (refreshToken) {
        try {
            const doctorIdFromRefresh = decodeAccessToken(refreshToken);
            if (doctorIdFromRefresh) {
                const session = await Session.findOne({
                    doctorId: doctorIdFromRefresh,
                    refreshToken,
                    sessionType: "LOGIN",
                    expireAt: { $gt: new Date() }
                });

                if (session) {
                    const newAccessToken = generateAccessToken(doctorIdFromRefresh);
                    const newRefreshToken = generateRefreshToken(doctorIdFromRefresh);

                    session.accessToken = newAccessToken;
                    session.refreshToken = newRefreshToken;
                    await session.save();

                    sendTokenCookies(res, newAccessToken, newRefreshToken);

                    const doctor = await Doctor.findById(doctorIdFromRefresh);
                    if (doctor) {
                        return sendResponse(res, 200, true, "Doctor is already logged in (session refreshed)", {
                            doctor: {
                                id: doctor._id,
                                fullName: doctor.fullName,
                                userName: doctor.userName,
                                photo: doctor.photo,
                                professionalEmail: doctor.professionalEmail
                            }
                        }, true);
                    }
                }
            }
        } catch {
            // Invalid refresh token, continue
        }
    }

    // Normal login flow
    const { email, password } = req.body;
    if (!email || !password) {
        return sendResponse(res, 400, false, "Email and password are required");
    }

    const doctor = await Doctor.findOne({ professionalEmail: email });
    if (!doctor) {
        return sendResponse(res, 404, false, "Doctor not found");
    }

    const isPasswordValid = await doctor.Doctorpasswordcompare(password);
    if (!isPasswordValid) {
        return sendResponse(res, 401, false, "Invalid password");
    }

    if (!doctor.Verified) {
        return sendResponse(res, 403, false, "Please verify your email first");
    }

    // End old sessions
    await Session.updateMany(
        { doctorId: doctor._id, sessionType: "LOGIN" },
        { $set: { sessionType: "LOGOUT" } }
    );

    // Generate tokens & create session
    const newAccessToken = generateAccessToken(doctor._id.toString());
    const newRefreshToken = generateRefreshToken(doctor._id.toString());

    await Session.create({
    doctorId: doctor._id,
    accessToken: newAccessToken,
    refreshToken: newRefreshToken,
    sessionType: "LOGIN",
    expireAt: SevenDaysFromNow(),
    date: new Date(),
    });

    sendTokenCookies(res, newAccessToken, newRefreshToken);

    return sendResponse(res, 200, true, "Login successful", {
        doctor: {
            id: doctor._id,
            fullName: doctor.fullName,
            userName: doctor.userName,
            photo: doctor.photo,
            professionalEmail: doctor.professionalEmail
        }
    }, true);
});

// ---------- Logout ----------
export const Logout = TryCatch(async (req: Request, res: Response) => {
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

// ---------- Register Doctor ----------
export const RegisterDoctor = TryCatch(async (req: Request, res: Response) => {
    const {
        userName,
        fullName,
        password,
        personalEmail,
        professionalEmail,
        securityCode,
        title,
    } = req.body;

    if (
        !userName ||
        !fullName ||
        !password ||
        !personalEmail ||
        !professionalEmail ||
        !securityCode ||
        !title
    ) {
        return sendResponse(res, 400, false, "All fields are required");
    }

    const existingDoctor = await Doctor.findOne({ professionalEmail });
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
        expireAt: OneDayFromNow(),
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

// ---------- Verify Register OTP ----------
export const VerifyRegisterOTP = TryCatch(async (req: Request, res: Response) => {
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

    const doctor = await Doctor.findOne({ professionalEmail: email });
    if (!doctor) {
        return sendResponse(res, 404, false, "Doctor not found");
    }

    doctor.Verified = true;
    doctor.expireAt = null;
    await doctor.save();

    // Generate tokens
    const accessToken = generateAccessToken(doctor._id.toString());
    const refreshToken = generateRefreshToken(doctor._id.toString());

    await Session.create({
    doctorId: doctor._id,
    accessToken,
    refreshToken,
    sessionType: "LOGIN",
    expireAt: SevenDaysFromNow(),
    date: new Date(),
    });

    sendTokenCookies(res, accessToken, refreshToken);

    await SendMail(
        doctor.professionalEmail,
        "Welcome to Our Platform",
        generateWelcomeEmailHtml(doctor.fullName)
    );

    return sendResponse(res, 200, true, "OTP verified successfully");
});

// ---------- Profile Photo Upload ----------
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

    const doctor = await Doctor.findById(user.id);
    if (!doctor) {
        return sendResponse(res, 404, false, "Doctor not found");
    }

    doctor.photo = uploadResult.url as string;
    await doctor.save();

    return sendResponse(res, 200, true, "File uploaded successfully to Cloudinary", uploadResult);
});

// ---------- Forgot Password ----------
export const ForgotPassword = TryCatch(async (req: Request, res: Response) => {
    const { email } = req.body;

    const doctor = await Doctor.findOne({ professionalEmail: email });
    if (!doctor) {
        return sendResponse(res, 404, false, "No user found");
    }

    const otp = CreateOTP();
    await SendMail(email, "Password Reset OTP", generateResetOtpEmailHtml(otp));

    await OTP.create({
        email,
        OTP: otp,
        OTPexpire: FifteenMinutesFromNow(),
        Type: "Reset",
    });

    return sendResponse(res, 200, true, "OTP has been sent");
});

// ---------- Reset Password ----------
export const ResetPassword = TryCatch(async (req: Request, res: Response) => {
    const { email, otp, password: newPassword } = req.body;

    const otpRecord = await OTP.findOne({ email, Type: "Reset" });
    if (!otpRecord) {
        return sendResponse(res, 400, false, "Invalid or expired OTP");
    }

    const isOtpValid = await otpRecord.compareOtp(otp);
    const isOtpExpired = otpRecord.OTPexpire < new Date();
    if (!isOtpValid || isOtpExpired) {
        return sendResponse(res, 400, false, "Invalid or expired OTP");
    }

    const doctor = await Doctor.findOne({ professionalEmail: email });
    if (!doctor) {
        return sendResponse(res, 404, false, "No user found");
    }

    doctor.password = newPassword;
    await doctor.save();

    await otpRecord.deleteOne();

    return sendResponse(res, 200, true, "Password reset successfully");
});
