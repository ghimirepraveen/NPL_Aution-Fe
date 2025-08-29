import { createBrowserRouter } from "react-router-dom";
import {
  Login,
  NotFound,
  Root,
  RequireAdmin,
  ThankYouPage,
  PlayerRegistration,
  Player,
  Team,
  TeamDetail,
  SiteSetting,
  EmailTemplate,
  EmailTemplateForm,
  PlayerDetail,
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

          {
            path: "player/:id",
            element: <PlayerDetail />,
          },

          {
            path: "teams",
            element: <Team />,
          },
          {
            path: "teams/:id",
            element: <TeamDetail />,
          },
          {
            path: "settings",
            element: <SiteSetting />,
          },
          {
            path: "email-templates",
            element: <EmailTemplate />,
          },
          {
            path: "email-template/:slug",
            element: <EmailTemplateForm />,
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
