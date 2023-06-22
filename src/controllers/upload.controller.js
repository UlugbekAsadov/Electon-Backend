import { asyncHandler } from "../utils/asyncHandler.js";

// upload API
export const uploadImage = asyncHandler(async (req, res) => {
  res.status(200).json({ image: `${process.env.ORIGIN_URL}/uploads/${req.file.filename}` });
});
