import { model, Schema } from "mongoose";
import  jwt from "jsonwebtoken";
import { ACCESS_TOKEN } from "../config/key.js"

const userModel = new Schema({
  firstName: { type: String, required: true },
  lastName: { type: String, required: true },
  password: { type: String, required: true },
  age: { type: Number, required: true },
  status: { type: String, required: true },
  role: { type: String, required: true },
  phoneNumber: { type: Number, required: true, unique: true },
});

function generateAuthToken(){
  const tokenkey = ACCESS_TOKEN
  const token = jwt.sign({_id: this._id},tokenkey)
  return token
}

userModel.methods.generateAuthToken = generateAuthToken;

export default model("users", userModel);


