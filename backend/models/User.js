import { parse } from "dotenv";
import mongoose, { Mongoose } from "mongoose";

const userSchema = new mongoose.Schema({
  name: String,
  email: String,
  picture: String,
  createdAt: {
    type: Date,
    default: Date.now,
  },
});

const signupSchema = new mongoose.Schema({
  email: {
    type: String,
    unique: true,
    sparse: true,
  },
  mobile: {
    type: String,
    unique: true,
    sparse: true,
  },
  password: String,
  createdAt: {
    type: Date,
    default: Date.now,
  },
});

export const User = mongoose.model("User", userSchema);
export const SignUp = mongoose.model("SignUp", signupSchema);
