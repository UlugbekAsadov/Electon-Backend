import { body } from "express-validator";

export function notEmpty(inputname) {
  return body(inputname)
    .notEmpty()
    .withMessage(inputname + " must not be empty");
}
export function isString(inputname) {
  return body(inputname)
    .isString()
    .withMessage(inputname + " must be a string");
}
export function isLength(inputname, min) {
  return body(inputname)
    .isLength({ min: min })
    .withMessage(inputname + " must be min:8 character");
}

export function validatePassword(inputName) {
  return body(inputName)
    .matches(/^(?=.*[a-zA-Z])(?=.*[0-9])/)
    .withMessage(inputName + " must contain both letters and numbers");
}

export function isNumber(inputname) {
  return body(inputname)
    .isNumeric()
    .withMessage(inputname + " must be a number");
}
