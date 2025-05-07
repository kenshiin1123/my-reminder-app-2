import { toast } from "sonner";
import { create } from "zustand";
import {
  getReminders,
  createReminder,
  toggleReminder,
  deleteReminder,
  updateReminder,
} from "../utils/reminder";

const useReminder = create((set, get) => ({
  showUpdateModal: false,
  showAlarm: false,
  reminders: getReminders(),
  timeOutedReminder: [],
  selectedReminder: {
    title: "",
    description: "",
    datetime: "",
    isActive: false,
    id: "",
  },
  addTimeOutedReminder: (timeOutedReminder) => {
    set((state) => ({
      timeOutedReminder: [timeOutedReminder, ...state.timeOutedReminder],
    }));
  },
  removeTimeOutedReminder: (id) => {
    get().toggleReminderCheckbox(id);
    set((state) => ({
      timeOutedReminder: state.timeOutedReminder.filter(
        (reminder) => reminder.id !== id
      ),
    }));
    if (get().timeOutedReminder == 0) {
      get().turnOffAlarm();
    }
  },
  turnOnAlarm: () => {
    set(() => ({ showAlarm: true }));
  },
  turnOffAlarm: () => {
    set(() => ({ showAlarm: false }));
  },
  initializeReminders: () => {
    set(() => ({ reminders: getReminders() }));
  },
  selectReminderById: (id) => {
    set((state) => ({
      selectedReminder: state.reminders.find((reminder) => reminder.id === id),
    }));
  },
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
    if (!newReminderData) return;

    updateReminder(newReminderData); // Assumes this is some external updater (API, etc.)

    set((state) => {
      const updatedReminders = state.reminders.map((reminder) =>
        reminder.id === newReminderData.id ? newReminderData : reminder
      );

      const updatedTimeouted = state.timeOutedReminder.map((reminder) =>
        reminder.id === newReminderData.id ? newReminderData : reminder
      );

      return {
        reminders: updatedReminders,
        timeOutedReminder: updatedTimeouted,
      };
    });

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
