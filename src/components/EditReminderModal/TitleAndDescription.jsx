import React, { useEffect, useRef } from "react";
import Section from "./Section";
import Input from "./Input";
import Label from "./Label";

export default function TitleAndDescription({
  title = "SampleTitle",
  description = "SampleDescription",
}) {
  const titleRef = useRef();
  const descriptionRef = useRef();

  useEffect(() => {
    titleRef.current.value = title;
    descriptionRef.current.value = description;
    titleRef.current.focus();
  }, [title, description]);

  return (
    <>
      <Section>
        <Label htmlFor={"title"} text={"Title"} />
        <Input ref={titleRef} id={"title"} name="title" />
      </Section>
      <Section>
        <Label htmlFor={"description"} text={"Description (optional)"} />
        <Input ref={descriptionRef} id={"description"} name="description" />
      </Section>
    </>
  );
}
