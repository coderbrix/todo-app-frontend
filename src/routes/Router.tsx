import { createBrowserRouter } from "react-router-dom";

import InboxPage from "../features/inbox/InboxPage";
import TodayPage from "../features/today/TodayPage";
import WorkspacePage from "../features/workspace/WorkspacePage";
import Layout from "../components/Layout/Layout";

const router = createBrowserRouter([
  {
    path: "/",
    element: <Layout />,
    children: [
      {
        path: "inbox",
        element: <InboxPage />,
      },
      {
        path: "today",
        element: <TodayPage />,
      },
      {
        path: "workspace",
        element: <WorkspacePage />,
      },
    ],
  },
]);

export default router;