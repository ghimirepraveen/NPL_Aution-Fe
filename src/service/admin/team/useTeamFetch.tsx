import { useQuery, keepPreviousData } from "@tanstack/react-query";
import fetcher from "../../fetcher";
import queryKeys from "../../../constants/reactQuery";

export default function useTeamFetch(queryParams = {}) {
  const query = new URLSearchParams(
    JSON.parse(JSON.stringify(queryParams))
  ).toString();

  return useQuery({
    queryKey: [queryKeys.admin.team.list, query],
    queryFn: () => fetcher(`/team?${query}`),
    placeholderData: keepPreviousData,
  });
}
