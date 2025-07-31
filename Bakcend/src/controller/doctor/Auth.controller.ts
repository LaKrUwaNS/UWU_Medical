import { Request, Response } from "express";
import { TryCatch } from "../../utils/Error/ErrorHandler";
import { SendMail } from "../../config/Nodemailer";
import { generateOtpEmailHtml } from "../../const/Mail/OTP.templete";
import { generateResetOtpEmailHtml } from "../../const/Mail/ResepOTP.templete";
import { CreateOTP } from "../../utils/OTPGen";
import { sendTokenAsCookie, sendTokenCookies } from "../../utils/Cookies";
import { decodeAccessToken, generateAccessToken, generateRefreshToken } from "../../utils/WebToken";
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

    // Create session with both tokens
    await Session.create({
        doctorId: doctor._id,
        accessToken,
        refreshToken,
        sessionType: "LOGIN",
        expireAt: OneDayFromNow(),
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

// !✅ Doctor Login
export const DoctorLogging = TryCatch(async (req: Request, res: Response) => {
    const accessTokenFromCookie = req.cookies.accessToken;
    const refreshTokenFromCookie = req.cookies.refreshToken;

    // 🔹 1️⃣ If they already have a valid access token → return already logged in
    if (accessTokenFromCookie) {
        try {
            const doctorId = decodeAccessToken(accessTokenFromCookie);
            if (doctorId) {
                const activeSession = await Session.findOne({
                    doctorId,
                    accessToken: accessTokenFromCookie,
                    sessionType: "LOGIN",
                    expireAt: { $gt: new Date() }
                });

                if (activeSession) {
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
        } catch (err) {
            // Invalid access token, we'll try refresh below
        }
    }

    // 🔹 2️⃣ If refresh token valid → refresh session and return logged in
    if (refreshTokenFromCookie) {
        try {
            const doctorIdFromRefresh = decodeAccessToken(refreshTokenFromCookie);
            if (doctorIdFromRefresh) {
                const activeSession = await Session.findOne({
                    doctorId: doctorIdFromRefresh,
                    refreshToken: refreshTokenFromCookie,
                    sessionType: "LOGIN",
                    expireAt: { $gt: new Date() }
                });

                if (activeSession) {
                    const newAccessToken = generateAccessToken(doctorIdFromRefresh);
                    const newRefreshToken = generateRefreshToken(doctorIdFromRefresh);

                    // Update session tokens
                    activeSession.accessToken = newAccessToken;
                    activeSession.refreshToken = newRefreshToken;
                    await activeSession.save();

                    // Send new cookies
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
        } catch (err) {
            // Invalid refresh token → continue normal login
        }
    }

    // 🔹 3️⃣ Normal login (if no valid tokens)
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

    // End any old sessions
    await Session.updateMany(
        { doctorId: doctor._id, sessionType: "LOGIN" },
        { $set: { sessionType: "LOGOUT" } }
    );

    // Generate new tokens
    const accessToken = generateAccessToken(doctor._id.toString());
    const refreshToken = generateRefreshToken(doctor._id.toString());

    // Create new login session
    await Session.create({
        doctorId: doctor._id,
        accessToken,
        refreshToken,
        sessionType: "LOGIN",
        expireAt: OneDayFromNow(),
        date: new Date(),
    });

    // Send cookies
    sendTokenCookies(res, accessToken, refreshToken);

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



// !✅ Logout
export const Logout = TryCatch(async (req: Request, res: Response) => {
    const refreshToken = req.cookies.refreshToken;
    if (!refreshToken) {
        return sendResponse(res, 401, false, "Not logged in");
    }

    // Update sessionType to "LOGOUT"
    await Session.updateOne(
        { refreshToken, sessionType: "LOGIN" },
        { $set: { sessionType: "LOGOUT" } }
    );

    // Clear cookies
    res.clearCookie("accessToken");
    res.clearCookie("refreshToken");

    return sendResponse(res, 200, true, "Logout successful");
});
;


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


// ✅ Combined Check + Refresh Access Token API
export const CheckIsDoctorLoggedIn = TryCatch(async (req: AuthenticatedRequest, res: Response) => {
    const accessToken = req.cookies.accessToken;
    const refreshToken = req.cookies.refreshToken;

    // 1️⃣ If we have an access token, try to validate it
    if (accessToken) {
        try {
            const doctorId = decodeAccessToken(accessToken); // verify
            if (doctorId) {
                const session = await Session.findOne({ accessToken, sessionType: "LOGIN" });
                if (session && (!session.isActive || session.isActive())) {
                    const doctor = await Doctor.findById(session.doctorId);
                    if (doctor) {
                        return sendResponse(res, 200, true, "Doctor is logged in", {
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
        } catch (err) {
            // Token invalid → we'll try refresh flow below
        }
    }

    // 2️⃣ If access token invalid/missing → try refresh token
    if (!refreshToken) {
        return sendResponse(res, 401, false, "Not logged in");
    }

    const doctorIdFromRefresh = decodeAccessToken(refreshToken);
    if (!doctorIdFromRefresh) {
        return sendResponse(res, 401, false, "Invalid or expired refresh token");
    }

    // Check session
    const session = await Session.findOne({
        refreshToken,
        sessionType: "LOGIN",
        expireAt: { $gt: new Date() } // session still valid
    });

    if (!session) {
        return sendResponse(res, 401, false, "Session expired or not found");
    }

    // 3️⃣ Generate a new access token
    const newAccessToken = generateAccessToken(doctorIdFromRefresh);

    // Optional: Generate a new refresh token each time (for extra security)
    const newRefreshToken = generateRefreshToken(doctorIdFromRefresh);

    // 4️⃣ Update session
    session.accessToken = newAccessToken;
    session.refreshToken = newRefreshToken;
    await session.save();

    // 5️⃣ Send cookies
    res.cookie("accessToken", newAccessToken, {
        httpOnly: true,
        secure: process.env.NODE_ENV === "production",
        sameSite: "strict",
        maxAge: 15 * 60 * 1000 // 15 mins
    });

    res.cookie("refreshToken", newRefreshToken, {
        httpOnly: true,
        secure: process.env.NODE_ENV === "production",
        sameSite: "strict",
        maxAge: 24 * 60 * 60 * 1000 // 1 day
    });

    // 6️⃣ Return doctor data
    const doctor = await Doctor.findById(session.doctorId);
    if (!doctor) {
        return sendResponse(res, 404, false, "Doctor not found");
    }

    return sendResponse(res, 200, true, "Doctor is logged in (refreshed)", {
        doctor: {
            id: doctor._id,
            fullName: doctor.fullName,
            userName: doctor.userName,
            photo: doctor.photo,
            professionalEmail: doctor.professionalEmail
        }
    }, true);
});
