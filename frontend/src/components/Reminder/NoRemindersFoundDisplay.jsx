import React from "react";
import { Link } from "react-router";
import Header from "../Header";
import { motion } from "framer-motion";
export default function NoRemindersFoundDisplay() {
  return (
    <motion.div
      className="text-center space-y-5 mt-5"
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
    >
      <h1 className="text-3xl">No reminders found ☹️</h1>
      <Link to={"/create-reminder"}>
        <motion.button
          className="h-14 w-72 shadow-md bg-green-500 text-white text-xl font-semibold rounded"
          whileHover={{ scale: 0.97 }}
        >
          Create your reminder
        </motion.button>
      </Link>
    </motion.div>
  );
}
