import React from "react";

export default function Button({ handleClick, children, ...props }) {
  return (
    <button
      {...props}
      onClick={handleClick}
      className="px-3 py-1 w-36 h-10 bg-white text-black rounded hover:scale-95 select-none"
    >
      {children}
    </button>
  );
}
