import { Router } from "express";
import { signIn, signUp } from "../controllers/auth.controller.js";
import {
  registerValidators,
  loginValidators,
  validate,
} from "../validators/auth.validator.js";

const router = new Router();
router.post("/sign-in", loginValidators, validate, signIn);
router.post("/sign-up", registerValidators, validate, signUp);

export default router;
