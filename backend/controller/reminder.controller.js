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
