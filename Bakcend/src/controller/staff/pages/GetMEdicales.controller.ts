import { Response } from "express";
import { AuthenticatedStudentRequest } from "../../../middleware/CheckLogin/isStudentlogin";
import { MedicalRequest } from "../../../models/MedicalRequest.model";
import { TryCatch } from "../../../utils/Error/ErrorHandler";
import { sendResponse } from "../../../utils/response";

// !Get the all of the medical data 
export const getMedicalData = TryCatch(async (req: AuthenticatedStudentRequest, res: Response) => {
    const user = req.user;

    if (!user || !user.id) {
        return sendResponse(res, 401, false, "Unauthorized: User not found");
    }

    const studentId = user.id;
    const medicalData = await MedicalRequest.find({ studentId });

    if (!medicalData || medicalData.length === 0) {
        return sendResponse(res, 404, false, "Medical data not found");
    }

    return sendResponse(res, 200, true, "Medical data fetched successfully", medicalData);
});
