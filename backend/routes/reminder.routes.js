import express from "express";
import { verifyAccessToken } from "../controller/auth.controller.js";
const router = express.Router();

import {
  getReminders,
  addReminder,
  updateReminder,
  deleteReminder,
} from "../controller/reminder.controller.js";

router.use(verifyAccessToken);

router
  .route("")
  .get(getReminders)
  .post(addReminder)
  .put(updateReminder)
  .delete(deleteReminder);

export default router;
