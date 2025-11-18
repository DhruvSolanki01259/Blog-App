import cookieParser from "cookie-parser";
import express from "express";
import cors from "cors";

// Routes
import authRoutes from "./routes/auth.route.js";
import userRoutes from "./routes/user.route.js";
import adminRoutes from "./routes/admin.route.js";

// Database
import { connectDB } from "./database/connectDB.js";

import "dotenv/config";

const app = express();

const PORT = process.env.PORT || 8000;

app.use(express.json());
app.use(cookieParser());
app.use(cors({ origin: `${process.env.CLIENT_URL}`, credentials: true }));

app.use("/api/auth", authRoutes);
app.use("/api/user", userRoutes);
app.use("/api/admin", adminRoutes);

// Listen the APP
app.listen(PORT, () => {
  console.log("Server is Running on PORT: ", PORT);
  connectDB();
});
