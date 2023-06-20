import { Router } from "express";
import { getUserById, signIn, signUp } from "../controllers/auth.controller.js";
import {
  registerValidators,
  loginValidators,
  validate,
} from "../validators/auth.validator.js";

const router = new Router();
router.post("/sign-in", loginValidators, validate, signIn);
router.post("/sign-up", registerValidators, validate, signUp);
router.get("/get-user/:userId", getUserById);

export default router;
