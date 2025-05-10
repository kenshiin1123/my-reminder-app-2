import { motion } from "framer-motion";
import { AiOutlineLoading3Quarters } from "react-icons/ai";

export default function Loading({ loadingKey }) {
  return (
    <motion.div
      key={loadingKey}
      initial={{ opacity: 0.6 }}
      animate={{ opacity: 1 }}
      className="fixed top-50"
    >
      <AiOutlineLoading3Quarters className="text-6xl  animate-spin" />
    </motion.div>
  );
}
