import React from "react";
import { AnimatePresence, motion } from "framer-motion";

export default function Container({
  children,
  dialog,
  handleCloseDialog,
  showUpdateModal,
}) {
  return (
    <AnimatePresence>
      {showUpdateModal && (
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0 }}
          ref={dialog}
          onCancel={handleCloseDialog}
          className="fixed z-30 inset-0 w-full h-full mx-auto bg-black/80"
        >
          {children}
        </motion.div>
      )}
    </AnimatePresence>
  );
}
