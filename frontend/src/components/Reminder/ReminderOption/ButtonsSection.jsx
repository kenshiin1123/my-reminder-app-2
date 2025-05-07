import React from "react";

export default function ButtonsSection({ children }) {
  return (
    <section className="flex flex-col w-[90%] gap-1 h-full justify-center items-start">
      {children}
    </section>
  );
}
