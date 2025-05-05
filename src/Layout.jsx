import { Outlet } from "react-router";
import NavigationBar from "./components/NavigationBar";
import { Toaster } from "sonner";
import AlarmModal from "./components/AlarmModal/Index";

export default function Layout() {
  return (
    <>
      <NavigationBar />
      <Outlet />
      <Toaster richColors />
      <AlarmModal />
    </>
  );
}
