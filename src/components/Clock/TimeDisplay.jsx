import { useEffect, useState } from "react";

function timeConvert(hours) {
  if (hours === 0) {
    return 12; // Midnight
  }
  if (hours > 12) {
    return hours - 12; // Convert to 12-hour format
  }
  return hours; // For hours 1 through 12
}

function formatTime(time) {
  return time < 10 ? "0" + time : time.toString();
}

export default function TimeDisplay() {
  const [currentTime, setCurrentTime] = useState({
    hours: 12,
    minutes: 0,
    seconds: 0,
  });

  useEffect(() => {
    const updateCurrentTime = () => {
      const now = new Date();
      setCurrentTime({
        hours: timeConvert(now.getHours()),
        minutes: now.getMinutes(),
        seconds: now.getSeconds(),
      });
    };

    updateCurrentTime(); // Update immediately on mount

    const interval = setInterval(updateCurrentTime, 1000); // Update every second

    return () => clearInterval(interval); // Cleanup interval on unmount
  }, []);
  return (
    <h1 className="text-white max-sm:text-4xl text-6xl">
      {`${formatTime(currentTime.hours)}:${formatTime(
        currentTime.minutes
      )}:${formatTime(currentTime.seconds)} ${
        new Date().getHours() >= 12 ? "PM" : "AM"
      }`}
    </h1>
  );
}
