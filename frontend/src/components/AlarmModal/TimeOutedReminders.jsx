import useReminder from "../../store/useReminder";
import Button from "./Button";
import Description from "./Description";
import Title from "./Title";
import Container from "./Container";

export default function TimedOutReminders() {
  const { timeOutedReminder, removeTimeOutedReminder, isLoggedIn } =
    useReminder();

  return timeOutedReminder.map((reminder) => (
    <Container
      key={isLoggedIn ? reminder._id : reminder.id}
      id={isLoggedIn ? reminder._id : reminder.id}
    >
      <Title text={reminder.title} />
      <Description text={reminder.description} />
      <Button
        onClick={() =>
          removeTimeOutedReminder(isLoggedIn ? reminder._id : reminder.id)
        }
      />
    </Container>
  ));
}
