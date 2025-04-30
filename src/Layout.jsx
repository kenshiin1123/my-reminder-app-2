import { Outlet } from "react-router";
import NavigationBar from "./components/NavigationBar";

export default function Layout() {
  return (
    <>
      <NavigationBar />
      <Outlet />
    </>
  );
}
