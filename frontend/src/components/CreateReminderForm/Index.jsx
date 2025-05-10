import Main from "./Main.jsx";
import Form from "./Form.jsx";
import Fieldset from "./Fieldset.jsx";
import Section from "./Section.jsx";
import Button from "./Button.jsx";
import Header from "./Header.jsx";
import { useRef, useEffect } from "react";
import useReminder from "../../store/useReminder.js";
import { format } from "date-fns";
import createdSFX from "../../assets/sound/created.mp3";

export default function CreateReminderForm() {
  const { createReminder } = useReminder();
  const form = useRef();
  const title = useRef();
  const description = useRef();
  const time = useRef();
  const date = useRef();

  const handleSubmit = (e) => {
    e.preventDefault();
    const { success } = createReminder(e);
    if (success) {
      const submitSound = new Audio(createdSFX);
      submitSound.play();
      description.current.value = "";
      title.current.value = "";
      title.current.focus();
    }
  };

  useEffect(() => {
    const now = new Date();
    const currentDate = format(now, "yyyy-MM-dd");
    const currentTime = format(now, "HH:mm");

    title.current.focus();
    date.current.value = currentDate;
    time.current.value = currentTime;
  }, []);

  return (
    <Main>
      <Form ref={form} onSubmit={handleSubmit}>
        <Header>New Reminder</Header>
        <Fieldset title={"Title"} ref={title} name="title" />
        <Fieldset title={"Description"} ref={description} name="description" />
        <Section>
          <Fieldset title={"Time"} ref={time} type="time" name="time" />
          <Fieldset title={"Date"} ref={date} type="date" name="date" />
        </Section>
        <Button title={"Create Reminder"} />
      </Form>
    </Main>
  );
}
