import { Response } from "express";
import { AuthenticatedRequest } from "../../../middleware/CheckLogin/isDotorlogin";
import { TryCatch } from "../../../utils/Error/ErrorHandler";
import Doctor from "../../../models/Doctor.model";
import { sendResponse } from "../../../utils/response";
import { cloudinary } from "../../../config/Claudenary";

// !Get the doctor's settings data (excluding sensitive fields and _id)
export const GetAllDataSettings = TryCatch(async (req: AuthenticatedRequest, res: Response) => {
    const doctor = req.user;

    if (!doctor) {
        return sendResponse(res, 400, false, "Doctor ID is required");
    }

    // Find doctor by ID, exclude sensitive info and _id
    const doctorData = await Doctor.findById(doctor.id)
        .select("-password -professionalEmail -title -expireAt -createdAt -updatedAt -__v -Verified -_id -securityCode")
        .lean();

    if (!doctorData) {
        return sendResponse(res, 404, false, "Doctor not found");
    }

    return sendResponse(res, 200, true, "Doctor data retrieved", doctorData);
});




//putch Change the user data
export const ChangeSettingsData = TryCatch(async (req: AuthenticatedRequest, res: Response) => {
    const doctor = req.user;
    const { email, name, phone } = req.body;
    const file = req.file as Express.Multer.File | undefined;

    if (!doctor || !doctor.id) {
        return sendResponse(res, 400, false, "Doctor ID is required");
    }

    let updateData: any = { email, name, phone };

    // If a new image file was uploaded, upload it to Cloudinary and add photo URL to update data
    if (file) {
        const uploadResult = await cloudinary.uploader.upload(file.path, {
            folder: "doctors_photos",
        });
        updateData.photo = uploadResult.url as string;
    }

    // Update the doctor document with new data
    const updatedDoctor = await Doctor.findByIdAndUpdate(
        doctor.id,
        updateData,
        { new: true }
    )
        .select("-password -professionalEmail -title -expireAt -createdAt -updatedAt -__v -Verified -_id -securityCode")
        .lean();

    if (!updatedDoctor) {
        return sendResponse(res, 404, false, "Doctor not found");
    }

    return sendResponse(res, 200, true, "Doctor data updated successfully", updatedDoctor);
});