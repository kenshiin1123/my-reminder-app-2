import React, { useEffect } from "react";
import { AnimatePresence, motion } from "framer-motion";

export default function Container({
  children,
  handleCloseDialog,
  showUpdateModal,
  toggleUpdateModal,
}) {
  useEffect(() => {
    const handleBackgroundClick = (event) => {
      if (event.target.classList.contains("modal-background")) {
        toggleUpdateModal();
      }
    };

    document.addEventListener("mousedown", handleBackgroundClick);

    return () => {
      document.removeEventListener("mousedown", handleBackgroundClick);
    };
  }, [toggleUpdateModal]);

  return (
    <AnimatePresence>
      {showUpdateModal && (
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0 }}
          onCancel={handleCloseDialog}
          className="fixed z-30 inset-0 w-full h-full mx-auto bg-black/80 modal-background"
        >
          {children}
        </motion.div>
      )}
    </AnimatePresence>
  );
}
