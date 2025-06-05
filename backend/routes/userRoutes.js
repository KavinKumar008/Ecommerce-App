import express, { Router } from "express";
import { User } from "../models/User.js";
import { OAuth2Client } from "google-auth-library";
import { SignUp } from "../models/User.js";
import dotenv from "dotenv";
import jwt from "jsonwebtoken";
import bcrypt from "bcryptjs";
import { verifyToken } from "../middleware/auth.js";

dotenv.config();
const router = express.Router();
const client = new OAuth2Client(process.env.GOOGLE_CLIENT_ID);

const createToken = (userId) => {
  return jwt.sign({ userId }, process.env.JWT_SECRET, {
    expiresIn: "1d",
  });
};

router.post("/auth/google", async (req, res) => {
  const { credential } = req.body;

  console.log(credential, "credentialalalal");
  console.log("Audience:", process.env.GOOGLE_CLIENT_ID);

  try {
    const ticket = await client.verifyIdToken({
      idToken: credential,
      audience: process.env.GOOGLE_CLIENT_ID,
    });

    const payload = ticket.getPayload();
    const { email, name, picture } = payload;

    let user = await User.findOne({ email });

    if (!user) {
      user = new User({ name, email, picture, provider: "google" });
      await user.save();
    }

    const token = createToken(user._id);
    console.log("Generated token:", token);

    res.status(200).json({ token: token, user, userId: user._id });
  } catch (error) {
    console.log("verification oauth failed");
    res.status(401).json({ error: "Invalid token" });
  }
});

router.post("/signup-Details", async (req, res) => {
  try {
    const { userInput, userPass } = req.body;
    console.log(userInput, userPass);

    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    const mobileRegex = /^[6-9]\d{9}$/;

    let newUser = {};

    if (emailRegex.test(userInput)) {
      newUser.email = userInput;
    } else if (mobileRegex.test(userInput)) {
      newUser.mobile = userInput;
    } else {
      return res.status(400).json({ error: "invaile email or mobile" });
    }
    // newUser.password = userPass;
    const queryConditions = [];
    if (newUser.email) queryConditions.push({ email: newUser.email });
    if (newUser.mobile) queryConditions.push({ mobile: newUser.mobile });

    const existingUser = await SignUp.findOne({
      $or: queryConditions,
    });

    if (existingUser) {
      return res.status(409).json({ error: "user already exist" });
    }

    const hashedPassword = await bcrypt.hash(userPass, 10);
    newUser.password = hashedPassword;

    const userData = await SignUp.create(newUser);
    console.log("userData:", userData);

    console.log(userData._id, "asldjsjd");

    const token = createToken(userData._id);

    const { password, ...userWithoutPass } = userData._doc;

    console.log("Generated token:", token);
    console.log("Sending response without password:", userWithoutPass);

    res.status(200).json({
      message: "User registered",
      data: userWithoutPass,
      token: token,
    });
  } catch (error) {
    console.log("signupdetails are not saved");
    res.status(401).json({ "Error Saving the userdetails": error });
  }
});

router.get("/profile", verifyToken, async (req, res) => {
  try {
    const profileDetails = await SignUp.findById(req.userId).select(
      "-password"
    );

    if (!profileDetails) {
      return res.status(404).json({ message: "User not found" });
    }
    res
      .status(200)
      .json({ message: "Profile Information", data: profileDetails });
  } catch (error) {
    console.log("Unable to get the user information for profile", error);
    res
      .status(400)
      .json({ message: "Unable to get the user data for profile", error });
  }
});

router.get("/google-profile", verifyToken, async (req, res) => {
  try {
    const profileDetails = await User.findById(req.userId).select("-password");

    if (!profileDetails) {
      return res.status(404).json({ message: "User not found" });
    }

    res
      .status(200)
      .json({ message: "Google Profile Info", data: profileDetails });
  } catch (error) {
    console.log("Error getting google profile", error);
    res.status(400).json({ message: "Error getting google profile", error });
  }
});
export default router;
