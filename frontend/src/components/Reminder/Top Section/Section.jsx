import React from "react";

export default function Section({ children }) {
  return (
    <section className="flex h-[15%] items-center justify-between w-full">
      {children}
    </section>
  );
}
