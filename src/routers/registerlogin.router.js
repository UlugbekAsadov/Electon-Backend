import { Router } from "express";
const router = new Router();
import RegisterLogin from "../controllers/registerlogin.cantroller.js";
import { registerValidators, loginValidators, validate } from "../validators/registerlogin.validator.js";

router.get("/sign-up", RegisterLogin.signuppage)
router.get("/sign-in", RegisterLogin.signinpage)

router.post("/sign-in",loginValidators, validate, RegisterLogin.signin);
router.post("/sign-up", registerValidators, validate, RegisterLogin.signup)


export default router
