import useMisc from "../../hooks/useMics";
import { TEAM } from "../../constants/userRole";

import AdminLayout from "../../components/layout/Adminlayout/layout";
import SuspenseLoading from "../../components/loading/suspenseLoading/suspenseLoading";
import NotFound from "../../components/pages/notFound/NotFound";

export default function RequireAdmin() {
  const { authLoading, authFetchStatus, authData } = useMisc();

  if (authLoading && authFetchStatus === "fetching") {
    return <SuspenseLoading />;
  }

  if (authData && authData?.data?.userType?.includes(TEAM)) {
    return <AdminLayout />;
  }

  if (authData && !authData?.data?.userType?.includes(TEAM)) {
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
