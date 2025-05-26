import express, { Router } from "express";
import { User } from "../models/User.js";
import { OAuth2Client } from "google-auth-library";
// import { SignUp } from "../models/User.js";

const router = express.Router();
const client = new OAuth2Client(process.env.GOOGLE_CLIENT_ID);

router.post("/auth/google", async (req, res) => {
  const { credential } = req.body;
  console.log(credential, "credential");

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

    res.status(200).json({ user, userId: user._id });
  } catch (error) {
    console.log("verification oauth failed");
    res.status(401).json({ error: "Invalid token" });
  }
});

// router.post("/signup-Details", async (req, res) => {
//   try {
//     const { userInput, userPass } = req.body;
//     console.log(userInput, userPass);

//     const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
//     const mobileRegex = /^[6-9]\d{9}$/;

//     let newUser = {};

//     if (emailRegex.test(userInput)) {
//       newUser.email = userInput;
//     } else if (mobileRegex.test(userInput)) {
//       newUser.mobile = userInput;
//     } else {
//       return res.status(400).json({ error: "invaile email or mobile" });
//     }
//     newUser.password = userPass;

//     const existingUser = await SignUp.findOne({
//       $or: [{ email: newUser.email }, { mobile: newUser.mobile }],
//     });

//     if (existingUser) {
//       return res.status(409).json({ error: "user already exist" });
//     }

//     const userData = await SignUp.create({ newUser });
//     console.log(userData);

//     res.status(200).json({ message: "User registered", data: newUser });
//   } catch (error) {
//     console.log("signupdetails are not saved");
//     res.status(401).json({ "Error Saving the userdetails": error });
//   }
// });
export default router;
