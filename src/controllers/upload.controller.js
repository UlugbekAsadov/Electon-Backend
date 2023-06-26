import { asyncHandler } from "../utils/asyncHandler.js";

// @METHOD => POST
// @ROUTE => api/image-upload
// @ACCESS => ADMIN | MODERATOR | USER
// @DESCRIPTION => returns image url
export const uploadImage = asyncHandler(async (req, res) => {
  res.status(200).json({ image: `${process.env.ORIGIN_URL}/uploads/${req.file.filename}` });
});
