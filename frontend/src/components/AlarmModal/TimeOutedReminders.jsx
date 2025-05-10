import useReminder from "../../store/useReminder";
import Button from "./Button";
import Description from "./Description";
import Title from "./Title";
import Container from "./Container";

export default function TimedOutReminders() {
  const { timeOutedReminder, removeTimeOutedReminder } = useReminder();

  return timeOutedReminder.map((reminder) => (
    <Container key={reminder.id} id={reminder.id}>
      <Title text={reminder.title} />
      <Description text={reminder.description} />
      <Button onClick={() => removeTimeOutedReminder(reminder.id)} />
    </Container>
  ));
}
