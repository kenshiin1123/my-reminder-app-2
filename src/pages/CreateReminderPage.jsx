import React from "react";
import Header from "../components/Header";

import CreateReminderForm from "../components/CreateReminderForm/Index";

export default function CreateReminderPage() {
  return (
    <>
      <Header>New Reminder</Header>
      <CreateReminderForm />
    </>
  );
}
