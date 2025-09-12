import { useQuery } from "@tanstack/react-query";
import fetcher from "../../fetcher";
import queryKeys from "../../../constants/reactQuery";

export default function useDashboardDataFetch() {
  return useQuery({
    queryKey: [queryKeys.admin.dashboard.main],
    queryFn: () => fetcher(`/admin/dashboard`),
  });
}
