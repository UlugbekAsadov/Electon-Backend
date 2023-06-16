import { model, Schema } from "mongoose";

const userModel = new Schema({
  firstName: { type: String, required: true },
  lastName: { type: String, required: true },
  password: { type: String, required: true },
  age: { type: Number, required: true },
  status: { type: String, required: true },
  role: { type: String, required: true },
  phoneNumber: { type: Number, required: true, unique: true },
});

export default model("users", userModel);
