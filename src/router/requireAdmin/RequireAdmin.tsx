import useMisc from "../../hooks/useMics";
import { ADMIN, SUPER_ADMIN } from "../../constants/userRole";

import AdminLayout from "../../components/layout/Adminlayout/layout";
import SuspenseLoading from "../../components/loading/suspenseLoading/suspenseLoading";
import NotFound from "../../components/pages/notFound/NotFound";

export default function RequireAdmin() {
  const { authLoading, authFetchStatus, authData } = useMisc();

  if (authLoading && authFetchStatus === "fetching") {
    return <SuspenseLoading />;
  }

  if (
    authData &&
    (authData?.data?.userType?.includes(ADMIN) ||
      authData?.data?.userType?.includes(SUPER_ADMIN))
  ) {
    return <AdminLayout />;
  }

  if (
    authData &&
    !(
      authData?.data?.userType?.includes(ADMIN) ||
      authData?.data?.userType?.includes(SUPER_ADMIN)
    )
  ) {
    return <NotFound />;
  }

  if (authLoading && authFetchStatus === "idle") {
    return <NotFound />;
  }

  if (!authLoading && !authData) {
    return <NotFound />;
  }

  return null;
}
