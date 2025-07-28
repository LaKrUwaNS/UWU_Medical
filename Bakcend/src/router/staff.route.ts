import { Router } from "express";
import multer from "multer";
import { validateMiddleware } from "../middleware/validate.middleware";
import {
    RegisterStaff,
    VerifyStaffOTP,
    StaffLogin,
    StaffForgotPassword,
    StaffResetPassword,
    StaffLogout,
    StaffPhotoUpload
} from "../controller/staff/Auth.staff.controller";
import {
    StaffRegisterSchema,
    StaffVerifyOtpSchema,
    StaffLoginSchema,
    StaffForgotPasswordSchema,
    StaffResetPasswordSchema,
    StaffLogoutSchema
} from "../middleware/validate.middleware";
import { isStaffLoggedIn } from "../middleware/CheckLogin/isStafflogin";

const StaffRouter = Router();

// ✅ Setup multer for profile photo upload
const upload = multer({ dest: "uploads/" });

// ! Staff Register
StaffRouter.post("/register", validateMiddleware(StaffRegisterSchema), RegisterStaff);       // localhost:5000/staff/register

// ! Staff Verify OTP
StaffRouter.post("/verify-otp", validateMiddleware(StaffVerifyOtpSchema), VerifyStaffOTP);   // localhost:5000/staff/verify-otp

// ! Staff Login
StaffRouter.post("/login", validateMiddleware(StaffLoginSchema), StaffLogin);                // localhost:5000/staff/login

// ! Staff Forgot Password
StaffRouter.post("/forgot-password", validateMiddleware(StaffForgotPasswordSchema), StaffForgotPassword); // localhost:5000/staff/forgot-password

// ! Staff Reset Password
StaffRouter.post("/reset-password", validateMiddleware(StaffResetPasswordSchema), StaffResetPassword);     // localhost:5000/staff/reset-password

// ! Staff Logout
StaffRouter.post("/logout", validateMiddleware(StaffLogoutSchema), StaffLogout);             // localhost:5000/staff/logout

// ! Upload Profile Photo
StaffRouter.post("/upload-photo", isStaffLoggedIn, upload.single("photo"), StaffPhotoUpload); // localhost:5000/staff/upload-photo

export default StaffRouter;
