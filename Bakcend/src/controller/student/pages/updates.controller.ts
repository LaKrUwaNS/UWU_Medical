import { Response } from "express";
import { AuthenticatedRequest } from "../../../middleware/CheckLogin/isDotorlogin";
import { TryCatch } from "../../../utils/Error/ErrorHandler";
import { sendResponse } from "../../../utils/response";
import Article from "../../../models/Article.model";



// Get the article data
export const GetArticleData = TryCatch(async (req: AuthenticatedRequest, res: Response) => {
    const articleId = req.params.id;

    if (!articleId) return sendResponse(res, 400, false, "Article ID is required");

    const article = await Article.findById(articleId);

    if (!article) return sendResponse(res, 404, false, "Article not found");

    return sendResponse(res, 200, true, "Article retrieved successfully", article);
});



// Send message about the article