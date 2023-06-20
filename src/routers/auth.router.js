import { Router } from "express";
import {
  getUserById,
  signIn,
  signUp,
  updateUserById,
} from "../controllers/auth.controller.js";
import {
  registerValidators,
  loginValidators,
  validate,
} from "../validators/auth.validator.js";
import { hasAccess, protectedRoute } from "../middleware/checkAccess.js";

const router = new Router();
router.post("/sign-in", loginValidators, validate, signIn);
router.post("/sign-up", registerValidators, validate, signUp);
router.get("/get-user/:userId", getUserById);
router.put("/user/:userId", protectedRoute, hasAccess, updateUserById);

export default router;
