import { AnimatePresence, motion } from "framer-motion";
import React from "react";
export default function Form({ children, showUpdateModal, handleFormSubmit }) {
  return (
    <motion.form
      onSubmit={handleFormSubmit}
      initial={{ opacity: 0, scale: 0.4 }}
      animate={{ opacity: 1, scale: 1 }}
      exit={{ opacity: 0, scale: 0.4 }}
      transition={{ duration: 0.2 }}
      className="mt-20 min-h-64 max-sm:w-96 w-[30rem] max-w-[95%] mx-auto bg-[#d90429] rounded-xl flex flex-col p-4 text-white"
    >
      {children}
    </motion.form>
  );
}
