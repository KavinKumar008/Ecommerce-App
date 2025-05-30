import express from "express";
import cors from "cors";
import dotenv from "dotenv";
import connectDb from "./config/db.js";
import routes from "./routes/itemRoutes.js";
import authRoutes from "./routes/userRoutes.js";
// import signupRoutes from "./routes/signupRoutes.js";
import cartRoutes from "./routes/cartRoutes.js";
import { fileURLToPath } from "url";
import path from "path";
import paymentRoutes from "./routes/paymentRoutes.js";

dotenv.config();

const app = express();

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

app.use("/uploads", express.static(path.join(__dirname, "uploads")));
app.use(cors());
app.use(express.json());

connectDb();
app.use("/api", routes);
app.use("/api", routes);
app.use("/api", authRoutes);
// app.use("/api", signupRoutes);
app.use("/api", cartRoutes);
app.use("/api", paymentRoutes);
const PORT = process.env.PORT || 5000;

app.listen(PORT, () => {
  console.log(`Server is running on port ${PORT}`);
});
