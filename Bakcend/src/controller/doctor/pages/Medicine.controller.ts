import { Request, Response } from "express";
import { AuthenticatedRequest } from "../../../middleware/CheckLogin/isDotorlogin";
import { Inventory } from "../../../models/Inventory.model";
import { IMedicine, Medicine } from "../../../models/Medicine.model";
import { TryCatch } from "../../../utils/Error/ErrorHandler";
import { sendResponse } from "../../../utils/response";
import { Types } from "mongoose";

/**
 * !@description Get list of all medicines
 * @route GET /api/medicines
 * @access Authenticated
 */
export const getMedicineList = TryCatch(async (req: AuthenticatedRequest, res: Response) => {
    const medicines = await Medicine.find().populate('inventoryId', 'inventoryKey');
    return sendResponse(res, 200, true, "Medicines retrieved successfully", medicines);
});

/**
 * !@description Add new medicine to inventory
 * @route POST /api/medicines
 * @access Authenticated
 */
export const addNewMedicine = TryCatch(async (req: AuthenticatedRequest, res: Response) => {
    const { medicineName, status, quantity, inventoryKey, expirationDate, inventoryId } = req.body;

    if (!medicineName || !quantity || !inventoryKey || !expirationDate) {
        return sendResponse(res, 400, false, "Medicine name, quantity, expiration date, and inventory ID are required");
    }

    const inventoryExists = await Inventory.find({ _id: inventoryId });
    if (!inventoryExists) {
        return sendResponse(res, 404, false, "Inventory not found");
    }

    const medicine = await Medicine.create({
        medicineName,
        status: status || 'in stock',
        quantity,
        inventoryKey,
        expirationDate: new Date(expirationDate),
        inventoryId: new Types.ObjectId(inventoryId)
    });

    return sendResponse(res, 201, true, "Medicine added successfully", medicine);
});

/**
 * @description Update medicine details
 * @route PUT /api/medicines/:id
 * @access Authenticated
 */
export const updateMedicine = TryCatch(async (req: AuthenticatedRequest, res: Response) => {
    const { id } = req.params;
    const { medicineName, status, quantity, inventoryKey, expirationDate, inventoryId } = req.body;

    const existingMedicine = await Medicine.findById(id);
    if (!existingMedicine) {
        return sendResponse(res, 404, false, "Medicine not found");
    }

    const updateData: Partial<IMedicine> = {};

    if (medicineName !== undefined) updateData.medicineName = medicineName;
    if (status !== undefined) {
        if (!['in stock', 'low', 'out'].includes(status)) {
            return sendResponse(res, 400, false, "Invalid status value");
        }
        updateData.status = status;
    }
    if (quantity !== undefined) {
        if (isNaN(quantity) || quantity < 0) {
            return sendResponse(res, 400, false, "Quantity must be a positive number");
        }
        updateData.quantity = quantity;
    }
    if (inventoryKey !== undefined) updateData.inventoryKey = inventoryKey;
    if (expirationDate !== undefined) updateData.expirationDate = new Date(expirationDate);
    if (inventoryId !== undefined) {
        const inventoryExists = await Inventory.exists({ _id: inventoryId });
        if (!inventoryExists) {
            return sendResponse(res, 404, false, "Inventory not found");
        }
        updateData.inventoryId = new Types.ObjectId(inventoryId);
    }

    if (Object.keys(updateData).length === 0) {
        return sendResponse(res, 400, false, "No valid fields provided for update");
    }

    const updatedMedicine = await Medicine.findByIdAndUpdate(
        id,
        updateData,
        { new: true, runValidators: true }
    ).populate('inventoryId', 'inventoryKey');

    return sendResponse(res, 200, true, "Medicine updated successfully", updatedMedicine);
});

/**
 * @description Delete a medicine
 * @route DELETE /api/medicines/:id
 * @access Authenticated
 */
export const deleteMedicine = TryCatch(async (req: AuthenticatedRequest, res: Response) => {
    const { id } = req.params;

    if (!id) {
        return sendResponse(res, 400, false, "Medicine ID is required");
    }

    const medicine = await Medicine.findByIdAndDelete(id);
    if (!medicine) {
        return sendResponse(res, 404, false, "Medicine not found");
    }

    return sendResponse(res, 200, true, "Medicine deleted successfully", medicine);
});

/**
 * @description Get inventory data by user
 * @route GET /api/inventory
 * @access Authenticated
 */
export const getInventoryData = TryCatch(async (req: AuthenticatedRequest, res: Response) => {
    const inventoryId = (req.user as any).inventoryId;
    if (!inventoryId) {
        return sendResponse(res, 400, false, "User does not have an associated inventory ID");
    }
    const inventory = await Inventory.findById(inventoryId)
        .populate('medicines', 'medicineName quantity status expirationDate');

    if (!inventory) {
        return sendResponse(res, 404, false, "Inventory not found");
    }

    return sendResponse(res, 200, true, "Inventory retrieved successfully", inventory);
});

/**
 * @description Get all inventories (optionally with medicines)
 * @route GET /api/inventories
 * @access Public or Authenticated based on your setup
 */
export const getAllInventories = TryCatch(async (req: Request, res: Response) => {
    try {
        const inventories = await Inventory.find()
            .sort({ createdAt: -1 });

        return sendResponse(res, 200, true, "Inventories retrieved successfully", inventories);
    } catch (error) {
        console.error("Error fetching inventories:", error);
        return sendResponse(res, 500, false, "Server Error: Unable to fetch inventories");
    }
});
