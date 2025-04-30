import { useContext } from "react";
import ReminderContext from "../ReminderContext";
import useReminder from "../../../store/useReminder";
export default function Name() {
  const { title, isActive, id } = useContext(ReminderContext);
  const { toggleReminderCheckbox } = useReminder();
  return (
    <button
      className={`cursor-pointer text-white text-xl hover:scale-95 ${
        isActive && "line-through"
      }`}
      onClick={() => toggleReminderCheckbox(id)}
    >
      {title}
    </button>
  );
}
