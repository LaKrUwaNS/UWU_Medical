import { Response } from "express";
import { AuthenticatedRequest } from "../../../middleware/CheckLogin/isDotorlogin";
import { MedicalRequest } from "../../../models/MedicalRequest.model";
import { Medicine } from "../../../models/Medicine.model";
import { TryCatch } from "../../../utils/Error/ErrorHandler";
import { sendResponse } from "../../../utils/response";


// !@description Get all medical requests
export const GetMedicalRequests = TryCatch(async (req: AuthenticatedRequest, res: Response) => {
    const medicalRequests = await MedicalRequest.find();

    if (!medicalRequests || medicalRequests.length === 0) {
        return sendResponse(res, 404, false, "No medical requests found");
    }

    return sendResponse(res, 200, true, "Medical requests retrieved successfully", medicalRequests);
});


// Chanage the status of a medical request
export const ChangeMedicalRequestStatus = TryCatch(async (req: AuthenticatedRequest, res: Response) => {
    const { id } = req.params;
    const { status } = req.body;

    if (!id || !status) {
        return sendResponse(res, 400, false, "Medical request ID and status are required");
    }

    const validStatuses = ["pending", "approved", "rejected"];
    if (!validStatuses.includes(status)) {
        return sendResponse(res, 400, false, "Invalid status value");
    }

    // Prepare update object
    let updateData: any = { status };
    
    // Add expiry date if status is rejected (2 days from now)
    if (status === 'rejected') {
        const expiryDate = new Date();
        expiryDate.setDate(expiryDate.getDate() + 2);
        updateData.expiryDate = expiryDate;
    }

    const medicalRequest = await MedicalRequest.findByIdAndUpdate(id, updateData, { new: true });

    if (!medicalRequest) {
        return sendResponse(res, 404, false, "Medical request not found");
    }

    return sendResponse(res, 200, true, "Medical request status updated successfully", medicalRequest);
}
);
