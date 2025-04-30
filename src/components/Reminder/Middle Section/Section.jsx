import React from "react";

export default function Section({ children }) {
    return <section className="flex flex-col text-black w-full gap-3">{children}</section>;
}
