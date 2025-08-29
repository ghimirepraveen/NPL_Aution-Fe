import { useQuery, keepPreviousData } from "@tanstack/react-query";
import fetcher from "../../fetcher";
import queryKeys from "../../../constants/reactQuery";

export default function useBidLogFetch(queryParams = {}) {
  const query = new URLSearchParams(
    JSON.parse(JSON.stringify(queryParams))
  ).toString();

  return useQuery({
    queryKey: [queryKeys.admin.bidLog.list, query],
    queryFn: () => fetcher(`bid-log/?${query}`),
    placeholderData: keepPreviousData,
  });
}
