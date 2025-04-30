import { differenceInCalendarDays, differenceInMinutes } from "date-fns";

function calculateTimeLeft(goalTime) {
  const now = new Date();
  const totalMinutes = differenceInMinutes(goalTime, now);
  const totalHours = Math.floor(totalMinutes / 60);
  const totalDays = differenceInCalendarDays(goalTime, now);

  const remainingMinutes = totalMinutes % 60;
  const remainingHours = totalHours % 24;

  const components = [];

  if (totalDays > 0) {
    components.push(`${totalDays} day${totalDays > 1 ? "s" : ""}`);
  }
  if (remainingHours > 0) {
    components.push(`${remainingHours} hour${remainingHours > 1 ? "s" : ""}`);
  }
  if (remainingMinutes > 0) {
    components.push(
      `${remainingMinutes} minute${remainingMinutes > 1 ? "s" : ""}`
    );
  }

  return components.length > 0
    ? `${components.join(", ")} left`
    : "No time left";
}

function calculateTimeLeftWithSeconds(goalTime) {
  const now = new Date();
  const totalSeconds = Math.floor((goalTime - now) / 1000);
  const totalMinutes = Math.floor(totalSeconds / 60);
  const totalHours = Math.floor(totalMinutes / 60);
  const totalDays = differenceInCalendarDays(goalTime, now);

  const remainingSeconds = totalSeconds % 60;
  const remainingMinutes = totalMinutes % 60;
  const remainingHours = totalHours % 24;

  const components = [];

  if (totalDays > 0) {
    components.push(`${totalDays} day${totalDays > 1 ? "s" : ""}`);
  }
  if (remainingHours > 0) {
    components.push(`${remainingHours} hour${remainingHours > 1 ? "s" : ""}`);
  }
  if (remainingMinutes > 0) {
    components.push(
      `${remainingMinutes} minute${remainingMinutes > 1 ? "s" : ""}`
    );
  }
  if (remainingSeconds > 0) {
    components.push(
      `${remainingSeconds} second${remainingSeconds > 1 ? "s" : ""}`
    );
  }

  return components.length > 0
    ? `${components.join(", ")} left`
    : "No time left";
}

export { calculateTimeLeft, calculateTimeLeftWithSeconds };
