import { motion } from "framer-motion";

export default function Button({ children, ...props }) {
  return (
    <motion.button
      whileHover={{ scale: 0.95 }}
      className="shadow shadow-gray-600 bg-white rounded cursor-pointer w-[90%] h-[47%]"
      {...props}
    >
      {children}
    </motion.button>
  );
}
