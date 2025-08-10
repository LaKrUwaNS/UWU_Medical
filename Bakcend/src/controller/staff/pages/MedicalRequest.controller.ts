import { Response } from "express";
import { AuthenticatedRequest } from "../../../middleware/CheckLogin/isDotorlogin";
import { MedicalRequest } from "../../../models/MedicalRequest.model";
import { TryCatch } from "../../../utils/Error/ErrorHandler";
import { sendResponse } from "../../../utils/response";





export const MedicalRequests = TryCatch(async (req: AuthenticatedRequest, res: Response) => {
    const medicalRequests = await MedicalRequest.find().populate('patientId', 'name');
    return sendResponse(res, 200, true, "Medical requests retrieved successfully", medicalRequests);
});