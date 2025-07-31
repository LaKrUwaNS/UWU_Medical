import { z } from "zod";
import { Request, Response, NextFunction, RequestHandler } from "express";

//! Doctor schemas
export const RegisterDoctorZodSchema = z.object({
    userName: z.string({
        required_error: "Username is required",
        invalid_type_error: "Username must be a string",
    }).min(3, { message: "Username must be at least 3 characters" }),
    fullName: z.string({
        required_error: "Full name is required",
        invalid_type_error: "Full name must be a string",
    }).min(3, { message: "Full name must be at least 3 characters" }),
    password: z.string({
        required_error: "Password is required",
        invalid_type_error: "Password must be a string",
    }).min(8, { message: "Password must be at least 8 characters" }),
    personalEmail: z.string({
        required_error: "Personal email is required",
        invalid_type_error: "Personal email must be a string",
    }).email({ message: "Invalid personal email" }),
    professionalEmail: z.string({
        required_error: "Professional email is required",
        invalid_type_error: "Professional email must be a string",
    }).email({ message: "Invalid professional email" }),
    securityCode: z.string({
        required_error: "Security code is required",
        invalid_type_error: "Security code must be a string",
    }).min(6, { message: "Security code must be at least 6 characters" }),
    title: z.string({
        required_error: "Title is required",
        invalid_type_error: "Title must be a string",
    }).min(2, { message: "Title is required" }),
});

// OTP verification
export const otpVerificationSchema = z.object({
    email: z.string({
        required_error: "Email is required",
        invalid_type_error: "Email must be a string",
    }).email({ message: "Invalid email address" }),
    otp: z.string({
        required_error: "OTP is required",
        invalid_type_error: "OTP must be a string",
    }).min(4, { message: "OTP is required and must be at least 4 characters" }),
});

// Doctor login
export const loginSchema = z.object({
    email: z.string({
        required_error: "Email is required",
        invalid_type_error: "Email must be a string",
    }).email({ message: "Invalid email address" }),
    password: z.string({
        required_error: "Password is required",
        invalid_type_error: "Password must be a string",
    }).min(6, { message: "Password must be at least 6 characters" }),
});

// Forgot password
export const forgotPasswordSchema = z.object({
    email: z.string({
        required_error: "Email is required",
        invalid_type_error: "Email must be a string",
    }).email({ message: "Invalid email address" }),
});

// Reset password
export const resetPasswordSchema = z.object({
    email: z.string({
        required_error: "Email is required",
        invalid_type_error: "Email must be a string",
    }).email({ message: "Invalid email address" }),
    otp: z.string({
        required_error: "OTP is required",
        invalid_type_error: "OTP must be a string",
    }).length(5, { message: "OTP must be exactly 5 characters" }),
    password: z.string({
        required_error: "Password is required",
        invalid_type_error: "Password must be a string",
    }).min(6, { message: "Password must be at least 6 characters" }),
});

//! Student enums
const genderEnum = z.enum(['male', 'female', 'other'], {
    errorMap: () => ({ message: "Gender must be one of: male, female, or other" }),
});
const bloodTypeEnum = z.enum(['A+', 'A-', 'B+', 'B-', 'AB+', 'AB-', 'O+', 'O-'], {
    errorMap: () => ({ message: "Blood type must be one of: A+, A-, B+, B-, AB+, AB-, O+, O-" }),
});

//! Student schemas

//! Updated Student registration schema including degree and presentYear
export const StudentregisterStudentSchema = z.object({
    universityEmail: z.string({
        required_error: "Email is required",
        invalid_type_error: "Email must be a string",
    }).email({ message: "Invalid email format" }),
    indexNumber: z.string({
        required_error: "Index number is required",
        invalid_type_error: "Index number must be a string",
    }).min(1, { message: "Index number is required" }),
    password: z.string({
        required_error: "Password is required",
        invalid_type_error: "Password must be a string",
    }).min(6, { message: "Password must be at least 6 characters" }),
    name: z.string({
        required_error: "Name is required",
        invalid_type_error: "Name must be a string",
    }).min(1, { message: "Name is required" }),
    gender: genderEnum,
    contactNumber: z.array(z.string().min(7, { message: "Contact number must be at least 7 characters" })),
    emergencyNumber: z.string({
        required_error: "Emergency number is required",
        invalid_type_error: "Emergency number must be a string",
    }).min(7, { message: "Emergency number must be at least 7 characters" }),
    bloodType: bloodTypeEnum,
    allergies: z.array(z.string().optional()),

});

