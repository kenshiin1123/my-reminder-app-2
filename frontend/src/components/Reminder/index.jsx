import Reminders from "./Reminders.jsx";
import RemindersContainer from "./RemindersContainer.jsx";
import EditReminderModal from "../EditReminderModal/Index.jsx";
export default function Reminder() {
  return (
    <RemindersContainer>
      <Reminders />
      <EditReminderModal />
    </RemindersContainer>
  );
}
