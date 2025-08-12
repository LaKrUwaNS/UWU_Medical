import { Request, Response } from "express";
import { TryCatch } from "../../../utils/Error/ErrorHandler";
import { MedicalRequest } from "../../../models/MedicalRequest.model";
import { AuthenticatedStudentRequest } from "../../../middleware/CheckLogin/isStudentlogin";

// Apply a medical request
export const ApplyMedicalRequest = TryCatch(async (req: AuthenticatedStudentRequest, res: Response) => {
    const studentId = req.user?.id;
    const { medicalReason, date, description, history, time } = req.body;

    if (!studentId) {
        return res.status(401).json({ message: "Unauthorized" });
    }

    if (!medicalReason || !date) {
        return res.status(400).json({ message: "Medical reason and date are required." });
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
