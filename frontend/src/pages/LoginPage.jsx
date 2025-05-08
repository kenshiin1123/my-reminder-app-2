import React, { useRef } from "react";
import Main from "../components/CreateReminderForm/Main";
import Form from "../components/CreateReminderForm/Form";
import Fieldset from "../components/CreateReminderForm/Fieldset";
import Button from "../components/CreateReminderForm/Button";
import Header from "../components/CreateReminderForm/Header";
import { toast } from "sonner";

import { login } from "../api/auth.api";

export default function LoginPage() {
  const email = useRef();
  const password = useRef();

  const handleSubmit = async (event) => {
    event.preventDefault();
    if (!email.current.value || !password.current.value) {
      return toast.error("Email and Password is required!");
    }

    const { message, success } = await login(
      email.current.value,
      password.current.value
    );
    if (!success) {
      return toast.error(message);
    }
    toast.success(message);
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
