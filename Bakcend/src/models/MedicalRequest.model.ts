import { Document, model, Schema, Types } from "mongoose";

export interface IMedicalRequest extends Document {
    studentId: Types.ObjectId;
    requestId: string;
    date: Date;
    schedule: Date;
    status: "pending" | "approved" | "rejected";
    timeNeeded: string;
    reason: string;
    createdAt?: Date;
    updatedAt?: Date;
}

const medicalRequestSchema = new Schema<IMedicalRequest>(
    {
        studentId: { type: Schema.Types.ObjectId, ref: "Student", required: true },
        requestId: { type: String, required: true, unique: true, trim: true },
        date: { type: Date, required: true },
        schedule: { type: Date, required: true, index: true }, // Index for fast queries
        status: {
            type: String,
            enum: ["pending", "approved", "rejected"],
            default: "pending"
        },
        timeNeeded: { type: String, required: true, trim: true },
        reason: { type: String, required: true, trim: true },
    },
    {
        timestamps: true,
        toJSON: { virtuals: true },
        toObject: { virtuals: true },
    }
);

/**
 * Virtual field for formatted schedule time (e.g., "10:30")
 */
medicalRequestSchema.virtual("formattedScheduleTime").get(function () {
    if (!this.schedule) return null;
    return new Date(this.schedule).toLocaleTimeString("en-US", {
        hour: "2-digit",
        minute: "2-digit",
        hour12: false
    });
});

/**
 * Virtual field to check if request is upcoming
 */
medicalRequestSchema.virtual("isUpcoming").get(function () {
    return this.schedule && this.schedule >= new Date();
});

export const MedicalRequest = model<IMedicalRequest>(
    "MedicalRequest",
    medicalRequestSchema
);
