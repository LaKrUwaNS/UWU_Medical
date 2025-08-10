import { Router } from "express";
import { GetAllDoctors, GetAllStaff, GetAllStudents, LoginUsers } from "../controller/Admin/Loginusers.controller";

const AdminRouter = Router();



AdminRouter.get("/login-users", LoginUsers);  // localhost:5000/admin/login-users

AdminRouter.get("/students", GetAllStudents);  // localhost:5000/admin/students
AdminRouter.get("/doctors", GetAllDoctors);  // localhost:5000/admin/doctors
AdminRouter.get("/staff", GetAllStaff);  // localhost:5000/admin/staff








export default AdminRouter;