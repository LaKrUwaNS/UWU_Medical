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
import Student from "../../models/Student.model";
import { sendResponse } from "../../utils/response";
import { AuthenticatedRequest } from "../../middleware/CheckLogin/isDotorlogin";
import { generateWelcomeEmailHtml } from "../../const/Mail/Welcome.templete";
import { summarizeText } from "./pages/CheckAI.controller";


// ✅ Register Student
export const RegisterStudent = TryCatch(async (req: Request, res: Response) => {
    const {
        indexNumber,
        universityEmail,
        password,
        name,
        gender,
        contactNumber,
        bloodType,
        allergies
    } = req.body;

    const existingStudent = await Student.findOne({ universityEmail });
    if (existingStudent) {
        return sendResponse(res, 400, false, "Student already registered");
    }
    

    const newStudent = new Student({
        indexNumber,
        universityEmail,
        password,
        name,
        gender,
        contactNumber,
        bloodType,
        allergies: await summarizeText(allergies), 
        expireAt: OneDayFromNow(),
        isVerified: false
    });

    await newStudent.save();

    const otpCode = CreateOTP();
    await OTP.create({
        email: universityEmail,
        OTP: otpCode,
        OTPexpire: FifteenMinutesFromNow(),
        Type: "Email"
    });

    await SendMail(universityEmail, "OTP Verification", generateOtpEmailHtml(otpCode));

    return sendResponse(res, 201, true, "Student registered successfully, OTP sent");
});

// ✅ Verify Student OTP
export const VerifyStudentRegisterOTP = TryCatch(async (req: Request, res: Response) => {
    const { universityEmail, otp } = req.body;

    const otpRecord = await OTP.findOne({ email: universityEmail, Type: "Email" });
    if (!otpRecord) {
        return sendResponse(res, 400, false, "Invalid or expired OTP");
    }

    const isOtpValid = await otpRecord.compareOtp(otp);
    const isOtpExpired = otpRecord.OTPexpire < new Date();
    if (!isOtpValid || isOtpExpired) {
        return sendResponse(res, 400, false, "Invalid or expired OTP");
    }

    const student = await Student.findOne({ universityEmail });
    if (!student) {
        return sendResponse(res, 404, false, "Student not found");
    }

    student.isVerified = true;
    student.expireAt = null;
    await student.save();

    const accessToken = generateAccessToken(student._id as string);
    const refreshToken = generateRefreshToken(student._id as string);

    await Session.create({
    studentId: student._id,
    accessToken,
    refreshToken,
    sessionType: "LOGIN",
    expireAt: SevenDaysFromNow(),
    date: new Date(),
    });

    sendTokenCookies(res, accessToken, refreshToken);

    await SendMail(
        student.universityEmail,
        "Welcome to Our Platform",
        generateWelcomeEmailHtml(student.name)
    );

    return sendResponse(res, 200, true, "OTP verified successfully");
});

