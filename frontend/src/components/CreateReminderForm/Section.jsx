import React from "react";

export default function Section({ children }) {
  return <section className="flex justify-between gap-2">{children}</section>;
}
