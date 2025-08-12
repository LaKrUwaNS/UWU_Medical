import mongoose, { Schema, Document, model } from 'mongoose';

export interface MassageProps extends Document {
    sender: mongoose.Types.ObjectId;
    receiver: mongoose.Types.ObjectId;
    articleId?: mongoose.Types.ObjectId; // Optional for article messagese
    content: string;
    subject?: string;
    type: "Article" | "Important";
    urgent: boolean;
}

const MassageSchema = new Schema<MassageProps>({
    sender: { type: mongoose.Schema.Types.ObjectId, ref: 'User', required: true },
    receiver: { type: mongoose.Schema.Types.ObjectId, ref: 'User', required: false },
    content: { type: String, required: true },
    articleId: { type: mongoose.Schema.Types.ObjectId, ref: 'Article', required: false }, // Optional for article messages    
    subject: { type: String },
    type: { type: String, enum: ["Article", "Important"], required: true },
    urgent: { type: Boolean, default: false, required: true }
}, {
    timestamps: true,
});

const Massage = model<MassageProps>('Massage', MassageSchema);

export default Massage;
