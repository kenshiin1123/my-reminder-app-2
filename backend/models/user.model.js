import { Schema, model } from "mongoose";

const userSchema = new Schema({
  username: {
    type: String,
    trim: true,
    required: true,
  },
  email: {
    type: String,
    trim: true,
    lowercase: true,
    unique: true,
  },
  passwordHash: {
    type: String,
    required: true,
  },
  createdAt: {
    type: Date,
    default: Date.now,
  },
  refreshTokens: [
    {
      token: String,
      expiresAt: {
        type: Date,
        required: true,
      },
    },
  ],
  reminders: [{ type: Schema.Types.ObjectId, ref: "Reminder" }],
});

export default model("User", userSchema);
