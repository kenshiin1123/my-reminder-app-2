import React from "react";
import { motion } from "framer-motion";
export default function Button({ title }) {
  return (
    <motion.button
      whileTap={{ scale: 0.97 }}
      whileHover={{ scale: 0.95 }}
      className="text-xl bg-green-500 text-white py-1 px-2 rounded mt-auto select-none font-semibold"
      type="submit"
    >
      {title}
    </motion.button>
  );
}
