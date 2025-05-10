import React from "react";

export default function Header({ children }) {
  return (
    <h1 className="text-center text-2xl mb-5 font-semibold">{children}</h1>
  );
}
