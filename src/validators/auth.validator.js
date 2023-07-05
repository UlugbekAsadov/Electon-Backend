import { body, validationResult } from "express-validator";
import emailCheck from "email-check";
import usersdb from "../models/user.model.js";
import { ERROR_MESSAGES } from "../utils/enums/error-messages.js";
import {
  isLength,
  isNumber,
  isString,
  notEmpty,
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
  "email",
  "firstName",
  "lastName",
  "password",
  "phoneNumber",
].map((item) => (item = notEmpty(item)));

const isStrArr = ["firstName", "lastName"].map(
  (item) => (item = isString(item))
);

const isNumArr = ["phoneNumber"].map((item) => (item = isNumber(item)));
const islenGthArr = ["password"].map((item) => (item = isLength(item, 8)));
const isNumberArr = ["phoneNumber"].map((item) => isLength(item, 12));

export const registerValidators = [
  body("phoneNumber").custom(checkNumberRegistrated),
  body("email")
    .isEmail()
    .withMessage("Email is not valid")
    .custom(async (value) => {
      await emailCheck(value)
        .then(function (res) {
          if (res) {
            return true;
          } else {
            return false;
          }
        })
        .catch(function (err) {
          throw new Error("error:" + err.message);
        });
    })
    .withMessage(ERROR_MESSAGES.GMAIL_DOES_NOT_EXIST),
  notEmpArr,
  isStrArr,
  isNumArr,
  islenGthArr,
  isNumberArr,
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
