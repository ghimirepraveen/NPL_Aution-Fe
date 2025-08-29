import { useQuery, keepPreviousData } from "@tanstack/react-query";
import fetcher from "../../fetcher";
import queryKeys from "../../../constants/reactQuery";

export default function usePlayerFetch(queryParams = {}) {
  const query = new URLSearchParams(
    JSON.parse(JSON.stringify(queryParams))
  ).toString();

  return useQuery({
    queryKey: [queryKeys.admin.player.list, query],
    queryFn: () => fetcher(`/player?${query}`),
    placeholderData: keepPreviousData,
  });
}
