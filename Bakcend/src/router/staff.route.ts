import { Router } from "express";
import multer from "multer";
import { validateMiddleware } from "../middleware/validate.middleware";
import {
    StaffRegisterSchema,
    StaffVerifyOtpSchema,
    StaffLoginSchema,
    StaffForgotPasswordSchema,
    StaffResetPasswordSchema,
} from "../middleware/validate.middleware";
import {
    RegisterStaff,
    VerifyStaffRegisterOTP,
    StaffLogin,
    StaffForgotPassword,
    StaffResetPassword,
    StaffLogout,
    UploadStaffPhoto,
    CheckIsStaffLoggedIn
} from "../controller/staff/Auth.staff.controller";
import { isStaffLoggedIn } from "../middleware/CheckLogin/isStafflogin";


const upload = multer({ dest: "uploads/" });


const StaffRouter = Router();

// !Staff Registration
StaffRouter.post("/register", validateMiddleware(StaffRegisterSchema), RegisterStaff);// POST localhost:5000/staff/register


// !Verify OTP
StaffRouter.post("/verify-otp", validateMiddleware(StaffVerifyOtpSchema), VerifyStaffRegisterOTP);// POST localhost:5000/staff/verify-otp


// !Login
StaffRouter.post("/login", validateMiddleware(StaffLoginSchema), StaffLogin);// POST localhost:5000/staff/login


// !Forgot Password
StaffRouter.post("/forgot-password", validateMiddleware(StaffForgotPasswordSchema), StaffForgotPassword);// POST localhost:5000/staff/forgot-password


// !Reset Password
StaffRouter.post("/reset-password", validateMiddleware(StaffResetPasswordSchema), StaffResetPassword);// POST localhost:5000/staff/reset-password


// !Logout
StaffRouter.post("/logout", StaffLogout);// POST localhost:5000/staff/logout


// !Check if Logged In
StaffRouter.get("/check-login", CheckIsStaffLoggedIn);// GET localhost:5000/staff/check-login


// !Upload Staff Profile Photo
StaffRouter.post("/profile-photo-upload", upload.single("image"), UploadStaffPhoto);// POST localhost:5000/staff/profile-photo-upload


export default StaffRouter;
