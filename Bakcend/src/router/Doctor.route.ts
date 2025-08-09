import { Router } from "express";
import { CheckIsDoctorLoggedIn, DoctorLogging, ForgotPassword, Logout, RegisterDoctor, ResetPassword, TestMail, TestMulter, VerifyRegisterOTP } from "../controller/doctor/Auth.controller";
import { RegisterDoctorZodSchema, validateMiddleware } from "../middleware/validate.middleware";
import { otpVerificationSchema } from "../middleware/validate.middleware";
import { loginSchema } from "../middleware/validate.middleware";
import { forgotPasswordSchema } from "../middleware/validate.middleware";
import { resetPasswordSchema } from "../middleware/validate.middleware";
import { getDashBoard } from "../controller/doctor/pages/Dashboard.controller";
import { ProfilePhotoupload } from "../controller/doctor/Auth.controller";
import { upload } from "../config/Multer";
//import { isDoctorLogin } from "../middleware/CheckLogin/isDotorlogin";
import { deleteMedicine, getMedicineList, addNewMedicine, updateMedicine, getAllInventories } from "../controller/doctor/pages/Medicine.controller";
import { createPrescription, getStudentMedicalProfile, getStudentPrescriptions, updatePrescriptionStatus } from "../controller/doctor/pages/StudentsDate.controller";
import { ChangeMedicalRequestStatus, GetMedicalRequests } from "../controller/doctor/pages/MedicalRequests.controller";
import { createArticle, deleteArticle, getAllArticles, getArticleData, updateArticle } from "../controller/doctor/pages/Update.controller";
import { isDoctorLogin } from "../middleware/CheckLogin/isDotorlogin";
import { GetAllStudents } from "../controller/doctor/pages/AllStudents.controller";
import { GetAllStaff } from "../controller/doctor/pages/Staff..controller";

const DoctorRouter = Router();

// Public Router

// !Testing Routers
DoctorRouter.post('/test', TestMail);   // localhost:5000/doctor/test
DoctorRouter.post('/test-multer', upload.single("image"), TestMulter);   // localhost:5000/doctor/test-multer


// !Doctor Register
DoctorRouter.post("/register", validateMiddleware(RegisterDoctorZodSchema), RegisterDoctor);      //localhost:5000/doctor/register
DoctorRouter.post("/verify-otp", validateMiddleware(otpVerificationSchema), VerifyRegisterOTP); //localhost:5000/doctor/verify-otp
// !Doctor Login
DoctorRouter.post("/login", validateMiddleware(loginSchema), DoctorLogging); //localhost:5000/doctor/login

// !Doctor Forgot Password
DoctorRouter.post("/forgot-password", validateMiddleware(forgotPasswordSchema), ForgotPassword); //localhost:5000/doctor/forgot-password

// !Doctor Reset Password
DoctorRouter.post("/reset-password", validateMiddleware(resetPasswordSchema), ResetPassword); //localhost:5000/doctor/reset-password

// !Doctor Logout
DoctorRouter.post("/logout", Logout); //localhost:5000/doctor/logout

// !Check Login
DoctorRouter.get("/check-login", CheckIsDoctorLoggedIn) //localhost:5000/doctor/check-login


// ==========================
// Dashboard Page Routers
// ==========================
// Page Routers Need to Login user to process

// !Doctor Dashboard
DoctorRouter.get("/dashboard", getDashBoard); //localhost:5000/doctor/dashboard
// !Doctor Profile Photo Upload
DoctorRouter.post("/profile-photo-upload", upload.single("image"), ProfilePhotoupload); //localhost:5000/doctor/profile-photo-upload




// ==========================
// Student Data Page Routers
// ==========================
// !Get complete student medical profile
// Example: GET localhost:5000/doctor/student/64ff7f8bfc13ae37c6000001
DoctorRouter.get("/student/:id", getStudentMedicalProfile);

// !Get all prescriptions for a student with pagination
// Example: GET localhost:5000/doctor/student/prescriptions/:id
DoctorRouter.get("/student/prescriptions/:id", getStudentPrescriptions);

// !Create new prescription for student (indexNumber comes from request body, not params)
// Example: POST localhost:5000/doctor/student/prescriptions
DoctorRouter.post("/student/prescriptions", createPrescription);

// !Update prescription status
// Example: PATCH localhost:5000/doctor/student/prescriptions/:id/status
DoctorRouter.patch("/student/prescriptions/:id/status", updatePrescriptionStatus);

//!Get Medicine Data
DoctorRouter.get("/medicine", getMedicineList);   // localhost:5000/doctor/medicine



// ==========================
// Student Data Page Routers
// ==========================
// Medicine Page Routers
// !Doctor Medicine List
DoctorRouter.get("/medicine-list", getMedicineList); //localhost:5000/doctor/medicine-list
// !Doctor Adding New Medicine
DoctorRouter.post("/adding-new-medicine", addNewMedicine); //localhost:5000/doctor/adding-new-medicine
// !Doctor Updating Medicine
DoctorRouter.put("/updating-medicine/:id", updateMedicine); //localhost:5000/doctor/updating-medicine/:id
// !Doctor Deleting Medicine
DoctorRouter.delete("/deleting-medicine/:id", deleteMedicine); //localhost:5000/doctor/deleting-medicine/:id
// !Get Inventory Data
DoctorRouter.get("/inventory", getAllInventories); //localhost:5000/doctor/inventory



// ==========================
// Medical Request Page Routers
// ==========================
// !Get Medical Requests
DoctorRouter.get("/medical-requests", GetMedicalRequests); //localhost:5000/doctor/medical-requests
DoctorRouter.patch("/medical-requests/:id/status", ChangeMedicalRequestStatus); //localhost:5000/doctor/medical-requests/:id/status




// ==========================
// Updates Page Routers
// ==========================
DoctorRouter.get("/articles", getAllArticles);// → GET http://localhost:5000/doctor/articles

// POST new article with optional photo - PRIVATE (Doctor)
DoctorRouter.post("/articles/create", isDoctorLogin, upload.single("photo"), createArticle);// → POST http://localhost:5000/doctor/articles/create

// GET full article by ID - PUBLIC
DoctorRouter.get("/articles/:id", getArticleData);// → GET http://localhost:5000/doctor/articles/:id

// PUT update article by ID - PRIVATE (Doctor)
DoctorRouter.put("/articles/:id", isDoctorLogin, upload.single("photo"), updateArticle);// → PUT http://localhost:5000/doctor/articles/:id

// DELETE article by ID - PRIVATE (Doctor)
DoctorRouter.delete("/articles/:id", isDoctorLogin, deleteArticle);// → DELETE http://localhost:5000/doctor/articles/:id




// ==========================
// Staff Page Routers
// ==========================
DoctorRouter.get("/staff", GetAllStaff); // localhost:5000/doctor/staff


DoctorRouter.get("/students", isDoctorLogin, GetAllStudents); // localhost:5000/doctor/students
export default DoctorRouter;