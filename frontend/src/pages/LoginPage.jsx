import React, { useRef } from "react";
import Main from "../components/CreateReminderForm/Main";
import Form from "../components/CreateReminderForm/Form";
import Fieldset from "../components/CreateReminderForm/Fieldset";
import Button from "../components/CreateReminderForm/Button";
import Header from "../components/CreateReminderForm/Header";
import { toast } from "sonner";
export default function LoginPage() {
  const email = useRef();
  const password = useRef();

  const handleSubmit = (event) => {
    event.preventDefault();
    if (!email.current.value || !password.current.value) {
      return toast.error("Email and Password is required!");
    }

    toast.success("Logged in successfully!");
  };

  return (
    <Main>
      <Form onSubmit={handleSubmit}>
        <Header>Access Your Account</Header>
        <Fieldset ref={email} name={"email"} title={"Email"} type="email" />
        <Fieldset
          ref={password}
          name={"password"}
          title={"Password"}
          type="password"
        />
        <Button title={"Sign In"} />
      </Form>
    </Main>
  );
}
