import Reminder from "./Reminder";
import { AnimatePresence } from "framer-motion";
import useReminder from "../../store/useReminder";
export default function Reminders() {
  const { reminders } = useReminder();

  return (
    <AnimatePresence>
      {reminders &&
        reminders.map((reminder) => {
          return <Reminder key={reminder.id} {...reminder} />;
        })}
      {reminders.length < 1 && <h1>No Reminders found!</h1>}
    </AnimatePresence>
  );
}
