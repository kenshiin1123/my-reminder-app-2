import { Schema, model } from "mongoose";

const reminderSchema = new Schema({
  title: {
    type: String,
    required: true,
    trim: true,
  },
  description: {
    type: String,
    trim: true,
  },
  datetime: {
    type: String,
    required: true,
    trim: true,
  },
});

export default model("Reminder", reminderSchema);
