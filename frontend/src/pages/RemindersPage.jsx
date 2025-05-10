import Reminder from "../components/Reminder/index";
import useReminder from "../store/useReminder";
import { FaInfoCircle } from "react-icons/fa";
export default function RemindersPage() {
  const { isLoggedIn } = useReminder();
  return (
    <>
      {!isLoggedIn && (
        <p className="bg-green-400 text-sm text-white p-2  flex justify-center items-center gap-2">
          <FaInfoCircle /> Your reminders are saved locally.
        </p>
      )}
      <Reminder />
    </>
  );
}
