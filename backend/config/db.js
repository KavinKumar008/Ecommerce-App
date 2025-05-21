import mongoose from "mongoose";
import dotenv from "dotenv";

dotenv.config();

const connectDb = async () => {
  try {
    await mongoose.connect(process.env.MONGODB_URI);

    console.log("Db connected");
  } catch (error) {
    console.log(`DB connection failed : ${error}`);
  }
};

export default connectDb;
