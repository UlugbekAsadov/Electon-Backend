import { body, validationResult } from 'express-validator';

function notEmp(inputname){
        return body(inputname).notEmpty().withMessage(inputname + ' must not be empty')
}
function isStr(inputname){
    return body(inputname).isString().withMessage(inputname + ' must be a string')
}
function islenGth(inputname){
    return body(inputname).isLength({min:8}).withMessage(inputname + " must be min:8 character")
}
function isNum(inputname){
    return body(inputname).isNumeric().withMessage(inputname + ' must be a number')
}

const notEmpArr = ["firstName", "lastName", "password", "age", "status", "role", "phoneNumber"]
   .map(item => item = notEmp(item))
const isStrArr = ["firstName", "lastName","status", "role",]
    .map(item => item = isStr(item))
const isNumArr = ["age","phoneNumber"]
    .map(item => item = isNum(item))
const islenGthArr = ["password"]
    .map(item => item = islenGth(item))
   export const registerValidators = [notEmpArr, isStrArr,isNumArr,islenGthArr].flat();
   

export const loginValidators = [ ["firstName", "lastName", "password",].map(item => item = notEmp(item))].flat();
  
  export const validate = (req, res, next) => {
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
      return res.status(400).json({ errors: errors.array() });
    }
    next();
  };