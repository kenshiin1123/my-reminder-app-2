import React, { useContext } from "react";

import { SlOptions } from "react-icons/sl";
import ReminderContext from "../ReminderContext";
export default function OptionButton() {
  const { toggleShowOption, id } = useContext(ReminderContext);
  return (
    <button
      className="bg-white p-1 rounded text-2xl cursor-pointer hover:scale-95"
      onClick={() => toggleShowOption(id)}
    >
      <SlOptions />
    </button>
  );
}
