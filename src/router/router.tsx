import { createBrowserRouter } from "react-router-dom";
import {
  Login,
  NotFound,
  Root,
  RequireAdmin,
  ThankYouPage,
  PlayerRegistration,
  Player,
} from "./import";

const router = createBrowserRouter([
  {
    path: "",
    element: <Root />,

    children: [
      {
        path: "",
        children: [
          {
            path: "",
            element: <PlayerRegistration />,
          },
          {
            path: "login",
            element: <Login />,
          },
          {
            path: "thankyou",
            element: <ThankYouPage />,
          },
        ],
      },
      {
        path: "admin",
        element: <RequireAdmin />,
        children: [
          {
            path: "",
            //element: <Dashboard />,
          },
          {
            path: "players",
            element: <Player />,
          },
        ],
      },
      {
        path: "*",
        element: <NotFound />,
      },
    ],
  },
]);

export default router;
