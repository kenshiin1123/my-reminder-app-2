import React from "react";

export default function Button({ ...props }) {
  return (
    <button
      {...props}
      className="font-semibold text-white px-3 py-2 bg-green-400 rounded cursor-pointer shadow hover:shadow-none hover:scale-97 select-none"
    >
      Check
    </button>
  );
}
