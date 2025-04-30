import { motion } from "framer-motion";
import React from "react";
import { scaleIn } from "../../../animations";
export default function Container({ children }) {
  return (
    <motion.div
      {...scaleIn}
      className="select-none flex justify-around items-center divide-black  gap-2 absolute right-2.5 top-2 bg-white/70 w-40 h-20 rounded shadow-2xl py-1 px-1"
    >
      {children}
    </motion.div>
  );
}
