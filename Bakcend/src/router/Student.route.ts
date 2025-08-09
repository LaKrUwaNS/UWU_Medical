import { Router } from "express";
import multer from "multer";
import { TestMail } from "../controller/doctor/Auth.controller";
import { studentUpdateSchema, validateMiddleware } from "../middleware/validate.middleware";

import {
    StudentregisterStudentSchema,
    StudentverifyStudentOtpSchema,
    StudentloginStudentSchema,
    StudentforgotPasswordSchema,
    StudentresetPasswordSchema,
} from "../middleware/validate.middleware";

import {
    RegisterStudent,
    VerifyStudentRegisterOTP,
    StudentLogin,
    StudentForgotPassword,
    StudentResetPassword,
    StudentLogout,
    UploadStudentPhoto,
    CheckIsStudentLoggedIn
} from "../controller/student/Auth.Student.controller";

import { isStudentLoggedIn } from "../middleware/CheckLogin/isStudentlogin";
import { getMedicalData } from "../controller/staff/pages/GetMEdicales.controller";
import { ApplyMedicalRequest } from "../controller/staff/pages/applyMedical.controller";
import { StudentdataGET, StudentDateEdit, VerifyandUpdate } from "../controller/staff/pages/studnetData.controller";


const upload = multer({ dest: "uploads/" }); // configure multer as needed

const StudentRouter = Router();


// ==========================
//!Authontication Page Routers
// ==========================
StudentRouter.post('/test', TestMail);
// POST localhost:5000/student/test

StudentRouter.post("/register", validateMiddleware(StudentregisterStudentSchema), RegisterStudent);
// POST localhost:5000/student/register

StudentRouter.post("/verify-otp", validateMiddleware(StudentverifyStudentOtpSchema), VerifyStudentRegisterOTP);
// POST localhost:5000/student/verify-otp

StudentRouter.post("/login", validateMiddleware(StudentloginStudentSchema), StudentLogin);
// POST localhost:5000/student/login

StudentRouter.post("/forgot-password", validateMiddleware(StudentforgotPasswordSchema), StudentForgotPassword);
// POST localhost:5000/student/forgot-password

StudentRouter.post("/reset-password", validateMiddleware(StudentresetPasswordSchema), StudentResetPassword);
// POST localhost:5000/student/reset-password

StudentRouter.post("/logout", StudentLogout);
// POST localhost:5000/student/logout

StudentRouter.get("/check-login", CheckIsStudentLoggedIn);
// GET localhost:5000/student/check-login

// Upload Student Profile Photo route
StudentRouter.post(
    "/profile-photo-upload",
    isStudentLoggedIn,
    upload.single("image"),
    UploadStudentPhoto
);
// POST localhost:5000/student/profile-photo-upload



// ==========================
// !SHOW Medical Request Page Routers
// ==========================
StudentRouter.get("/medical-data", isStudentLoggedIn, getMedicalData); // GET localhost:5000/student/medical-data



// ==========================
// Apply Medical Request Page Routers
// ==========================
StudentRouter.post("/apply-medical", isStudentLoggedIn, ApplyMedicalRequest); // post localhost:5000/student/apply-medical


// ==========================
// Settings Page Routers
// ==========================
StudentRouter.get("/settings", isStudentLoggedIn, StudentdataGET);   // GET localhost:5000/student/settings
StudentRouter.post("/settings/edit", validateMiddleware(studentUpdateSchema), isStudentLoggedIn, StudentDateEdit); // PATCH localhost:5000/student/settings/edit
StudentRouter.patch("/settings/verify-email", isStudentLoggedIn, VerifyandUpdate); // POST localhost:5000/student/settings/verify-email


export default StudentRouter;
