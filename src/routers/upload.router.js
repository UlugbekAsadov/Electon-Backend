import { Router } from "express";
import { uploadImage, updateImage } from "../controllers/upload.controller.js";
import { upload } from "../utils/upload.file.js";
import {
  uploadImageValidator,
  validate,
} from "../validators/upload.validator.js";
const router = new Router();

router.post(
  "/uploadapi",
  upload.single("img"),
  uploadImageValidator,
  validate,
  uploadImage,
);

router.put(
  "/updateimage",
  upload.single("img"),
  uploadImageValidator,
  validate,
  updateImage,
);

export default router;
