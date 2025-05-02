import { toast } from "sonner";
import { create } from "zustand";
import {
  getReminders,
  createReminder,
  toggleReminder,
  deleteReminder,
  updateReminder,
} from "../utils/reminder";

const useReminder = create((set) => ({
  reminders: getReminders(),
  selectedReminder: {
    title: "",
    description: "",
    datetime: "",
    isActive: false,
    id: "",
  },
  initializeReminders: () => {
    set(() => ({ reminders: getReminders() }));
  },
  selectReminderById: (id) => {
    set((state) => ({
      selectedReminder: state.reminders.find((reminder) => reminder.id === id),
    }));
  },
  showUpdateModal: false,
  toggleUpdateModal: () => {
    // Toggle the update reminder modal, on or off.
    set((state) => ({
      showUpdateModal: !state.showUpdateModal,
    }));
  },
  createReminder: (event) => {
    const data = createReminder(event);
    const { newReminder } = data;
    if (!newReminder) {
      toast.error("Please input the required fields!");
      return { success: false };
    }
    console.log("New reminder created!", newReminder);
    set((state) => ({ reminders: [newReminder, ...state.reminders] }));
    toast.success("Reminder has been created");
    return { success: true };
  },
  fetchReminders: async () => {
    const data = await getReminders();
    set({ reminders: data });
  },
  updateReminder: (newReminderData) => {
    if (!newReminderData) {
      return;
    }

    updateReminder(newReminderData);
    set((state) => ({
      reminders: state.reminders.map((reminder) =>
        reminder.id === newReminderData.id ? newReminderData : reminder
      ),
    }));

    toast.success("Reminder has been successfully updated.");
  },
  deleteReminder: (reminderID) => {
    deleteReminder(reminderID);
    set((state) => ({
      reminders: state.reminders.filter(
        (reminder) => reminder.id !== reminderID
      ),
    }));
    toast.success("Reminder successfully deleted.");
  },
  toggleReminderCheckbox: (id) => {
    toggleReminder(id);
    set((state) => ({
      reminders: state.reminders.map((reminder) => {
        if (reminder.id === id) {
          return { ...reminder, isActive: !reminder.isActive };
        } else {
          return reminder;
        }
      }),
    }));
  },
}));

export default useReminder;
