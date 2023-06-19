import { Router } from "express";
import { tryCatch } from "../utils/tryCatch.js";
import { signIn, signUp } from "../controllers/auth.controller.js";
import {
  registerValidators,
  loginValidators,
  validate,
} from "../validators/auth.validator.js";

const router = new Router();
router.post("/sign-in", loginValidators, validate, tryCatch(signIn));
router.post("/sign-up", registerValidators, validate, tryCatch(signUp));

export default router;
