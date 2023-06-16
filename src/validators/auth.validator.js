import { body, validationResult } from "express-validator";
import usersdb from "../models/user.model.js";
import { ERROR_MESSAGES } from "../utils/enums/error-messages.js";
import {
  isLength,
  isNumber,
  isString,
  notEmpty,
  validatePassword,
} from "../utils/validator/index.js";

const checkNumberRegistrated = async (_, { req }) => {
  const user = await usersdb.findOne({
    phoneNumber: req.body.phoneNumber,
  });

  if (user) {
    throw new Error(ERROR_MESSAGES.NUMBER_ALREADY_REGISTRATED);
  }

  return true;
};

const notEmpArr = [
  "firstName",
  "lastName",
  "password",
  "age",
  "phoneNumber",
].map((item) => (item = notEmpty(item)));

const isStrArr = ["firstName", "lastName"].map(
  (item) => (item = isString(item))
);
const isNumArr = ["age", "phoneNumber"].map((item) => (item = isNumber(item)));
const islenGthArr = ["password"].map((item) => (item = isLength(item, 8)));
const isNumberArr = ["phoneNumber"].map((item) => isLength(item, 12));
const isPasswordArr = ["password"].map((item) => validatePassword(item));

export const registerValidators = [
  notEmpArr,
  isStrArr,
  isNumArr,
  islenGthArr,
  isNumberArr,
  isPasswordArr,
  body("phoneNumber").custom(checkNumberRegistrated),
].flat();

export const loginValidators = [
  ["phoneNumber", "password"].map((item) => (item = notEmpty(item))),
].flat();

export const validate = (req, res, next) => {
  const errors = validationResult(req);

  if (!errors.isEmpty()) {
    return res.status(400).json({ errors: errors.array() });
  }

  next();
};
