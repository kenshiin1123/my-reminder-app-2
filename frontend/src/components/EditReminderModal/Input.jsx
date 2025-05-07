import React from "react";

export default function Input({ id, type = "text", defaultValue, ref, name }) {
  let min = {};
  if (type == "date") {
    min = { min: new Date().toISOString().split("T")[0] };
  } else if (type == "time") {
    // const now = new Date();
    // now.setMinutes(now.getMinutes() + 5);
    // min = { min: now.toTimeString().split(" ")[0].slice(0, 5) }
  }
  return (
    <input
      name={name}
      {...(type === "date" || type === "time" ? min : {})}
      ref={ref}
      defaultValue={defaultValue}
      type={type}
      id={id}
      className={`${
        type == "text" ? "w-[90%]" : "w-[80%]"
      } bg-white shadow-xs shadow-gray-500 rounded self-center h-10 text-black indent-3`}
    />
  );
}
