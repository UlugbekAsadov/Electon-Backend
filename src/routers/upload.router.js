import { Router } from "express";
import { uploadImage } from "../controllers/upload.controller.js";
import { upload } from "../utils/upload.file.js";

import { protectedRoute } from "../middleware/checkAccess.js";
const router = new Router();

router.post("/image-upload", upload.single("img"), protectedRoute, uploadImage);

export default router;
