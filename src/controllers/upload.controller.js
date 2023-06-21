import { asyncHandler } from "../utils/asyncHandler.js";
import { checkFileExists } from "../utils/upload.file.js";
import userModel from "../models/user.model.js";
import { unlinkSync } from "fs";
import { join } from "path";
// upload API
export const uploadImage = asyncHandler(async (req, res) => {
  res.status(200).json({ image: req.file.originalname });
});

export const updateImage = asyncHandler(async (req, res) => {
  const image = "image-1687296896372.png"; //test uchun file neme

  //eski file ni address
  const address = join(req.file.path, "../", image);

  // eski file bor yoki yo'q ligini tekshiradi
  const fileExists = checkFileExists(address);

  //eski file bor bor bo'lsa va yangi file yuklangan bo'lsa eski file ni o'chiradi
  if (req.file && fileExists) unlinkSync(address);

  res.status(200).json({ image: req.file.originalname });
});
