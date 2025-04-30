import React, { useContext } from "react";
import Section from "./Section";
import Description from "./Description";
import DateTime from "./DateTime";
import ReminderContext from "../ReminderContext";
export default function Index() {
  const { description, datetime } = useContext(ReminderContext);
  return (
    <Section>
      {description && <Description description={description} />}
      <DateTime datetime={datetime} />
    </Section>
  );
}
