import { motion } from "framer-motion";
import React, { useEffect } from "react";
export default function Form({
  children,
  toggleUpdateModal,
  handleFormSubmit,
}) {
  useEffect(() => {
    const closeEvent = (event) => {
      if (event.key === "Escape") {
        toggleUpdateModal(false);
      }
    };
    window.addEventListener("keydown", closeEvent);
    return () => {
      window.removeEventListener("keydown", closeEvent);
    };
  });

  return (
    <motion.form
      onSubmit={handleFormSubmit}
      initial={{ opacity: 0, scale: 0.4 }}
      animate={{ opacity: 1, scale: 1 }}
      exit={{ opacity: 0, scale: 0.4 }}
      transition={{ duration: 0.2 }}
      className="mt-20 min-h-64 max-sm:w-96 w-[30rem] max-w-[95%] mx-auto bg-white  rounded-xl flex flex-col p-4 text-black"
    >
      {children}
    </motion.form>
  );
}
