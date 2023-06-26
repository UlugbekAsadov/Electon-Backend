import {
  isLength,
  isNumber,
  isString,
  notEmpty,
} from "../utils/validator/index.js";

export const phoneNumbervalidator = [
  notEmpty("phoneNumber"),
  isNumber("phoneNumber"),
  isLength("phoneNumber", 12),
];

export const pincodevalidator = [
  notEmpty("pincode"),
  isLength("pincode", 5),
  isNumber("pincode"),
];
