import { Response } from "express";
import { AuthenticatedRequest } from "../../../middleware/CheckLogin/isDotorlogin";
import { TryCatch } from "../../../utils/Error/ErrorHandler";
import { MedicalRequest } from "../../../models/MedicalRequest.model";
import { sendResponse } from "../../../utils/response";


export const MedicalReportsStaff = TryCatch(async (req: AuthenticatedRequest, res: Response) => {
    // Your logic to get medical reports for staff
});