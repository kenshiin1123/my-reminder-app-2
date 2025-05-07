import { Outlet } from "react-router";
import NavigationBar from "./components/NavigationBar";
import { Toaster } from "sonner";
import AlarmModal from "./components/AlarmModal/Index";
import { Analytics } from "@vercel/analytics/react";

export default function Layout() {
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
