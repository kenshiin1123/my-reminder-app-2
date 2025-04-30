import { motion } from "framer-motion";
import React from "react";
import { scaleIn } from "../../animations";
export default function ReminderContainer({ reminder, children }) {
  return (
    <motion.div
      {...scaleIn}
      className={`relative flex flex-col items-center h-fit max-sm:w-full max-sm:mx-3 min-sm:w-72 min-md:w-[20rem] max-lg:w-72 ${
        !reminder.isActive ? "bg-[#d90429]" : "bg-[#fb2d4f]"
      } rounded-sm p-3 gap-3 transition-colors shadow-sm shadow-gray-700`}
    >
      {children}
    </motion.div>
  );
}
