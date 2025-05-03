// utils/timeLeft.ts
import { differenceInMinutes } from "date-fns";

function formatPlural(value, unit) {
  return `${value} ${unit}${value !== 1 ? "s" : ""}`;
}

export function calculateTimeLeft(goalDateTime) {
  const goalDate = new Date(goalDateTime);
  const now = new Date();

  const totalMinutes = differenceInMinutes(goalDate, now);

  if (totalMinutes <= 0) {
    return "Time's up!";
  }

  const days = Math.floor(totalMinutes / (60 * 24));
  const hours = Math.floor((totalMinutes % (60 * 24)) / 60);
  const minutes = totalMinutes % 60;

  const parts = [
    days > 0 ? formatPlural(days, "day") : null,
    hours > 0 ? formatPlural(hours, "hour") : null,
    minutes > 0 ? formatPlural(minutes, "minute") : null,
  ].filter(Boolean);

  return parts.join(", ") + " left.";
}

export default calculateTimeLeft;
