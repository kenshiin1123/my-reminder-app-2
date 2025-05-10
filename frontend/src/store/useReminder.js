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
import {
  addReminder,
  getUserReminders,
  updateReminder as updateOnlineReminder,
  deleteReminder as deleteOnlineReminder,
} from "../api/reminder.api";
import formUtil from "../utils/formUtil";
import { v4 } from "uuid";

const useReminder = create((set, get) => ({
  loading: false,
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
    let data = [];

    if (get().isLoggedIn) {
      const { data: onlineReminder } = await getUserReminders(); // get reminders from database
      data = onlineReminder;
    } else {
      data = await getReminders(); // get reminders from localStorage
    }
    set({ reminders: data });
  },
  verifyIsloggedIn: async () => {
    set({ loading: true });

    const data = await getUserData();
    const isLoggedIn = data.success || false;

    set(() => ({ isLoggedIn }));

    await get().fetchReminders();
    set({ loading: false });
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
    set((state) => {
      const key = state.isLoggedIn ? "_id" : "id";
      const selectedReminder = state.reminders.find(
        (reminder) => reminder[key] === id
      );
      return { selectedReminder };
    });
  },

  toggleUpdateModal: () => {
    // Toggle the update reminder modal, on or off.
    set((state) => ({
      showUpdateModal: !state.showUpdateModal,
    }));
  },
  createReminder: (event) => {
    let newReminder = formUtil(event);
    const newID = v4();

    if (get().isLoggedIn) {
      newReminder = {
        title: newReminder.title,
        description: newReminder.description || "",
        datetime: `${newReminder.date}T${newReminder.time}`,
        isActive: false,
        _id: newID,
      };
    } else {
      newReminder = {
        title: newReminder.title,
        description: newReminder.description || "",
        datetime: `${newReminder.date}T${newReminder.time}`,
        isActive: false,
        id: newID,
      };
    }

    if (!newReminder.title || !newReminder.datetime) {
      toast.error("Please input the required fields!");
      return { success: false };
    }

    if (get().isLoggedIn) {
      // Save reminders in database
      const saveInDatabase = async () => {
        await addReminder(newReminder);
      };
      saveInDatabase();
    } else {
      // Save reminders locally
      createReminder(newReminder);
    }
    // console.log("New reminder created!", newReminder);
    set((state) => ({ reminders: [newReminder, ...state.reminders] }));
    toast.success("Reminder has been created");
    return { success: true };
  },
  updateReminder: (newReminderData) => {
    if (!newReminderData) return;

    if (get().isLoggedIn) {
      const asyncUpdateReminder = async () => {
        await updateOnlineReminder(newReminderData);
      };
      // For database update
      asyncUpdateReminder();
    } else {
      // For localStorage update
      updateReminder(newReminderData);
    }

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
    if (get().isLoggedIn) {
      const deleteAsync = async () => {
        // console.log(reminderID);
        await deleteOnlineReminder(reminderID);
      };
      deleteAsync();

      set((state) => ({
        reminders: state.reminders.filter(
          (reminder) => reminder._id !== reminderID
        ),
      }));
    } else {
      deleteReminder(reminderID);

      set((state) => ({
        reminders: state.reminders.filter(
          (reminder) => reminder.id !== reminderID
        ),
      }));
    }

    toast.success("Reminder successfully deleted.");
  },
  toggleReminderCheckbox: (id) => {
    if (get().isLoggedIn) {
      const reminder = get().reminders.find((reminder) => reminder._id === id);
      if (!reminder) return;

      const newReminder = { ...reminder, isActive: !reminder.isActive };

      (async () => {
        try {
          await updateOnlineReminder(newReminder);
        } catch (error) {
          console.error("Failed to update reminder:", error);
        }
      })();

      set((state) => ({
        reminders: state.reminders.map((reminder) => {
          if (reminder._id === id) {
            return { ...reminder, isActive: !reminder.isActive };
          } else {
            return reminder;
          }
        }),
      }));
    } else {
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
    }
  },
}));

export default useReminder;
