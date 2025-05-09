import { Outlet, useLocation } from "react-router";
import NavigationBar from "./components/NavigationBar";
import { Toaster } from "sonner";
import AlarmModal from "./components/AlarmModal/Index";
import { Analytics } from "@vercel/analytics/react";
import useReminder from "./store/useReminder";
import { useEffect } from "react";

export default function Layout() {
  const { verifyIsloggedIn, fetchReminders } = useReminder();
  const location = useLocation();

  useEffect(() => {
    const init = async () => {
      const loggedIn = await verifyIsloggedIn(); // should return a boolean
      if (loggedIn) {
        await fetchReminders();
      }
    };
    init();
  }, [location, fetchReminders, verifyIsloggedIn]);

  return (
    <>
      <NavigationBar />
      <Outlet />
      <Toaster richColors />
      <AlarmModal />
      {/* <Analytics /> */}
    </>
  );
}
