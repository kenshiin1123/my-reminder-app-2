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
    } catch (error) {
      console.log("Encountered and error while updating the reminder!", error);
    }
  };

  const handleCloseDialog = () => {
    toggleUpdateModal();
  };

  return createPortal(
    <Container
      handleCloseDialog={handleCloseDialog}
      showUpdateModal={showUpdateModal}
    >
      <Form
        showUpdateModal={showUpdateModal}
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
