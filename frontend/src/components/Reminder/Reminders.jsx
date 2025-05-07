import Reminder from "./Reminder";
import { AnimatePresence } from "framer-motion";
import useReminder from "../../store/useReminder";
import NoRemindersFoundDisplay from "./NoRemindersFoundDisplay.jsx";
export default function Reminders() {
  const { reminders } = useReminder();

  return (
    <AnimatePresence>
      {reminders &&
        reminders.map((reminder) => {
          return <Reminder key={reminder.id} {...reminder} />;
        })}
      {reminders.length < 1 && <NoRemindersFoundDisplay />}
    </AnimatePresence>
  );
}
