import { motion } from "framer-motion";
import { scaleIn } from "../../animations";
export default function Container({ children, id }) {
  return (
    <motion.div
      key={id}
      {...scaleIn}
      className="mx-auto flex flex-col gap-2 p-4 min-w-72 w-72 min-h-20 shadow-md shadow-black/50 bg-white rounded-md"
    >
      {children}
    </motion.div>
  );
}
