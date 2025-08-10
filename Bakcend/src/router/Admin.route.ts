import { Router } from "express";
import { LoginUsers } from "../controller/Admin/Loginusers.controller";

const AdminRouter = Router();



AdminRouter.get("/login-users", LoginUsers);  // localhost:5000/admin/login-users












export default AdminRouter;