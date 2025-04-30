import { StrictMode } from "react";
import { createRoot } from "react-dom/client";
import "./index.css";
import Layout from "./Layout.jsx";

import Homepage from "./pages/HomePage.jsx";
import CreateReminderPage from "./pages/CreateReminderPage.jsx";
import RemindersPage from "./pages/RemindersPage.jsx";

import { createBrowserRouter, RouterProvider } from "react-router-dom";

const router = createBrowserRouter([
  {
    path: "/",
    element: <Layout />,
    children: [
      {
        index: true,
        element: <Homepage />,
      },
      {
        path: "reminders",
        element: <RemindersPage />,
      },
      {
        path: "create-reminder",
        element: <CreateReminderPage />,
      },
    ],
  },
]);

createRoot(document.getElementById("root")).render(
  <StrictMode>
    <RouterProvider router={router} />
  </StrictMode>
);
