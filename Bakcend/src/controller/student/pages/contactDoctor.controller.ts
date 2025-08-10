import { Response } from "express";
import { AuthenticatedStudentRequest } from "../../../middleware/CheckLogin/isStudentlogin";
import { TryCatch } from "../../../utils/Error/ErrorHandler";
import { sendResponse } from "../../../utils/response";
import Massage from "../../../models/Massage.mosel";
import { correctGrammar } from "./CheckAI.controller";



// Get all doctor data



// Send message
export const ContactDoctor = TryCatch(async (req: AuthenticatedStudentRequest, res: Response) => {
    const user = req.user;

    if (!user) return sendResponse(res, 401, false, "Unauthorized");

    const { subject, message, doctorId, urgent } = req.body;

    if (!subject || !message || !doctorId) {
        return sendResponse(res, 400, false, "All fields are required");
    }

    // Send message to doctor
    const CreateMessage = await Massage.create({
        sender: user.id,
        subject,
        message: await correctGrammar(message),
        urgent,
        type: "Important",
        doctor: doctorId
    });

    if (!CreateMessage) {
        return sendResponse(res, 500, false, "Failed to send message");
    }

    return sendResponse(res, 201, true, "Message sent successfully", CreateMessage);
});