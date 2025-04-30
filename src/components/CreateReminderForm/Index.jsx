import Main from "./Main.jsx";
import Form from "./Form.jsx";
import Fieldset from "./Fieldset.jsx";
import Section from "./Section.jsx";
import Button from "./Button.jsx";
import { useRef, useEffect } from "react";
import useReminder from "../../store/useReminder.js";
import { format } from "date-fns";

export default function CreateReminderForm() {
  const { createReminder } = useReminder();
  const form = useRef();
  const title = useRef();
  const time = useRef();
  const date = useRef();

  const handleSubmit = (e) => {
    e.preventDefault();
    createReminder(e);
    form.current.reset();
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
        <Fieldset title={"Title"} ref={title} name="title" />
        <Fieldset title={"Description"} name="description" />
        <Section>
          <Fieldset title={"Time"} ref={time} type="time" name="time" />
          <Fieldset title={"Date"} ref={date} type="date" name="date" />
        </Section>
        <Button title={"Create Reminder"} />
      </Form>
    </Main>
  );
}
