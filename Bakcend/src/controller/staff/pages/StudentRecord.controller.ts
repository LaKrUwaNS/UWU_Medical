import { Request, Response } from 'express';
import { TryCatch } from '../../../utils/Error/ErrorHandler';
import Student from '../../../models/Student.model';
import { sendResponse } from '../../../utils/response';

// Get all students
export const getAllStudents = TryCatch(async (req: Request, res: Response) => {
    const students = await Student.find();
    return sendResponse(res, 200, true, 'All students retrieved successfully', { students });
});

// Get single student by ID from params
export const getStudentById = TryCatch(async (req: Request, res: Response) => {
    const studentId = req.params.id;
    const student = await Student.findById(studentId);
    if (!student) {
        return sendResponse(res, 404, false, 'Student not found');
    }
    return sendResponse(res, 200, true, 'Student retrieved successfully', { student });
});

// Edit/update student by ID
export const updateStudentById = TryCatch(async (req: Request, res: Response) => {
    const studentId = req.params.id;
    // Note: req.body should contain only updatable fields
    const updateData = req.body;

    // To prevent password overwriting unintentionally, you can handle it separately if needed
    if (updateData.password) {
        // If you want to hash password here instead of schema pre-save hook,
        // otherwise remove password from updateData to avoid overwriting plain text
        delete updateData.password;
    }

    const updatedStudent = await Student.findByIdAndUpdate(studentId, updateData, {
        new: true,
        runValidators: true,
    });

    if (!updatedStudent) {
        return sendResponse(res, 404, false, 'Student not found');
    }
    return sendResponse(res, 200, true, 'Student updated successfully', { updatedStudent });
});

// Delete student by ID
export const deleteStudentById = TryCatch(async (req: Request, res: Response) => {
    const studentId = req.params.id;
    const deletedStudent = await Student.findByIdAndDelete(studentId);
    if (!deletedStudent) {
        return sendResponse(res, 404, false, 'Student not found');
    }
    return sendResponse(res, 200, true, 'Student deleted successfully');
});
