import { Response } from "express";
import { AuthenticatedRequest } from "../../../middleware/CheckLogin/isDotorlogin";
import { Prescription } from "../../../models/prescription.model";
import { TryCatch } from "../../../utils/Error/ErrorHandler";
import { sendResponse } from "../../../utils/response";
import Student from "../../../models/Student.model";
import { MedicalRequest } from "../../../models/MedicalRequest.model";

export const ReportData = TryCatch(async (req: AuthenticatedRequest, res: Response) => {
    // Get all prescriptions
    const prescriptions = await Prescription.find();

    // Weekday names
    const weekdays = ['Sunday', 'Monday', 'Tuesday', 'Wednesday', 'Thursday', 'Friday', 'Saturday'];

    // Initialize counts for each weekday
    const groupedByWeekday: { [key: string]: number } = weekdays.reduce((acc, day) => {
        acc[day] = 0;
        return acc;
    }, {} as { [key: string]: number });

    // Count prescriptions by weekday
    prescriptions.forEach((prescription) => {
        const date = prescription.createdAt ? new Date(prescription.createdAt) : new Date();
        const dayName = weekdays[date.getDay()];
        groupedByWeekday[dayName] += 1;
    });

    // Prepare chart data
    const chartData = weekdays.map(day => ({
        name: day,
        value: groupedByWeekday[day],
    }));

    // Card data counts
    const [TotalStudents, TotalMedicalRequests, TotalPrescriptions] = await Promise.all([
        Student.countDocuments(),
        MedicalRequest.countDocuments(),
        Prescription.countDocuments()
    ]);

    sendResponse(res, 200, true, "Dashboard data retrieved successfully", {
        chartData,
        cards: {
            TotalStudents,
            TotalMedicalRequests,
            TotalPrescriptions
        }
    });
});
