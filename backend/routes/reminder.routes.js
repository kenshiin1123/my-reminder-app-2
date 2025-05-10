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
  .get(getReminders)
  .post(addReminder)
  .put(updateReminder)
  .delete(deleteReminder);

export default router;
