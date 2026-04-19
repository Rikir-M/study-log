import { createBrowserRouter } from "react-router";
import Home from "../pages/Home";
import { SessionLoader } from "../loaders/SessionLoader";
import Sessions from "../pages/Sessions";
import App from "../App";
import Analytics from "../pages/Analytics";
import Settings from "../pages/Settings";

export const router = createBrowserRouter([
  {
    id: 'root',
    path: '/',
    Component: App,
    children: [
      {
        index: true,
        element: <Home />,
      },
      {
        path: 'sessions',
        element: <Sessions />,
        loader: SessionLoader,
      },
      {
        path: 'analytics',
        element: <Analytics />,
      },
      {
        path: 'settings',
        element: <Settings />,
      }
    ],
  },
])