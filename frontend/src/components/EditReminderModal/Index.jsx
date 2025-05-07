import { createPortal } from "react-dom";

import Form from "./Form.jsx";
import Container from "./Container.jsx";
import Header from "./Header.jsx";
import TitleAndDescription from "./TitleAndDescription.jsx";
import DateAndTime from "./DateAndTime.jsx";
import Buttons from "./Buttons.jsx";
import formUtil from "../../utils/formUtil.js";
import useReminder from "../../store/useReminder.js";
import { toast } from "sonner";
import successSoundFile from "../../assets/sound/created.mp3";
import cancelSoundFile from "../../assets/sound/cancel.mp3";

const Modal = function Modal() {
  const {
    selectedReminder,
    updateReminder,
    toggleUpdateModal,
    showUpdateModal,
  } = useReminder();

  const {
    title: initialTitle,
    description: initialDescription,
    datetime: initialDateTime,
  } = selectedReminder;

  const handleFormSubmit = (e) => {
    e.preventDefault();
    try {
      const data = formUtil(e);
      const { title, description, date, time } = data;
      if (!title || !date || !time) {
        toast.error("Please input the required fields!");
        return;
      }
      const updatedData = {
        ...selectedReminder,
        title,
        description,
        datetime: `${date}T${time}`,
      };
      updateReminder(updatedData);
      toggleUpdateModal();

      // Play sound.
      const updateSound = new Audio(successSoundFile);
      updateSound.play();
    } catch (error) {
      console.log("Encountered and error while updating the reminder!", error);
    }
  };

  const handleCloseDialog = () => {
    toggleUpdateModal();

    // Cancel Sound
    const cancelSFX = new Audio(cancelSoundFile);
    cancelSFX.play();
  };

  return createPortal(
    <Container
      handleCloseDialog={handleCloseDialog}
      toggleUpdateModal={toggleUpdateModal}
      showUpdateModal={showUpdateModal}
    >
      <Form
        toggleUpdateModal={toggleUpdateModal}
        handleFormSubmit={handleFormSubmit}
      >
        <Header />
        <TitleAndDescription
          title={initialTitle}
          description={initialDescription}
        />
        <DateAndTime datetime={initialDateTime} />
        <Buttons closeDialog={handleCloseDialog} />
      </Form>
    </Container>,
    document.getElementById("modal")
  );
};

export default Modal;
