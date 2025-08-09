import { Request, Response } from "express";
import { TryCatch } from "../../../utils/Error/ErrorHandler";
import { MedicalRequest } from "../../../models/MedicalRequest.model";
import { AuthenticatedStudentRequest } from "../../../middleware/CheckLogin/isStudentlogin";

export const ApplyMedicalRequest = TryCatch(async (req: AuthenticatedStudentRequest, res: Response) => {
    const studentId = req.user?.id;
    const { medicalReason, date, servicetype } = req.body;

    if (!studentId) {
        return res.status(401).json({ message: "Unauthorized" });
    }

    if (!medicalReason || !date || !servicetype) {
        return res.status(400).json({ message: "Medical reason, date, and service type are required" });
    }

    const medicalRequest = await MedicalRequest.create({
        studentId,
        date: new Date(),
        schedule: new Date(date),
        status: "pending",
        report: "need",
        reason: medicalReason,
        servicetype
    });

    return res.status(201).json({ message: "Medical request created", medicalRequest });
});
