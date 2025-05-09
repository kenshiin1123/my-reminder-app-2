import { toast } from "sonner";
import { create } from "zustand";
import {
  getReminders,
  createReminder,
  toggleReminder,
  deleteReminder,
  updateReminder,
} from "../utils/reminder";

import { getUserData } from "../api/user.api";

const useReminder = create((set, get) => ({
  isLoggedIn: false,
  showUpdateModal: false,
  showAlarm: false,
  reminders: [],
  timeOutedReminder: [],
  selectedReminder: {
    title: "",
    description: "",
    datetime: "",
    isActive: false,
    id: "",
  },
  fetchReminders: async () => {
    const { isLoggedIn } = get();
    console.log(isLoggedIn);
    if (!isLoggedIn) {
      // Assuming getReminders() is a fallback function (like from localStorage)
      const localReminders = getReminders?.() || [];
      set({ reminders: localReminders });
      return;
    }

    try {
      const { data } = await getUserData();
      console.log(data);
      set({ reminders: data || [] });
    } catch (error) {
      console.error("Failed to fetch reminders:", error);
      set({ reminders: [] }); // Optional: reset to empty
    }
  },

  verifyIsloggedIn: async () => {
    const data = await getUserData();
    set(() => ({ isLoggedIn: data.success || false })); // if there's no success available, it must be false
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
