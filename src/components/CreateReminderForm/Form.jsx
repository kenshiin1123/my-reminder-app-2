import React from "react";
import { scaleIn } from "../../animations";
import { motion } from "framer-motion";

export default function Form({ children, ...props }) {
  return (
    <motion.form
      {...props}
      {...scaleIn}
      className="flex flex-col bg-[#d90429] h-80 max-sm:w-[90vw] min-sm:w-[29rem] rounded-lg p-4 space-y-4"
    >
      {children}
    </motion.form>
  );
}
