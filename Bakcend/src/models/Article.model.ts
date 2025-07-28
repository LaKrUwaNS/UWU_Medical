import mongoose, { Schema, Document } from "mongoose";

export interface IArticle extends Document {
    title: string;
    content: string;
    tags?: string[];
    createdBy: {
        doctorId: mongoose.Types.ObjectId;
        doctorName: string;
    };
    createdAt: Date;
    updatedAt: Date;
}

const ArticleSchema: Schema<IArticle> = new Schema(
    {
        title: {
            type: String,
            required: true,
            trim: true,
        },
        content: {
            type: String,
            required: true,
        },
        tags: {
            type: [String],
            default: [],
        },
        createdBy: {
            doctorId: {
                type: Schema.Types.ObjectId,
                ref: "Doctor",
                required: true,
            },
            doctorName: {
                type: String,
                required: true,
            },
        }
    },
    {
        timestamps: true, 
    }
);

const Article = mongoose.model<IArticle>("Article", ArticleSchema);
export default Article;
