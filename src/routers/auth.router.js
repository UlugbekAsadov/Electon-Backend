import { Router } from "express";
import { signIn, signUp } from "../controllers/auth.controller.js";
import {
  registerValidators,
  loginValidators,
  validate,
} from "../validators/auth.validator.js";

const authRouter = new Router();

authRouter.post("/sign-in", loginValidators, validate, signIn);
authRouter.post("/sign-up", registerValidators, validate, signUp);

export { authRouter };
