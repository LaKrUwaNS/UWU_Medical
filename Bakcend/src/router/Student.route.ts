import { Router } from "express";
import multer from "multer";
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
    CheckIsStudentLoggedIn,
} from "../controller/student/Auth.Student.controller";

import { isStudentLogin } from "../middleware/CheckLogin/isStudentlogin";
import { getMedicalData } from "../controller/student/pages/GetMEdicales.controller";
import { ApplyMedicalRequest } from "../controller/student/pages/applyMedical.controller";
import { StudentdataGET, StudentDateEdit, VerifyandUpdate } from "../controller/student/pages/studnetData.controller";
import { generateSummary } from "../controller/student/pages/CheckAI.controller";
import { ContactDoctor, MassageArticles } from "../controller/student/pages/contactDoctor.controller";
import { GetAllDoctors } from "../controller/Admin/Loginusers.controller";


const upload = multer({ dest: "uploads/" }); // configure multer as needed

const StudentRouter = Router();


StudentRouter.post('/test-ai', generateSummary);   // localhost:5000/student/test-ai

// ==========================
//!Authontication Page Routers
// ==========================

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
    isStudentLogin,
    upload.single("image"),
    UploadStudentPhoto
);
// POST localhost:5000/student/profile-photo-upload



// ==========================
// !SHOW Medical Request Page Routers
// ==========================
StudentRouter.get("/medical-data", isStudentLogin, getMedicalData); // GET localhost:5000/student/medical-data



// ==========================
// Apply Medical Request Page Routers
// ==========================
StudentRouter.post("/apply-medical", isStudentLogin, ApplyMedicalRequest); // post localhost:5000/student/apply-medical


// ==========================
// Settings Page Routers
// ==========================
StudentRouter.get("/settings", isStudentLogin, StudentdataGET);   // GET localhost:5000/student/settings
StudentRouter.post("/settings/edit", validateMiddleware(studentUpdateSchema), isStudentLogin, StudentDateEdit); // PATCH localhost:5000/student/settings/edit
StudentRouter.patch("/settings/verify-email", isStudentLogin, VerifyandUpdate); // POST localhost:5000/student/settings/verify-email


//Contact Doctor page
StudentRouter.get("/All-doctor", GetAllDoctors); // GET localhost:5000/student/All-doctor
StudentRouter.post("/contact-doctor", isStudentLogin, ContactDoctor); // POST localhost:5000/student/contact-doctor



// Article Massages
StudentRouter.post("/article-massage/:id", isStudentLogin, MassageArticles); // POST localhost:5000/student/article-massage/:id

// Apply Medical
StudentRouter.post("/apply-medical", isStudentLogin, ApplyMedicalRequest); // POST localhost:5000/student/apply-medical
StudentRouter.get("/medical-data", isStudentLogin, getMedicalData); // GET localhost:5000/student/medical-data


export default StudentRouter;
