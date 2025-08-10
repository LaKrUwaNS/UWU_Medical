import { Request, Response } from "express";
import { sendResponse } from "../../../utils/response";
import { TryCatch } from "../../../utils/Error/ErrorHandler";
import { GoogleGenAI } from "@google/genai";

const ai = new GoogleGenAI({});

export const generateSummary = TryCatch(async (req: Request, res: Response): Promise<void> => {
    const { text } = req.body;
    const summary = await summarizeText(text);
    sendResponse(res, 200, true, summary);
});

// Reusable functions
export async function summarizeText(paragraph: string): Promise<any> {
    const response = await ai.models.generateContent({
        model: "gemini-2.5-flash", // use your valid model name here
        contents: [
            {
                role: "user",
                parts: [{ text: `Summarize this paragraph:\n${paragraph}` }],
            },
        ],
    });

    return response.text;
}


// Making the Grammer errors and make more clear meaning full massage
export async function correctGrammar(text: string): Promise<any> {
    const response = await ai.models.generateContent({
        model: "gemini-2.5-flash",
        contents: [
            {
                role: "user",
                parts: [{ text: `Correct the grammar and make this message more clear:\n${text}` }],
            },
        ],
    });

    return response.text;
}
