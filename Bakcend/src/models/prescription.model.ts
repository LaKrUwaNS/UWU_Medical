import { Schema, Types, model, Document } from "mongoose";

interface IDrug {
    medicineId: Types.ObjectId; // Reference to Medicine
    quantity: number;
    MedicineName?: string; // Optional field to store medicine name
}

export interface IPrescription extends Document {
    studentId: Types.ObjectId;
    doctorId: Types.ObjectId;
    date: Date;
    description: string;
    drugs: IDrug[];
    createdAt: Date;
}

const prescriptionSchema = new Schema<IPrescription>({
    studentId: { type: Schema.Types.ObjectId, ref: "Student", required: true },
    doctorId: { type: Schema.Types.ObjectId, ref: "Doctor", required: false },
    date: { type: Date, required: true },
    description: String,
    drugs: [
        {
            medicineId: { type: Schema.Types.ObjectId, ref: "Medicine", required: true },
            quantity: { type: Number, required: true }
        }
    ], createdAt: { type: Date, default: Date.now }
}, {
    timestamps: true  // Automatically manage createdAt and updatedAt fields
});

export const Prescription = model<IPrescription>("Prescription", prescriptionSchema);
