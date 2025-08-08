import { Request, Response } from "express";
import Student from "../../../models/Student.model";
import { sendResponse } from "../../../utils/response";
import { TryCatch } from "../../../utils/Error/ErrorHandler";

// Get the all student data from the tables
export const GetAllStudents = TryCatch(async (req: Request, res: Response) => {
    const students = await Student.find();
    sendResponse(res, 200, true, "Students retrieved successfully", students);
});