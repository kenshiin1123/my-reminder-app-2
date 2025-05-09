import express from "express";
const router = express.Router();

import {
  getReminders,
  addReminder,
  updateReminder,
  deleteReminder,
} from "../controller/reminder.controller.js";

router
  .route("")
  .post(getReminders)
  .addReminder(addReminder)
  .put(updateReminder)
  .delete(deleteReminder);

export default router;
