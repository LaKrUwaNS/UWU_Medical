import { Response } from "express";
import { AuthenticatedRequest } from "../../../middleware/CheckLogin/isDotorlogin";
import Article from "../../../models/Article.model";
import { TryCatch } from "../../../utils/Error/ErrorHandler";
import { sendResponse } from "../../../utils/response";
import { cloudinary } from "../../../config/Claudenary";

/**
 * !@desc !Create a new article
 * @route POST /api/articles
 * @access Private (Doctor)
 */
export const createArticle = TryCatch(async (req: AuthenticatedRequest, res: Response) => {
    const user = req.user;

    if (!user || !user.id) {
        return sendResponse(res, 401, false, "Unauthorized: User not found");
    }

    const { title, content, tags } = req.body;

    if (!title || !content) {
        return sendResponse(res, 400, false, "Title and content are required");
    }

    const file = req.file as Express.Multer.File | undefined;
    if (!file) {
        return sendResponse(res, 400, false, "No image file uploaded");
    }

    // Upload the file to Cloudinary
    const uploadResult = await cloudinary.uploader.upload(file.path, {
        folder: "articles_photos", // your Cloudinary folder
    });

    // Parse tags safely
    let parsedTags: string[] = [];
    if (tags) {
        try {
            parsedTags = typeof tags === "string" ? JSON.parse(tags) : tags;
        } catch {
            parsedTags = [];
        }
    }

    // Create article with Cloudinary photo URL
    const article = await Article.create({
        title,
        content,
        tags: parsedTags,
        photo: uploadResult.secure_url,
        createdBy: {
            doctorId: user.id,
            doctorName: user.fullName,
        },
    });

    return sendResponse(res, 201, true, "Article created successfully with uploaded photo", article);
});
/**
 * !@desc Get all articles (only title & photo)
 * @route GET /api/articles
 * @access Public
 */
export const getAllArticles = TryCatch(async (req: AuthenticatedRequest, res: Response): Promise<void> => {
    const articles = await Article.find()
        .select("title photo")
        .lean();

    sendResponse(res, 200, true, "Articles fetched successfully", articles);
});

/**
 * @desc Get full article by ID
 * @route GET /api/articles/:id
 * @access Public
 */
export const getArticleData = TryCatch(async (req: AuthenticatedRequest, res: Response): Promise<void> => {
    const { id } = req.params;

    const article = await Article.findById(id).lean();

    if (!article) {
        sendResponse(res, 404, false, "Article not found");
        return;
    }

    sendResponse(res, 200, true, "Article fetched successfully", article);
});

/**
 * !@desc Update an article by ID
 * @route PUT /api/articles/:id
 * @access Private (Doctor)
 */
export const updateArticle = TryCatch(async (req: AuthenticatedRequest, res: Response): Promise<void> => {
    const { id } = req.params;
    const { title, content, tags, photo } = req.body;

    // Check if the user is authenticated
    if (!req.user) {
        sendResponse(res, 401, false, "User not authenticated");
        return;
    }

    // Find the article first
    const existingArticle = await Article.findById(id);

    if (!existingArticle) {
        sendResponse(res, 404, false, "Article not found");
        return;
    }

    // Ensure only the doctor who created it can update
    if (existingArticle.createdBy.doctorId.toString() !== req.user.id) {
        sendResponse(res, 403, false, "Unauthorized to update this article");
        return;
    }

    // Update fields only if provided
    if (title !== undefined) existingArticle.title = title;
    if (content !== undefined) existingArticle.content = content;
    if (tags !== undefined) existingArticle.tags = tags;
    if (photo !== undefined) existingArticle.photo = photo;

    const updatedArticle = await existingArticle.save();

    sendResponse(res, 200, true, "Article updated successfully", updatedArticle);
});


/**
 * !@desc Delete an article by ID
 * @route DELETE /api/articles/:id
 * @access Private (Doctor)
 */
export const deleteArticle = TryCatch(async (req: AuthenticatedRequest, res: Response): Promise<void> => {
    const { id } = req.params;

    if (!req.user) {
        sendResponse(res, 401, false, "User not authenticated");
        return;
    }

    // Find the article
    const article = await Article.findById(id);

    if (!article) {
        sendResponse(res, 404, false, "Article not found");
        return;
    }

    // Check if the logged-in doctor is the creator
    if (article.createdBy.doctorId.toString() !== req.user.id) {
        sendResponse(res, 403, false, "You are not authorized to delete this article");
        return;
    }

    // Delete the article
    await article.deleteOne();

    sendResponse(res, 200, true, "Article deleted successfully");
});
