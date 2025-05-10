import Reminder from "./Reminder";
import { AnimatePresence } from "framer-motion";
import useReminder from "../../store/useReminder";
import NoRemindersFoundDisplay from "./NoRemindersFoundDisplay.jsx";
import Loading from "./Loading.jsx";
import { useEffect } from "react";
export default function Reminders() {
  const { reminders, verifyIsloggedIn, fetchReminders, loading, isLoggedIn } =
    useReminder();

  useEffect(() => {
    const init = async () => {
      verifyIsloggedIn();
    };
    init();
  }, [verifyIsloggedIn, fetchReminders]);

  return (
    <AnimatePresence>
      {loading && <Loading key={"Loading_JSX"} loadingKey={loading} />}
      {!loading &&
        reminders &&
        reminders.map((reminder) => {
          return (
            <Reminder
              key={isLoggedIn ? reminder.id : reminder.id}
              {...reminder}
            />
          );
        })}
      {reminders.length < 1 && <NoRemindersFoundDisplay />}
    </AnimatePresence>
  );
}