export const StudentverifyStudentOtpSchema = z.object({
    universityEmail: z.string({
        required_error: "Email is required",
        invalid_type_error: "Email must be a string",
    }).min(1, { message: "Email is required" }),
    otp: z.string({
        required_error: "OTP is required",
        invalid_type_error: "OTP must be a string",
    }).min(1, { message: "OTP is required" }),
});

export const StudentloginStudentSchema = z.object({
    universityEmail: z.string()
        .optional()
        .refine(val => val === undefined || val.length > 0, {
            message: "Email cannot be empty if provided",
        }),
    password: z.string()
        .optional()
        .refine(val => val === undefined || val.length >= 6, {
            message: "Password must be at least 6 characters if provided",
        }),
});

export const StudentforgotPasswordSchema = z.object({
    universityEmail: z.string({
        required_error: "Email is required",
        invalid_type_error: "Email must be a string",
    }).min(1, { message: "Email is required" }),
});

export const StudentresetPasswordSchema = z.object({
    universityEmail: z.string({
        required_error: "Email is required",
        invalid_type_error: "Email must be a string",
    }).min(1, { message: "Email is required" }),
    otp: z.string({
        required_error: "OTP is required",
        invalid_type_error: "OTP must be a string",
    }).min(1, { message: "OTP is required" }),
    password: z.string({
        required_error: "New password is required",
        invalid_type_error: "New password must be a string",
    }).min(6, { message: "New password must be at least 6 characters" }),
});


//! Staff schemas
export const StaffRegisterSchema = z.object({
    name: z.string({
        required_error: "Name is required",
        invalid_type_error: "Name must be a string",
    }).min(2, { message: "Name is too short" }),
    title: z.string({
        required_error: "Title is required",
        invalid_type_error: "Title must be a string",
    }).min(2, { message: "Title is required" }),
    email: z.string({
        required_error: "Email is required",
        invalid_type_error: "Email must be a string",
    }).email({ message: "Invalid email format" }),
    password: z.string({
        required_error: "Password is required",
        invalid_type_error: "Password must be a string",
    }).min(6, { message: "Password must be at least 6 characters" }),
    jobTitle: z.string({
        required_error: "Job title is required",
        invalid_type_error: "Job title must be a string",
    }).min(2, { message: "Job title is required" }),
    mobileNumber: z.string({
        required_error: "Mobile number is required",
        invalid_type_error: "Mobile number must be a string",
    }).min(10, { message: "Invalid mobile number" }),
    securityCode: z.string({
        required_error: "Security code is required",
        invalid_type_error: "Security code must be a string",
    }).min(4, { message: "Security code must be at least 4 characters" }),
});

export const StaffVerifyOtpSchema = z.object({
    email: z.string({
        required_error: "Email is required",
        invalid_type_error: "Email must be a string",
    }).email({ message: "Invalid email format" }),
    otp: z.string({
        required_error: "OTP is required",
        invalid_type_error: "OTP must be a string",
    }).min(4, { message: "OTP must be at least 4 digits" }),
});

export const StaffLoginSchema = z.object({
    email: z.string({
        required_error: "Email is required",
        invalid_type_error: "Email must be a string",
    }).email({ message: "Invalid email format" }),
    password: z.string({
        required_error: "Password is required",
        invalid_type_error: "Password must be a string",
    }).min(6, { message: "Password must be at least 6 characters" }),
});

export const StaffForgotPasswordSchema = z.object({
    email: z.string({
        required_error: "Email is required",
        invalid_type_error: "Email must be a string",
    }).email({ message: "Invalid email format" }),
});

export const StaffResetPasswordSchema = z.object({
    email: z.string({
        required_error: "Email is required",
        invalid_type_error: "Email must be a string",
    }).email({ message: "Invalid email format" }),
    otp: z.string({
        required_error: "OTP is required",
        invalid_type_error: "OTP must be a string",
    }).min(4, { message: "OTP must be at least 4 digits" }),
    password: z.string({
        required_error: "Password is required",
        invalid_type_error: "Password must be a string",
    }).min(6, { message: "New password must be at least 6 characters" }),
});

export const StaffLogoutSchema = z.object({
    // Optional fields can be added if needed; otherwise blank for cookie-only logout
});

//! Middleware to validate and send simplified errors
export const validateMiddleware = (schema: z.ZodType): RequestHandler => {
    return (req: Request, res: Response, next: NextFunction): void => {
        try {
            schema.parse(req.body);
            next();
        } catch (error) {
            if (error instanceof z.ZodError) {
                const uniqueMessages = Array.from(
                    new Set(error.errors.map(err => err.message))
                );

                res.status(400).json({
                    success: false,
                    errors: uniqueMessages,
                });
                return;
            }
            next(error);
        }
    };
};
