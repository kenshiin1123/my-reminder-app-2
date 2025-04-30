import { motion } from "framer-motion";
import React from "react";
import { NavLink } from "react-router-dom";

import { FaHome } from "react-icons/fa";
import { LuCalendarClock } from "react-icons/lu";
import { LuAlarmClockPlus } from "react-icons/lu";

const PAGES = [
  { name: "Homepage", link: "/", icon: <FaHome /> },
  { name: "Reminders", link: "/reminders", icon: <LuCalendarClock /> },
  {
    name: "Create Reminder",
    link: "/create-reminder",
    icon: <LuAlarmClockPlus />,
  },
];

import { fadeInDown } from "../animations";

export default function NavigationBar() {
  return (
    <>
      <motion.div
        {...fadeInDown}
        className="bg-[#1b1919] flex flex-col gap-2 px-3 sticky top-0 z-10 justify-start max-sm:justify-center py-5"
      >
        <h1 className=" text-white text-4xl max-sm:text-center mb-3 min-sm:indent-5">
          Reminders
        </h1>
        <div className="flex gap-2 w-full max-sm:justify-center">
          {PAGES.map((page) => {
            return (
              <NavLink
                draggable={false}
                key={page.name}
                style={({ isActive }) => ({
                  border: isActive ? "2px solid gray" : "2px solid white",
                  transform: isActive && "scale(0.95)",
                })}
                to={page.link}
                className="px-3 bg-white py-2 rounded-sm select-none transition-all flex justify-center items-center max-sm:size-12 gap-3"
              >
                <span className="max-sm:hidden">{page.name}</span> {page.icon}
              </NavLink>
            );
          })}
        </div>
      </motion.div>
    </>
  );
}
