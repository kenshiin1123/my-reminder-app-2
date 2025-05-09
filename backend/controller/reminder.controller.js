import User from "../models/user.model.js";
import Reminder from "../models/reminder.model.js";

const getReminders = async (req, res) => {
  try {
    const { id } = req.body;

    if (!id) {
      return res.status(400).json({
        message: "User ID is required in the request body.",
        success: false,
      });
    }

    const user = await User.findById(id);

    if (!user) {
      return res.status(404).json({
        message: "User not found.",
        success: false,
      });
    }

    const reminders = await Reminder.find({
      _id: { $in: user.reminders || [] },
    });

    return res.status(200).json({
      message: `Retrieved ${reminders.length} reminder(s) successfully.`,
      success: true,
      data: reminders,
    });
  } catch (err) {
    console.error("Error fetching reminders:", err);
    return res.status(500).json({
      message: "Server error while retrieving reminders.",
      success: false,
    });
  }
};

const addReminder = async (req, res) => {
  try {
    const { id, reminder } = req.body;

    if (!id || !reminder) {
      return res.status(400).json({
        message: "User ID and reminder data are required.",
        success: false,
      });
    }

    const user = await User.findById(id);
    if (!user) {
      return res.status(404).json({
        message: "User not found. Cannot create reminder.",
        success: false,
      });
    }

    const { title, description, datetime } = reminder;
    if (!title || !datetime) {
      return res.status(400).json({
        message: "Reminder must include both title and datetime.",
        success: false,
      });
    }

    const newReminder = await Reminder.create({ title, description, datetime });

    user.reminders.push(newReminder._id);
    await user.save();

    return res.status(201).json({
      message: "Reminder successfully created and added to user.",
      success: true,
      data: newReminder,
    });
  } catch (err) {
    console.error("Error adding reminder:", err);
    return res.status(500).json({
      message: "Server error while adding a reminder.",
      success: false,
    });
  }
};

const updateReminder = async (req, res) => {
  try {
    const { id, reminder } = req.body;
    if (!id || !reminder) {
      return res
        .status(400)
        .json({ message: "User ID and new reminder data are required." });
    }

    const { title, description, datetime, _id, isActive } = reminder;

    if (!title || !description || !datetime || !_id || isActive === undefined) {
      return res.status(400).json({
        message:
          "Title, description, datetime, _id, and isActive in the updated reminder are required.",
      });
    }

    const updatedReminder = await Reminder.findByIdAndUpdate(
      reminder._id,
      { title, description, datetime, isActive },
      { new: true }
    );

    // Find User
    const user = await User.findById(id);

    if (!user) {
      return res.status(400).json({ message: "User not found." });
    }

    user.reminders = user.reminders.map((reminder) => {
      if (reminder._id.toString() === updatedReminder._id.toString()) {
        return updatedReminder;
      } else {
        return reminder;
      }
    });

    await user.save();

    return res.status(200).json({ message: "Successfully updated reminder." });
  } catch (err) {
    console.error("Server error while updating a reminder:", err);
    return res.status(500).json({ message: "Internal server error" });
  }
};

const deleteReminder = async (req, res) => {
  try {
    const { userId, reminderId } = req.body;

    if (!userId || !reminderId) {
      return res.status(400).json({
        message: "User ID and reminder ID are required.",
      });
    }

    const deletedReminder = await Reminder.findByIdAndDelete(reminderId);

    if (!deletedReminder) {
      return res.status(404).json({ message: "Reminder not found." });
    }

    const user = await User.findById(userId);

    if (!user) {
      return res.status(404).json({ message: "User not found." });
    }

    user.reminders = user.reminders.filter(
      (reminder) => reminder._id.toString() !== reminderId.toString()
    );

    await user.save();

    return res.status(200).json({ message: "Successfully deleted reminder." });
  } catch (err) {
    console.error("Server error while deleting a reminder:", err);
    return res.status(500).json({ message: "Internal server error" });
  }
};

export { getReminders, addReminder, updateReminder, deleteReminder };
