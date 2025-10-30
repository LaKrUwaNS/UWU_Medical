import { Request, Response } from "express";
import { TryCatch } from "../../../utils/Error/ErrorHandler";
import { MedicalRequest } from "../../../models/MedicalRequest.model";
import { AuthenticatedStudentRequest } from "../../../middleware/CheckLogin/isStudentlogin";
import { sendResponse } from "../../../utils/response";


// Apply a medical request
export const ApplyMedicalRequest = TryCatch(async (req: AuthenticatedStudentRequest, res: Response) => {
    const studentId = req.user?.id;
    const { medicalReason, date, description, history, time } = req.body;

    if (!studentId) {
        return sendResponse(res, 401, false, "Unauthorized: Student not found");
    }

    if (!medicalReason || !date) {
        return sendResponse(res, 400, false, "Medical reason and date are required.");
    }

    const medicalRequest = await MedicalRequest.create({
        studentId,
        date: new Date(),
        schedule: new Date(date),
        timeNeeded: time,
        status: "pending",
        report: "need",
        reason: medicalReason,
        description,
        history,
    });

    return res.status(201).json({ message: "Medical request created successfully.", medicalRequest });
});


// Get the all of teh medicals 
export const getMedicalData = TryCatch(async (req: AuthenticatedStudentRequest, res: Response) => {
    const studentId = req.user?.id;
    if (!studentId) {
        return sendResponse(res, 401, false, "Unauthorized: Student not found");
    }

    const medicalData = await MedicalRequest.findOne({ studentId });
    if (!medicalData) {
        return sendResponse(res, 404, false, "Medical data not found");
    }

    return sendResponse(res, 200, true, "Medical data fetched successfully", medicalData);
});