import { AnimatePresence, motion } from "framer-motion";
import React from "react";

export default function Background({ children, showAlarm }) {
  return (
    <AnimatePresence>
      {showAlarm && (
        <motion.div
          key={showAlarm}
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ duration: 0.3 }}
          className="max-sm:flex-col fixed inset-0 z-20 max-sm:overflow-y-scroll overflow-x-scroll flex items-center bg-black/50 gap-5 p-10"
        >
          {children}
        </motion.div>
      )}
    </AnimatePresence>
  );
}
