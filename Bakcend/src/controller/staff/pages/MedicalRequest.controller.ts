import { Response } from "express";
import { AuthenticatedRequest } from "../../../middleware/CheckLogin/isDotorlogin";
import { TryCatch } from "../../../utils/Error/ErrorHandler";
import { MedicalRequest } from "../../../models/MedicalRequest.model";
import { sendResponse } from "../../../utils/response";

export const MedicalRequestsStaff = TryCatch(async (req: AuthenticatedRequest, res: Response) => {
    // Find all medical requests and populate student info (name, indexNumber, photo)
    const medicalRequests = await MedicalRequest.find()
        .populate('studentId', 'name indexNumber photo');

    // Get counts by status
    const totalRequests = await MedicalRequest.countDocuments();
    const totalPending = await MedicalRequest.countDocuments({ status: "pending" });
    const totalApproved = await MedicalRequest.countDocuments({ status: "approved" });
    const totalRejected = await MedicalRequest.countDocuments({ status: "rejected" });

    // Return results with counts grouped under 'stats'
    return sendResponse(res, 200, true, "Medical requests retrieved successfully", {
        medicalRequests,
        stats: {
            totalRequests,
            totalPending,
            totalApproved,
            totalRejected
        }
    });
});
