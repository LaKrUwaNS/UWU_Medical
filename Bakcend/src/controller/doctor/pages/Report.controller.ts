import { Response } from "express";
import { AuthenticatedRequest } from "../../../middleware/CheckLogin/isDotorlogin";
import { Prescription } from "../../../models/prescription.model";
import { TryCatch } from "../../../utils/Error/ErrorHandler";
import { sendResponse } from "../../../utils/response";

export const ReportData = TryCatch(async (req: AuthenticatedRequest, res: Response) => {
    const prescriptions = await Prescription.find();

    const weekdays = ['Sunday', 'Monday', 'Tuesday', 'Wednesday', 'Thursday', 'Friday', 'Saturday'];

    const groupedByWeekday: { [key: string]: number } = {
        'Sunday': 0,
        'Monday': 0,
        'Tuesday': 0,
        'Wednesday': 0,
        'Thursday': 0,
        'Friday': 0,
        'Saturday': 0,
    };

    prescriptions.forEach((prescription) => {
        const date = prescription.createdAt ? new Date(prescription.createdAt) : new Date();
        const dayIndex = date.getDay();
        const dayName = weekdays[dayIndex];

        groupedByWeekday[dayName] += 1;
    });

    const chartData = weekdays.map(day => ({
        name: day,
        value: groupedByWeekday[day],
    }));

    sendResponse(res, 200, true, "Chart data retrieved successfully", chartData);
});


export const CardData = TryCatch(async (req: AuthenticatedRequest, res: Response) => {
    const prescriptions = await Prescription.find();

    const totalPrescriptions = prescriptions.length;

    const cardData = {
        totalPrescriptions,
        // Add more card data as needed
    };

    sendResponse(res, 200, true, "Card data retrieved successfully", cardData);
});