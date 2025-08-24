import * as React from "react";

export const Root = React.lazy(() => import("../components/root/Root"));
export const Login = React.lazy(() => import("../components/auth/login/Login"));

export const ChangePassword = React.lazy(
  () => import("../components/auth/changePassword/ChangePassword")
);

export const ForgetPassword = React.lazy(
  () => import("../components/auth/forgetPassword/ForgetPassword")
);

export const ResetPassword = React.lazy(
  () => import("../components/auth/resetPassword/ResetPasssword")
);

export const VerifyEmail = React.lazy(
  () => import("../components/auth/verifyEmail/VerifyEmail")
);

export const NotFound = React.lazy(
  () => import("../components/pages/notFound/NotFound")
);
export const RequireAdmin = React.lazy(
  () => import("./requireAdmin/RequireAdmin")
);

export const PlayerRegistration = React.lazy(
  () => import("../components/pages/playerRegisteration/playerRegisteration")
);

export const ThankYouPage = React.lazy(
  () => import("../components/pages/playerRegisteration/thankYou")
);

export const Player = React.lazy(
  () => import("../components/admin/player/player")
);
