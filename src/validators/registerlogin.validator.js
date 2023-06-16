import { body, validationResult } from 'express-validator';
import usersdb from "../models/userdb.js"
function notEmp(inputname){
        return body(inputname).notEmpty().withMessage(inputname + ' must not be empty')
}
function isStr(inputname){
    return body(inputname).isString().withMessage(inputname + ' must be a string')
}
function islenGth(inputname){
    return body(inputname)
    .isLength({min:8}).withMessage(inputname + " must be min:8 character")
    .matches(/^(?=.*[a-zA-Z])(?=.*[0-9])/).withMessage(inputname + ' must contain both letters and numbers')
}
function isNum(inputname){
    return body(inputname).isNumeric().withMessage(inputname + ' must be a number')
}

const isNameUnique = async (value, { req }) => {
    const user = await usersdb.findOne({ firstName: req.body.firstName, lastName: req.body.lastName });
    if (user) {
      throw new Error('Email already in use');
    }
    return true;
  };

const notEmpArr = ["firstName", "lastName", "password", "age", "status", "role", "phoneNumber"]
   .map(item => item = notEmp(item))
const isStrArr = ["firstName", "lastName","status", "role",]
    .map(item => item = isStr(item))
const isNumArr = ["age","phoneNumber"]
    .map(item => item = isNum(item))
const islenGthArr = ["password"]
    .map(item => item = islenGth(item))

   export const registerValidators = [notEmpArr, isStrArr,isNumArr,islenGthArr, body('lastName').custom(isNameUnique),].flat();
   

export const loginValidators = [ ["firstName", "lastName", "password",].map(item => item = notEmp(item))].flat();
  
  export const validate = (req, res, next) => {
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
      return res.status(400).json({ errors: errors.array() });
    }
    next();
  };