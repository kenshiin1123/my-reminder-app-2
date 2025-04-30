import { useContext } from "react";
import ReminderContext from "../ReminderContext";
import useReminder from "../../../store/useReminder";
export default function Checkbox() {
  const { isActive, id } = useContext(ReminderContext);
  const { toggleReminderCheckbox } = useReminder();
  return (
    <input
      type="checkbox"
      className="size-5 cursor-pointer"
      onChange={() => toggleReminderCheckbox(id)}
      checked={isActive}
    />
  );
}
