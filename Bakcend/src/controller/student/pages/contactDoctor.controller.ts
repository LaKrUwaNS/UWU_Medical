import { Response } from "express";
import { AuthenticatedStudentRequest } from "../../../middleware/CheckLogin/isStudentlogin";
import { TryCatch } from "../../../utils/Error/ErrorHandler";
import { sendResponse } from "../../../utils/response";
import Massage from "../../../models/Massage.model";  // fixed filename typo
import { correctGrammar } from "./CheckAI.controller";
import Doctor from "../../../models/Doctor.model";
import mongoose from "mongoose";

// Helper: Safe grammar correction
const processMessage = async (text: string) => {
    try {
        return await correctGrammar(text);
    } catch (err) {
        console.error("Grammar correction failed:", err);
        return text;
    }
};

// Get all doctors
export const GetAllDoctors = TryCatch(async (req: AuthenticatedStudentRequest, res: Response) => {
    const doctors = await Doctor.find();
    return sendResponse(res, 200, true, "Doctors retrieved successfully", doctors);
});

// Contact a doctor (doctor optional)
export const ContactDoctor = TryCatch(async (req: AuthenticatedStudentRequest, res: Response) => {
    const user = req.user;
    if (!user) return sendResponse(res, 401, false, "Unauthorized");

    const { subject, message, urgent } = req.body;
    if (!subject || !message) {
        return sendResponse(res, 400, false, "Subject and message are required");
    }

    const correctedMessage = await processMessage(message);

    const newMessage = await Massage.create({
        sender: user.id ?? user.id as string,
        subject,
        content: correctedMessage,   // use 'content' instead of 'message'
        urgent: urgent ?? false,
        type: "Important"
    });

    if (!newMessage) {
        return sendResponse(res, 500, false, "Failed to send message");
    }

    return sendResponse(res, 201, true, "Message sent successfully", newMessage);
});

// Send message about articles
export const MassageArticles = TryCatch(async (req: AuthenticatedStudentRequest, res: Response) => {
    const user = req.user;
    if (!user) return sendResponse(res, 401, false, "Unauthorized");

    // Get article ID from URL params
    const { id } = req.params;
    if (!id) return sendResponse(res, 400, false, "Article ID is required");

    // Optional: Validate that it's a valid Mongo ObjectId
    if (!mongoose.Types.ObjectId.isValid(id)) {
        return sendResponse(res, 400, false, "Invalid Article ID");
    }

    // Validate message body
    const { message } = req.body;
    if (!message) {
        return sendResponse(res, 400, false, "Message is required");
    }

    // Correct grammar if possible
    const correctedMessage = await processMessage(message);

    // Save message linked to an article
    const newMessage = await Massage.create({
        sender: user.id ?? user.id as string,  // use id or _id string
        articleId: id,                            // check if your schema expects articleId or article
        content: correctedMessage,                // use 'content' instead of 'message'
        urgent: false,
        type: "Article"
    });

    if (!newMessage) {
        return sendResponse(res, 500, false, "Failed to send message");
    }

    return sendResponse(res, 201, true, "Message sent successfully", newMessage);
});
