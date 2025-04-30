import React, { useContext } from "react";
import ReminderContext from "../ReminderContext";

export default function Description() {
  const { description } = useContext(ReminderContext);
  return (
    <textarea
      className="bg-white rounded w-full p-1 resize-none select-none h-20"
      defaultValue={description}
      disabled
    ></textarea>
  );
}
