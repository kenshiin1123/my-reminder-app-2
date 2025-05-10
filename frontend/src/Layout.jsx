import { Outlet, useLocation } from "react-router";
import NavigationBar from "./components/NavigationBar";
import { Toaster } from "sonner";
import AlarmModal from "./components/AlarmModal/Index";
import { Analytics } from "@vercel/analytics/react";
import useReminder from "./store/useReminder";
import { useEffect } from "react";

export default function Layout() {
  const { verifyIsloggedIn } = useReminder();
  const location = useLocation();

  useEffect(() => {
    verifyIsloggedIn();
  }, [location, verifyIsloggedIn]);

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
