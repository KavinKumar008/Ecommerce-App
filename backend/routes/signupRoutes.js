// import express from "express";
// import { SignUp } from "../models/User.js";

// const router = express.Router();

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

//     // const existingUser = await SignUp.findOne({
//     //   $or: [{ email: newUser.email }, { mobile: newUser.mobile }],
//     // });

//     const orConditions = [];
//     if (newUser.email) orConditions.push({ email: newUser.email });
//     if (newUser.mobile) orConditions.push({ mobile: newUser.mobile });

//     const existingUser = await SignUp.findOne({ $or: orConditions });

//     if (existingUser) {
//       return res.status(409).json({ error: "user already exist" });
//     }

//     const userData = await SignUp.create(newUser);
//     console.log(userData);

//     res.status(200).json({ message: "User registered", data: newUser });
//   } catch (error) {
//     console.log("signupdetails are not saved");
//     res.status(401).json({ "Error Saving the userdetails": error });
//   }
// });

// export default router;
