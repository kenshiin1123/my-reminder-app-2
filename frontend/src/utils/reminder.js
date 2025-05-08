import formUtil from "./formUtil";
import { v4 } from "uuid";

const setReminder = (updatedReminders) =>
  localStorage.setItem("reminders", JSON.stringify(updatedReminders));

const getReminders = () => {
  // If logged in, get reminders from database
  const data = JSON.parse(localStorage.getItem("reminders")) || [];
  // console.log(data);
  return data;
};

const createReminder = (e) => {
  let newReminder = formUtil(e);
  const newID = v4();
  newReminder = {
    title: newReminder.title,
    description: newReminder.description || "",
    datetime: `${newReminder.date}T${newReminder.time}`,
    isActive: false,
    id: newID,
  };

  if (newReminder.title && newReminder.datetime) {
    try {
      const reminders = JSON.parse(localStorage.getItem("reminders")) || [];
      const updatedReminders = [newReminder, ...reminders];
      setReminder(updatedReminders);

      return { message: "New reminder saved!", success: true, newReminder };
    } catch (error) {
      console.error("Failed to save reminder:", error);
      return { message: "Internal System Error!", success: false };
    }
  } else {
    console.warn("Missing required reminder fields:", newReminder);
    return { message: "Failed to save a reminder!", success: false };
  }
};

const toggleReminder = (id) => {
  if (!id) return { message: "No ID found!", success: false };

  try {
    const reminders = getReminders();
    const updatedReminders = reminders.map((reminder) => {
      if (reminder.id == id) {
        return { ...reminder, isActive: !reminder.isActive };
      }
      return reminder;
    });

    setReminder(updatedReminders);

    return { message: "Toggled Checkbox!", success: true };
  } catch (error) {
    console.error("Error while clicking the checkbox", error);
    return { message: "Error while clicking the checkbox!", success: false };
  }
};

const updateReminder = (updatedReminder) => {
  const updatedReminders = getReminders().map((reminder) => {
    if (updatedReminder.id === reminder.id) {
      return updatedReminder;
    }
    return reminder;
  });

  localStorage.setItem("reminders", JSON.stringify(updatedReminders));
};

const deleteReminder = (id) => {
  if (!id) return { message: "No ID found!", success: false };

  try {
    const reminders = getReminders();
    const updatedReminders = reminders.filter((reminder) => reminder.id !== id);
    setReminder(updatedReminders);
  } catch (error) {
    console.error("Error while deleting the reminder!", error);
  }
};

export {
  getReminders,
  createReminder,
  toggleReminder,
  deleteReminder,
  updateReminder,
};
