import Reminders from "./Reminders";
import RemindersContainer from "./RemindersContainer";
import EditReminderModal from "../EditReminderModal";
export default function Reminder() {
  return (
    <RemindersContainer>
      <Reminders />
      <EditReminderModal />
    </RemindersContainer>
  );
}
