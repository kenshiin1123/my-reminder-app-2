import React from "react";

export default function Title({ text }) {
  return (
    <h1 className="h-8 font-semibold text-xl whitespace-nowrap overflow-hidden text-ellipsis">
      {text}
    </h1>
  );
}
