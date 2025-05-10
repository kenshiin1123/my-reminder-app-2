import React from "react";
import { motion } from "framer-motion";
import { popIn } from "../animations";

export default function Header({ children }) {
  return (
    <motion.h1
      {...popIn}
      className="text-center text-4xl mt-5 max-sm:block hidden"
    >
      {children}
    </motion.h1>
  );
}
