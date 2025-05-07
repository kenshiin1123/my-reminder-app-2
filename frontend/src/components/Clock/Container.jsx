import { motion } from "framer-motion";
import { scaleIn } from "../../animations.js";
export default function Container({ children }) {
  return (
    <motion.div
      {...scaleIn}
      className="max-sm:w-80 max-sm:px-15 max-sm:py-10 bg-blue-600 flex justify-center mx-auto w-fit mt-20 rounded-lg px-30 py-15"
    >
      {children}
    </motion.div>
  );
}
