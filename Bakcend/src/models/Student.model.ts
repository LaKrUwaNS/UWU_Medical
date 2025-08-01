import { Schema, model, Document } from 'mongoose';
import { comparePassword, hashPassword } from '../utils/hashing';

export interface IStudent {
    indexNumber: string;          // e.g., "2023/CS/02/123"
    universityEmail: string;      // unique email used for communication & login
    password: string;
    name: string;
    gender: 'male' | 'female' | 'other';
    contactNumber: string[];
    emergencyNumber: string;
    bloodType: 'A+' | 'A-' | 'B+' | 'B-' | 'AB+' | 'AB-' | 'O+' | 'O-';
    allergies?: string[];
    degree?: string;               // now required as a normal field
    presentYear?: number;          // now required as a normal field (1-4)
    isVerified: boolean;
    year?: number;                // derived from indexNumber only
    photo?: string;
    expireAt?: Date | null;
}

export interface IStudentDocument extends IStudent, Document {
    comparePass(enteredPassword: string): Promise<boolean>;
}

const studentSchema = new Schema<IStudentDocument>(
    {
        indexNumber: { type: String, required: true, trim: true },
        universityEmail: { type: String, required: true, unique: true, lowercase: true, trim: true },
        password: { type: String, required: true, minlength: 6 },
        name: { type: String, required: true, trim: true },
        gender: { type: String, enum: ['male', 'female', 'other'], required: true },
        contactNumber: { type: [String], required: true },
        emergencyNumber: { type: String, required: true },
        bloodType: {
            type: String,
            enum: ['A+', 'A-', 'B+', 'B-', 'AB+', 'AB-', 'O+', 'O-'],
            required: true,
        },
        allergies: { type: [String], default: [] },
        degree: { type: String },         // explicitly required
        presentYear: { type: Number, min: 1, max: 4 },  // explicitly required
        photo: { type: String },
        year: { type: Number },
        isVerified: { type: Boolean, default: false },
        expireAt: { type: Date, default: null },
    },
    {
        timestamps: true,
        toJSON: { virtuals: true },
        toObject: { virtuals: true },
    }
);

// TTL index for auto-delete after expireAt
studentSchema.index({ expireAt: 1 }, { expireAfterSeconds: 0 });

// Pre-save hook: parse year from indexNumber and hash password
studentSchema.pre<IStudentDocument>('save', async function (next) {
    try {
        if (this.isModified('indexNumber') && this.indexNumber) {
            const parts = this.indexNumber.split('/');

            if (parts.length >= 4) {
                // parts[1] is degree code, e.g., "ICT"
                this.degree = parts[1];

                // parts[2] is year part, e.g., "22" (convert to full year e.g., 2022)
                const parsedYear = Number(parts[2]);
                if (!isNaN(parsedYear)) {
                    // Optionally convert two-digit year to four-digit, e.g. '22' -> 2022
                    this.year = parsedYear < 100 ? 2000 + parsedYear : parsedYear;
                } else {
                    this.year = undefined;
                }
            }
        }

        if (this.isModified('password')) {
            this.password = await hashPassword(this.password, 10);
        }

        next();
    } catch (err) {
        next(err as Error);
    }
});


// Password compare method
studentSchema.methods.comparePass = async function (enteredPassword: string): Promise<boolean> {
    return comparePassword(enteredPassword, this.password);
};

const Student = model<IStudentDocument>('Student', studentSchema);
export default Student;
