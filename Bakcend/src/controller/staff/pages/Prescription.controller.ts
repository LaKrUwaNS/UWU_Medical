import { Response } from "express";
import { AuthenticatedRequest } from "../../../middleware/CheckLogin/isDotorlogin";
import { TryCatch } from "../../../utils/Error/ErrorHandler";
import { sendResponse } from "../../../utils/response";
import { Prescription } from "../../../models/prescription.model";

export const GetPrescriptionData = TryCatch(async (req: AuthenticatedRequest, res: Response) => {
    const prescriptions = await Prescription.find()
        .populate({
            path: "studentId",
            select: "name indexNumber degree email photo contactNumber",
        })
        .sort({ createdAt: -1 }); // newest first, optional

    return sendResponse(
        res,
        200,
        true,
        "Prescription data retrieved successfully",
        { prescriptions }
    );
});
