import React from "react";

export default function Description({ text }) {
  return (
    text && (
      <p className=" text-justify min-h-24 max-h-56 overflow-y-scroll">
        {text}
      </p>
    )
  );
}
