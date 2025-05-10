import React from "react";

export default function Label({ htmlFor, text }) {
  return (
    <label htmlFor={htmlFor} className="indent-6 font-semibold text-md mb-0.5">
      {text}
    </label>
  );
}
