import { Router } from "express";

import {
  enterPinCode,
  getUserById,
  signIn,
  signUp,
  updateUserById,
  forgotPassword,
} from "../controllers/auth.controller.js";
import functions from "../validators/index.js";
import { hasAccess, protectedRoute } from "../middleware/checkAccess.js";
const {
  loginValidators,
  registerValidators,
  phoneNumbervalidator,
  pincodevalidator,
  validate,
} = functions;
const router = new Router();

router.post("/sign-in", loginValidators, validate, signIn);
router.post("/sign-up", registerValidators, validate, signUp);
router.post(
  "/auth/forget-password",
  phoneNumbervalidator,
  validate,
  forgotPassword
);
router.post("/auth/enter-pincode", pincodevalidator, validate, enterPinCode);

router.get("/get-user/:userId", protectedRoute, getUserById);
router.put("/user/:userId", protectedRoute, hasAccess, updateUserById);

export default router;
