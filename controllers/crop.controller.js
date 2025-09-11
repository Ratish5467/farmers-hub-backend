import { asyncHandler } from '../middleware/asyncHandler.js';
import Crop from '../models/crop.model.js';
import { sendResponse } from '../utils/apiResponse.js';

export const getCrops = asyncHandler(async (req, res) => {
  const crops = await Crop.find().sort('name');
  sendResponse(res, { data: crops });
});

export const createCrop = asyncHandler(async (req, res) => {
  const { name, variety, season, unit } = req.body;
  const existing = await Crop.findOne({ name, variety });
  if (existing) return sendResponse(res, { status: 400, success: false, message: 'Crop already exists' });
  const crop = await Crop.create({ name, variety, season, unit });
  sendResponse(res, { status: 201, data: crop, message: 'Crop created' });
});

export const updateCrop = asyncHandler(async (req, res) => {
  const crop = await Crop.findByIdAndUpdate(req.params.id, req.body, { new: true });
  sendResponse(res, { data: crop, message: 'Updated' });
});

export const deleteCrop = asyncHandler(async (req, res) => {
  await Crop.findByIdAndDelete(req.params.id);
  sendResponse(res, { message: 'Deleted' });
});
