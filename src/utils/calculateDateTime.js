import { differenceInSeconds } from "date-fns";

function formatPlural(value, unit) {
  return `${value} ${unit}${value !== 1 ? "s" : ""}`;
}

export function calculateTimeLeft(goalDateTime) {
  const goalDate = new Date(goalDateTime);
  const now = new Date();

  const totalSeconds = differenceInSeconds(goalDate, now);

  if (totalSeconds <= 0) {
    return "Time's up!";
  }

  const days = Math.floor(totalSeconds / (60 * 60 * 24));
  const hours = Math.floor((totalSeconds % (60 * 60 * 24)) / 3600);
  const minutes = Math.floor((totalSeconds % 3600) / 60);
  const seconds = totalSeconds % 60;

  const parts = [
    days > 0 ? formatPlural(days, "day") : null,
    hours > 0 ? formatPlural(hours, "hour") : null,
    minutes > 0 ? formatPlural(minutes, "minute") : null,
    seconds > 0 ? formatPlural(seconds, "second") : null,
  ].filter(Boolean);

  return parts.join(", ") + " left.";
}

export default calculateTimeLeft;