// ✅ Student Login
export const StudentLogin = TryCatch(async (req: Request, res: Response) => {
    const accessTokenFromCookie = req.cookies.accessToken;
    const refreshTokenFromCookie = req.cookies.refreshToken;

    // 🔹 1️⃣ Check Access Token in cookies
    if (accessTokenFromCookie) {
        try {
            const studentId = decodeAccessToken(accessTokenFromCookie);
            if (studentId) {
                const activeSession = await Session.findOne({
                    studentId,
                    accessToken: accessTokenFromCookie,
                    sessionType: "LOGIN",
                    expireAt: { $gt: new Date() }
                });

                if (activeSession) {
                    const student = await Student.findById(studentId);
                    if (student) {
                        return sendResponse(res, 200, true, "Student is already logged in", {
                            student: {
                                id: student._id,
                                name: student.name,
                                indexNumber: student.indexNumber,
                                universityEmail: student.universityEmail,
                                degree: student.degree,
                                year: student.year,
                                photo: student.photo
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
            const studentIdFromRefresh = decodeAccessToken(refreshTokenFromCookie);
            if (studentIdFromRefresh) {
                const activeSession = await Session.findOne({
                    studentId: studentIdFromRefresh,
                    refreshToken: refreshTokenFromCookie,
                    sessionType: "LOGIN",
                    expireAt: { $gt: new Date() }
                });

                if (activeSession) {
                    const newAccessToken = generateAccessToken(studentIdFromRefresh);
                    const newRefreshToken = generateRefreshToken(studentIdFromRefresh);

                    // Update session with new tokens
                    activeSession.accessToken = newAccessToken;
                    activeSession.refreshToken = newRefreshToken;
                    await activeSession.save();

                    // Send updated cookies
                    sendTokenCookies(res, newAccessToken, newRefreshToken);

                    const student = await Student.findById(studentIdFromRefresh);
                    if (student) {
                        return sendResponse(res, 200, true, "Student is already logged in (session refreshed)", {
                            student: {
                                id: student._id,
                                name: student.name,
                                indexNumber: student.indexNumber,
                                universityEmail: student.universityEmail,
                                degree: student.degree,
                                year: student.year,
                                photo: student.photo
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
    const { universityEmail, password } = req.body;
    if (!universityEmail || !password) {
        return sendResponse(res, 400, false, "University email and password are required");
    }

    const student = await Student.findOne({ universityEmail });
    if (!student) {
        return sendResponse(res, 404, false, "Student not found");
    }

    if (!student.isVerified) {
        return sendResponse(res, 403, false, "Please verify your email first");
    }

    const isPasswordValid = await student.comparePass(password);
    if (!isPasswordValid) {
        return sendResponse(res, 401, false, "Invalid password");
    }

    // End old sessions
    await Session.updateMany(
        { studentId: student._id, sessionType: "LOGIN" },
        { $set: { sessionType: "LOGOUT" } }
    );

    // Generate new tokens
    const accessToken = generateAccessToken(student._id as string);
    const refreshToken = generateRefreshToken(student._id as string);

    // Create new login session
    await Session.create({
    studentId: student._id,
    accessToken,
    refreshToken,
    sessionType: "LOGIN",
    expireAt: SevenDaysFromNow(),
    date: new Date(),
    });

    // Send cookies
    sendTokenCookies(res, accessToken, refreshToken);

    return sendResponse(res, 200, true, "Login successful", {
        student: {
            id: student._id,
            name: student.name,
            indexNumber: student.indexNumber,
            universityEmail: student.universityEmail,
            degree: student.degree,
            year: student.year,
            photo: student.photo
        }
    }, true);
});


// ✅ Upload Student Profile Photo
export const UploadStudentPhoto = TryCatch(async (req: AuthenticatedRequest, res: Response) => {
    const student = req.user;

    if (!student || !student.id) {
        return sendResponse(res, 401, false, "Unauthorized: Student not found");
    }

    const file = req.file as Express.Multer.File | undefined;
    if (!file) {
        return sendResponse(res, 400, false, "No file uploaded");
    }

    const uploadResult = await cloudinary.uploader.upload(file.path, {
        folder: "students_photos",
    });

    const foundStudent = await Student.findById(student.id);
    if (!foundStudent) {
        return sendResponse(res, 404, false, "Student not found");
    }

    foundStudent.photo = uploadResult.secure_url;
    await foundStudent.save();

    return sendResponse(res, 200, true, "Profile photo uploaded successfully", {
        photoUrl: uploadResult.secure_url,
        publicId: uploadResult.public_id
    });
});

// ✅ Forgot Password
export const StudentForgotPassword = TryCatch(async (req: Request, res: Response) => {
    const { universityEmail } = req.body;

    const student = await Student.findOne({ universityEmail });
    if (!student) return sendResponse(res, 404, false, "Student not found");

    const otpCode = CreateOTP();
    await OTP.create({
        email: universityEmail,
        OTP: otpCode,
        OTPexpire: FifteenMinutesFromNow(),
        Type: "Reset"
    });

    await SendMail(universityEmail, "Password Reset OTP", generateResetOtpEmailHtml(otpCode));

    return sendResponse(res, 200, true, "OTP sent for password reset");
});

// ✅ Reset Password
export const StudentResetPassword = TryCatch(async (req: Request, res: Response) => {
    const { universityEmail, otp, password } = req.body;

    const otpRecord = await OTP.findOne({ email: universityEmail, Type: "Reset" });
    if (!otpRecord) return sendResponse(res, 400, false, "Invalid or expired OTP");

    const isOtpValid = await otpRecord.compareOtp(otp);
    const isOtpExpired = otpRecord.OTPexpire < new Date();
    if (!isOtpValid || isOtpExpired) return sendResponse(res, 400, false, "Invalid or expired OTP");

    const student = await Student.findOne({ universityEmail });
    if (!student) return sendResponse(res, 404, false, "Student not found");

    student.password = password;
    await student.save();

    await otpRecord.deleteOne();

    return sendResponse(res, 200, true, "Password reset successfully");
});

// ✅ Student Logout
export const StudentLogout = TryCatch(async (req: Request, res: Response) => {
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

// ✅ Check if Student is logged in
export const CheckIsStudentLoggedIn = TryCatch(async (req: AuthenticatedRequest, res: Response) => {
    const { accessToken, refreshToken } = req.cookies;

    if (!accessToken && !refreshToken) {
        return sendResponse(res, 401, false, "Not logged in");
    }

    try {
        const studentId = decodeAccessToken(accessToken);
        if (studentId) {
            // check session by accessToken
            const session = await Session.findOne({ accessToken, sessionType: "LOGIN" });
            if (!session) return sendResponse(res, 401, false, "Invalid session");

            const student = await Student.findById(session.studentId);
            if (!student) return sendResponse(res, 404, false, "Student not found");

            return sendResponse(res, 200, true, "Student is logged in", { student }, true);
        }
    } catch {
    }

    if (!refreshToken) {
        return sendResponse(res, 401, false, "Not logged in");
    }

    const studentIdFromRefresh = decodeAccessToken(refreshToken);
    if (!studentIdFromRefresh) return sendResponse(res, 401, false, "Invalid or expired refresh token");

    const session = await Session.findOne({
        refreshToken,
        sessionType: "LOGIN",
        expireAt: { $gt: new Date() },
    });

    if (!session) return sendResponse(res, 401, false, "Session expired or not found");

    // Generate new tokens
    const newAccessToken = generateAccessToken(studentIdFromRefresh);
    const newRefreshToken = generateRefreshToken(studentIdFromRefresh);

    session.accessToken = newAccessToken;
    session.refreshToken = newRefreshToken;
    await session.save();

    sendTokenCookies(res, newAccessToken, newRefreshToken);

    const student = await Student.findById(session.studentId);
    if (!student) return sendResponse(res, 404, false, "Student not found");

    return sendResponse(res, 200, true, "Student is logged in (refreshed)", { student }, true);
});
