import { Response } from "express";
import { AuthenticatedStudentRequest } from "../../../middleware/CheckLogin/isStudentlogin";
import { TryCatch } from "../../../utils/Error/ErrorHandler";
import { sendResponse } from "../../../utils/response";



// Get all doctor data



// Send message
export const ContactDoctor = TryCatch(async (req: AuthenticatedStudentRequest, res: Response) => {
    const user = req.user;

    if (!user) return sendResponse(res, 401, false, "Unauthorized");

    const { subject, message, doctorId } = req.body;

});