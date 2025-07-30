import { Request, Response } from "express";
import { AuthenticatedRequest } from "../../../middleware/CheckLogin/isDotorlogin";
import { Prescription } from "../../../models/prescription.model";
import { TryCatch } from "../../../utils/Error/ErrorHandler";
import { Staff } from "../../../models/Staff.model";
import { MedicalRequest } from "../../../models/MedicalRequest.model";

export const getDashBoard = TryCatch(async (req: AuthenticatedRequest, res: Response): Promise<void> => {














});
