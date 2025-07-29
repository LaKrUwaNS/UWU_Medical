// src/utils/Response.ts
import { Response } from "express";

/**
 * Standard API response helper
 */
export const sendResponse = (
    res: Response,
    statusCode: number,
    success: boolean,
    message: string,
    data: any = null,
    isAuthorized?: boolean // optional
) => {
    return res.status(statusCode).json({
        success,
        message,
        ...(isAuthorized !== undefined && { isAuthorized }), // include only if passed
        ...(data !== null && { data }) // include only if provided
    });
};
