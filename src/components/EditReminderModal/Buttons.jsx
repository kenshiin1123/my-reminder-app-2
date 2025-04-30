import React from "react";
import Button from "./Button";

export default function Buttons({ closeDialog }) {
  return (
    <section className="flex justify-around mt-4 max-sm:gap-2">
      <Button type="button" handleClick={closeDialog}>
        Cancel
      </Button>
      <Button type="submit">Confirm</Button>
    </section>
  );
}
