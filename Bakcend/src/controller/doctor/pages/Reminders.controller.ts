import { Response } from "express";
import { AuthenticatedRequest } from "../../../middleware/CheckLogin/isDotorlogin";
import Massage from "../../../models/Massage.model";
import { TryCatch } from "../../../utils/Error/ErrorHandler";
import { sendResponse } from "../../../utils/response";
import mongoose from "mongoose";

// Get all reminders (messages received by doctor)
export const GetAllReminders = TryCatch(async (req: AuthenticatedRequest, res: Response) => {
const reminders = await Massage.find().populate("sender", "indexNumber -_id");
    if (!reminders) {
        return sendResponse(res, 404, false, "No reminders found");
    }
    return sendResponse(res, 200, true, "Reminders fetched successfully", reminders);
});

// Change the 'read' status of first unread reminder
export const ChangeRead = TryCatch(async (req: AuthenticatedRequest, res: Response) => {
    const { id } = req.params;

    if (!mongoose.Types.ObjectId.isValid(id)) {
        return sendResponse(res, 400, false, "Invalid reminder ID");
    }

    const updatedReminder = await Massage.findOneAndUpdate(
        { _id: id, Read: false },
        { Read: true },
        { new: true }
    );

    if (!updatedReminder) {
        return sendResponse(res, 404, false, "Reminder not found or already read");
    }

    return sendResponse(res, 200, true, "Reminder updated successfully", updatedReminder);
});

// Delete a reminder by id for the doctor
export const DeleteMassage = TryCatch(async (req: AuthenticatedRequest, res: Response) => {
    const { id } = req.params;

    if (!mongoose.Types.ObjectId.isValid(id)) {
        return sendResponse(res, 400, false, "Invalid reminder ID");
    }

    const reminder = await Massage.findOneAndDelete({ _id: id });
    if (!reminder) {
        return sendResponse(res, 404, false, "Reminder not found");
    }

    return sendResponse(res, 200, true, "Reminder deleted successfully");
});
