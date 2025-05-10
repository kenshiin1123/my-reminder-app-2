import express from "express";
const router = express.Router();

// Controller
import {
  register,
  login,
  refresh,
  logoutUser,
} from "../controller/auth.controller.js";

router.post("/register", register);
router.post("/login", login);
router.post("/refresh", refresh);
router.post("/logout", logoutUser);

export default router;
