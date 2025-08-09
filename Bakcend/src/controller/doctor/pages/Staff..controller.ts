import { Response } from "express";
import { AuthenticatedRequest } from "../../../middleware/CheckLogin/isDotorlogin";
import { Staff } from "../../../models/Staff.model";
import { TryCatch } from "../../../utils/Error/ErrorHandler";
import { sendResponse } from "../../../utils/response";



//GET /api/staff – list all staff
export const GetAllStaff = TryCatch(async (req: AuthenticatedRequest, res: Response) => {
    const staff = await Staff.find();
    const staffCount = await Staff.countDocuments();
    sendResponse(res, 200, true, "Staff fetched successfully", { staff, staffCount });
});


