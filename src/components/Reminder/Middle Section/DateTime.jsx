import { useContext } from "react";
import ReminderContext from "../ReminderContext";
export default function DateTime() {
  const { datetime } = useContext(ReminderContext);
  return (
    <div className="flex [&>div]:bg-white [&>div]:text-black justify-between [&>div]:rounded [&>div]:p-2 [&>div]:w-[48.9%] text-center">
      <div>{datetime.split("T")[0]}</div>
      <div>{datetime.split("T")[1]}</div>
    </div>
  );
}
