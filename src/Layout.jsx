import { Outlet } from "react-router";
import NavigationBar from "./components/NavigationBar";
import { Toaster } from "sonner";

export default function Layout() {
  return (
    <>
      <NavigationBar />
      <Outlet />
      <Toaster richColors />
    </>
  );
}
