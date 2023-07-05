import { model, Schema } from "mongoose";
import jwt from "jsonwebtoken";

const userModel = new Schema({
  email: { type: String, required: true },
  firstName: { type: String, required: true },
  lastName: { type: String, required: true },
  password: { type: String, required: true },
  age: { type: Number, required: true },
  status: { type: String, required: true },
  role: { type: String, required: true },
  profileImage: { type: String },
  phoneNumber: { type: Number, required: true, unique: true },
});

function generateAuthToken() {
  const tokenkey = process.env.JWT_ACCESS_TOKEN;
  console.log(tokenkey);
  const token = jwt.sign(
    { _id: this._id, role: this.role, status: this.status },
    tokenkey,
    {
      expiresIn: "1d",
    }
  );
  return token;
}

userModel.methods.generateAuthToken = generateAuthToken;

export default model("users", userModel);
