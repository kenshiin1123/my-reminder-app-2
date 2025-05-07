import ReminderContext from "../ReminderContext";
import Button from "./Button";
import Container from "./Container";
import ButtonsSection from "./ButtonsSection";
import ExitButton from "./ExitButton";
import { AnimatePresence } from "framer-motion";
import useReminder from "../../../store/useReminder";
import { useContext } from "react";
import deleteSoundFile from "../../../assets/sound/delete.mp3";

export default function Index({ showOptions, toggleShowOption }) {
  const { toggleUpdateModal, deleteReminder, selectReminderById } =
    useReminder();
  const { id } = useContext(ReminderContext);

  const handleDelete = () => {
    const deleteSFX = new Audio(deleteSoundFile);
    deleteSFX.play();
    deleteReminder(id);
  };

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
            <Button onClick={handleDelete}>Delete</Button>
          </ButtonsSection>
          <ExitButton toggleShowOption={toggleShowOption} />
        </Container>
      ) : null}
    </AnimatePresence>
  );
}
