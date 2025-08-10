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


// Approve medical request
export const ApproveMedicalRequest = TryCatch(async (req: AuthenticatedRequest, res: Response) => {
    const { id } = req.params;

    const request = await MedicalRequest.findByIdAndUpdate(
        id,
        { status: "approved" },
        { new: true }
    ).populate('studentId', 'name indexNumber photo');

    if (!request) {
        return sendResponse(res, 404, false, "Medical request not found");
    }

    return sendResponse(res, 200, true, "Medical request approved successfully", { request });
});



// Reject medical request
export const RejectMedicalRequest = TryCatch(async (req: AuthenticatedRequest, res: Response) => {
    const { id } = req.params;

    const request = await MedicalRequest.findByIdAndUpdate(
        id,
        {
            status: "rejected",
            expireAt: new Date(Date.now() + 1 * 24 * 60 * 60 * 1000) // 1 day from now
        },
        { new: true } // Return the updated document
    ).populate('studentId', 'name indexNumber photo');

    if (!request) {
        return sendResponse(res, 404, false, "Medical request not found");
    }

    return sendResponse(res, 200, true, "Medical request rejected successfully", { request });
});
