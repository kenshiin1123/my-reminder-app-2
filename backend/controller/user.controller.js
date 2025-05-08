import User from "../models/user.model.js";
import Reminder from "../models/reminder.model.js";
import bcrypt from "bcrypt";

const getUser = async (req, res) => {
  const { id } = req.body;

  if (!id) {
    return res.status(400).json({
      message: "Cannot find user, no ID provided",
      success: false,
    });
  }

  try {
    const user = await User.findById(id).select("-passwordHash -refreshTokens");

    if (!user) {
      return res.status(404).json({
        message: "User not found",
        success: false,
      });
    }

    return res.status(200).json({
      message: "Successfully found user data",
      success: true,
      data: user,
    });
  } catch (error) {
    console.error("Error retrieving user:", error.message);
    return res.status(500).json({
      message: "Server error while retrieving user",
      success: false,
    });
  }
};

const updateUser = async (req, res) => {
  const { id, newUserData } = req.body;

  if (!id || !newUserData) {
    return res.status(400).json({
      message: "User ID and new user data are required.",
      success: false,
    });
  }

  const { username, email, password } = newUserData;

  if (!username || !email || !password) {
    return res.status(400).json({
      message: "Username, email, and password are all required.",
      success: false,
    });
  }

  try {
    const passwordHash = await bcrypt.hash(password, 10); // securely hash password

    const updatedUser = await User.findByIdAndUpdate(
      id,
      { username, email, passwordHash },
      { new: true } // return updated document
    );

    if (!updatedUser) {
      return res
        .status(404)
        .json({ message: "User not found. Update failed.", success: false });
    }

    return res
      .status(200)
      .json({ message: "User updated successfully!", success: true });
  } catch (error) {
    console.error("Error updating user:", error.message);
    return res
      .status(500)
      .json({ message: "Server error during user update.", success: false });
  }
};

const deleteUser = async (req, res) => {
  const { id } = req.body;

  if (!id) {
    return res.status(400).json({
      message: "User ID not provided. Deletion failed!",
      success: false,
    });
  }

  try {
    const user = await User.findById(id);

    if (!user) {
      return res
        .status(404)
        .json({ message: "User not found!", success: false });
    }

    // Delete associated reminders
    const deletedReminders = await Reminder.deleteMany({
      _id: { $in: user.reminders },
    });

    // Delete user
    await User.findByIdAndDelete(id);

    return res.status(200).json({
      message: `Successfully deleted user and ${deletedReminders.deletedCount} reminders.`,
      success: true,
    });
  } catch (err) {
    console.error("Error deleting user:", err);
    return res.status(500).json({
      message: "Server error. Could not delete user.",
      success: false,
    });
  }
};

export { getUser, updateUser, deleteUser };
