import { Document, model, Schema, Types } from "mongoose";

export interface IMedicalRequest extends Document {
    studentId: Types.ObjectId;
    requestId: string;
    date: Date;
    schedule: Date;
    status: "pending" | "approved" | "rejected";
    timeNeeded: string;
    report: "need" | "external" | "havent";
    servicetype: "infection" | "allergy" | "fracture" | "asthma" | "other";
    reason: string;
    expireAt?: Date | null;
    createdAt?: Date;
    updatedAt?: Date;
}

const medicalRequestSchema = new Schema<IMedicalRequest>(
    {
        studentId: { type: Schema.Types.ObjectId, ref: "Student", required: true },
        date: { type: Date, required: true },
        schedule: { type: Date, required: true, index: true },
        status: { type: String, enum: ["pending", "approved", "rejected"], default: "pending" },
        timeNeeded: { type: String, trim: true },
        report: { type: String, enum: ["need", "external", "havent"], default: "need" },
        reason: { type: String, required: true, trim: true },
        servicetype: { type: String, enum: ["infection", "allergy", "fracture", "asthma", "other"], required: true, trim: true },

        // TTL expiration field
        expireAt: { type: Date, default: null }
    },
    {
        timestamps: true,
        toJSON: { virtuals: true },
        toObject: { virtuals: true },
    }
);

// TTL index: deletes document when expireAt is reached
medicalRequestSchema.index({ expireAt: 1 }, { expireAfterSeconds: 0 });

// Virtuals
medicalRequestSchema.virtual("formattedScheduleTime").get(function () {
    if (!this.schedule) return null;
    return new Date(this.schedule).toLocaleTimeString("en-US", {
        hour: "2-digit",
        minute: "2-digit",
        hour12: false
    });
});

medicalRequestSchema.virtual("isUpcoming").get(function () {
    return this.schedule && this.schedule >= new Date();
});

// Other indexes
medicalRequestSchema.index({ studentId: 1, status: 1 });

export const MedicalRequest = model<IMedicalRequest>("MedicalRequest", medicalRequestSchema);
