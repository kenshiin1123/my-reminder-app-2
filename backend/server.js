import express from "express";
import dotenv from "dotenv";

import connectDB from "./config/db.config.js";
dotenv.config();
const app = express();
const PORT = process.env.PORT || 3000;

// Routes
import authRoutes from "./routes/auth.routes.js"; // Authentication Route

app.use(express.json());

app.get("/", (req, res) => {
  res.json({ message: "Reminder App 2" });
});

app.use("/api/auth", authRoutes);

app.listen(PORT, () => {
  console.log("Listening to port", PORT);
  connectDB();
});
