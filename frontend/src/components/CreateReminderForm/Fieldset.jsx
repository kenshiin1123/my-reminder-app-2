import React from "react";

export default function Fieldset({ title, type = "text", ref = null, name }) {
  let isTimeDate = false;
  if (type == "time" || type == "date") {
    isTimeDate = true;
  }
  const uppercasedFirstLetter = title.charAt(0).toUpperCase() + title.slice(1);

  return (
    <fieldset className={`flex flex-col ${isTimeDate && "w-[46%]"}`}>
      <label htmlFor={title} className=" text-xl font-semibold mb-1">
        {uppercasedFirstLetter}
      </label>
      <input
        ref={ref}
        type={type}
        name={name}
        id={title}
        className="shadow-xs shadow-gray-500 bg-white rounded-md py-1 indent-4 text-md"
      />
    </fieldset>
  );
}
