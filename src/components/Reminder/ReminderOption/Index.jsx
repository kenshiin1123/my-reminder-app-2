import ReminderContext from "../ReminderContext";
import Button from "./Button";
import Container from "./Container";
import ButtonsSection from "./ButtonsSection";
import ExitButton from "./ExitButton";
import { AnimatePresence } from "framer-motion";
import useReminder from "../../../store/useReminder";
import { useContext } from "react";

export default function Index({ showOptions, toggleShowOption }) {
  const { toggleUpdateModal, deleteReminder, selectReminderById } =
    useReminder();
  const { id } = useContext(ReminderContext);
  return (
    <AnimatePresence>
      {showOptions ? (
        <Container>
          <ButtonsSection>
            <Button
              onClick={() => {
                selectReminderById(id);
                toggleUpdateModal();
                toggleShowOption();
              }}
            >
              Edit
            </Button>
            <Button onClick={() => deleteReminder(id)}>Delete</Button>
          </ButtonsSection>
          <ExitButton toggleShowOption={toggleShowOption} />
        </Container>
      ) : null}
    </AnimatePresence>
  );
}
