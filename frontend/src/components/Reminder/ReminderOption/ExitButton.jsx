import { motion } from "framer-motion";
import React from "react";
import { GrClose } from "react-icons/gr";

export default function ExitButton({ toggleShowOption }) {
  return (
    <section className="w-[20%] h-full">
      <motion.button
        whileHover={{ scale: 0.97 }}
        className="bg-white p-2 rounded shadow shadow-gray-600"
        onClick={toggleShowOption}
      >
        <GrClose />
      </motion.button>
    </section>
  );
}
