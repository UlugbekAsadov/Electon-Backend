import { Router } from "express";
import RegisterLogin from "../controllers/auth.controller.js";
import {
  registerValidators,
  loginValidators,
  validate,
} from "../validators/auth.validator.js";

const router = new Router();

router.post("/sign-in", loginValidators, validate, RegisterLogin.signIn);
router.post("/sign-up", registerValidators, validate, RegisterLogin.signUp);

export default router;
