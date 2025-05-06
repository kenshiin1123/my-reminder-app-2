import { createPortal } from "react-dom";
import useReminder from "../../store/useReminder";
import { useEffect } from "react";
import { format } from "date-fns";
import Background from "./Background";
import TimeOutedReminders from "./TimeOutedReminders";
import notifySFXFile from "../../assets/sound/notify.wav";

export default function AlarmModal() {
  const {
    showAlarm,
    turnOnAlarm,
    reminders,
    timeOutedReminder,
    addTimeOutedReminder,
  } = useReminder();

  useEffect(() => {
    const interval = setInterval(() => {
      const now = format(new Date(), "yyyy-MM-dd'T'HH:mm:ss");
      reminders.forEach((reminder) => {
        const modifiedDateTime = `${reminder.datetime}:00`; // this adds a seconds

        // the next code block runs if:
        // #1 the current reminder datetime matches.
        // #2 the current reminder is not checked.
        // #3 the current time and the alarm is not showed.

        // it will:
        // #1 Add a reminder to the list of "No time left" reminders.
        // #2 Turn on the alarm.
        if (modifiedDateTime === now && !reminder.isActive && !showAlarm) {
          addTimeOutedReminder(reminder);
          const notifySFX = new Audio(notifySFXFile);
          notifySFX.play();
          turnOnAlarm();
        }
      });
    }, 1000);

    return () => {
      clearInterval(interval);
    };
  }, [
    reminders,
    showAlarm,
    turnOnAlarm,
    timeOutedReminder,
    addTimeOutedReminder,
  ]);

  return createPortal(
    <Background showAlarm={showAlarm}>
      <TimeOutedReminders />
    </Background>,
    document.getElementById("modal")
  );
}
