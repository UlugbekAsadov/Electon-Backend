// firstName: string
// lastName: string
// age: number
// status: BLOCKED | ACTIVE
// role: string => ADMIN, MODERATOR, USER
// phoneNumber: string


import { model, Schema } from "mongoose";

const user = new Schema({
    firstName:{type:String,required:true},
    lastName:{type:String,required:true},
    password:{type:String,required:true},
    age:{type:Number,required:true},
    status:{type:String,required:true},
    role:{type:String,required:true},
    phoneNumber:{type:String,required:true},
})


export default model("users", user);

