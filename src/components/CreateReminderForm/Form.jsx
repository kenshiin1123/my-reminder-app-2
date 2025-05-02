import React from "react";
import { scaleIn } from "../../animations.js";
import { motion } from "framer-motion";

export default function Form({ children, ...props }) {
  return (
    <motion.form
      {...props}
      {...scaleIn}
      className="shadow-md flex flex-col bg-white text-black h-80 max-sm:w-[90vw] min-sm:w-[29rem] rounded-lg p-4 space-y-4"
    >
      {children}
    </motion.form>
  );
}
