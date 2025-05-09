import express from "express";
import dotenv from "dotenv";
import cors from "cors";
import connectDB from "./config/db.config.js";
import { verifyAccessToken } from "./controller/auth.controller.js";
dotenv.config();
const app = express();
const PORT = process.env.PORT || 5000;

// Routes
import authRoutes from "./routes/auth.routes.js"; // Authentication Route
import userRoutes from "./routes/user.routes.js"; // User Route
import reminderRoutes from "./routes/reminder.routes.js"; // Reminder Route

// Middlewares
app.use(
  cors({
    origin: "http://localhost:5173",
    methods: ["GET", "POST", "PUT", "DELETE"],
    credentials: true,
  })
);
app.use(express.json());

app.get("/", (req, res) => {
  res.json({ message: "Reminder App 2" });
});

app.use("/api/auth", authRoutes);
app.use("/api/users", verifyAccessToken, userRoutes);
app.use("/api/reminders", verifyAccessToken, reminderRoutes);

app.listen(PORT, () => {
  console.log("Listening to port", PORT);
  connectDB();
});
