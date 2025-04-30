import React from "react";

export default function Main({ children }) {
  return (
    <main className="flex justify-center items-center w-full mt-17 rounded px-4">
      {children}
    </main>
  );
}
