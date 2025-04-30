// Active means the reminder is still running
import { v4 } from "uuid";

const REMINDERS_LIST = [
  {
    title: "Morning Workout",
    description: "20-minute calisthenics routine",
    datetime: "2025-04-30T06:30:00",
    isActive: false,
    id: v4(),
  },
  {
    title: "Project Deadline",
    description: "Submit MERN scraper tool",
    datetime: "2025-04-30T23:59:00",
    isActive: false,
    id: v4(),
  },
  {
    title: "Call with Client",
    description: "Discuss UI changes for portfolio site",
    datetime: "2025-04-30T14:00:00",
    isActive: false,
    id: v4(),
  },
  {
    title: "Study Java",
    description: "Practice OOP and collections",
    datetime: "2025-04-30T19:00:00",
    isActive: true,
    id: v4(),
  },
  {
    title: "Grocery Shopping",
    description: "",
    datetime: "2025-04-30T10:00:00",
    isActive: true,
    id: v4(),
  },
  {
    title: "Weekly Review",
    description: "Reflect on progress and plan next week",
    datetime: "2025-04-30T20:00:00",
    isActive: false,
    id: v4(),
  },
];

export default REMINDERS_LIST;
