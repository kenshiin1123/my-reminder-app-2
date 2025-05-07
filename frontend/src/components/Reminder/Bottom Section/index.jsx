import { AnimatePresence, motion } from "framer-motion";
import React, { useContext, useEffect } from "react";
import ReminderContext from "../ReminderContext";
import calculateDateTime from "../../../utils/calculateDateTime";
import { useState } from "react";
export default function BottomSection() {
  const { isActive, datetime } = useContext(ReminderContext);
  const goalTime = React.useMemo(() => new Date(datetime), [datetime]);

  const [calculatedTimeLeft, setCalculatedTimeLeft] = useState(
    calculateDateTime(goalTime)
  );

  useEffect(() => {
    const interval = setInterval(() => {
      setCalculatedTimeLeft(calculateDateTime(goalTime));
    }, 1000);

    return () => clearInterval(interval); // Cleanup on re-render or unmount
  }, [goalTime]);

  return (
    <AnimatePresence>
      {!isActive && (
        <motion.div
          initial={{ opacity: 0, scale: 0.5 }}
          animate={{ opacity: 1, scale: 1 }}
          exit={{ opacity: 0, scale: 0.5 }}
          className="w-full h-full bg-white rounded p-2 text-center text-sm"
        >
          {calculatedTimeLeft}
        </motion.div>
      )}
    </AnimatePresence>
  );
}
