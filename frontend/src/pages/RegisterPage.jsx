import React, { useRef } from "react";
import Main from "../components/CreateReminderForm/Main";
import Form from "../components/CreateReminderForm/Form";
import Fieldset from "../components/CreateReminderForm/Fieldset";
import Button from "../components/CreateReminderForm/Button";
import Header from "../components/CreateReminderForm/Header";
import { toast } from "sonner";
import { register } from "../api/auth.api";

export default function RegisterPage() {
  const username = useRef();
  const email = useRef();
  const password = useRef();

  const handleSubmit = async (event) => {
    event.preventDefault();
    if (
      !username.current.value ||
      !email.current.value ||
      !password.current.value
    ) {
      return toast.error("Username, Email and Password is required!");
    }
    const { message, success } = await register(
      username.current.value,
      email.current.value,
      password.current.value
    );

    if (!success) {
      return toast.error(message);
    }

    username.current.value = "";
    email.current.value = "";
    password.current.value = "";
    return toast.success(message);
  };

  return (
    <Main>
      <Form onSubmit={handleSubmit}>
        <Header>Create Your Account</Header>
        <Fieldset
          ref={username}
          name={"username"}
          title={"Username"}
          type="text"
        />
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
