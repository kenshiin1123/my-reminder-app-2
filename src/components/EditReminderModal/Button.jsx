import React from "react";

export default function Button({ type, handleClick, children }) {
  return (
    <button
      type={type}
      onClick={handleClick}
      className={`px-3 py-1 w-36 h-10 shadow-md hover:shadow-none text-white font-semibold rounded hover:scale-95 select-none ${
        type === "submit" ? "bg-green-500" : "bg-red-500"
      }`}
    >
      {children}
    </button>
  );
}
