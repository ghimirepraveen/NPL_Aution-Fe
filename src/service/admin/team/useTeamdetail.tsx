import { useQuery } from "@tanstack/react-query";
import queryKeys from "../../../constants/reactQuery";
import fetcher from "../../fetcher";

type TeamDetailsQueryParams = { id: string };

export default function useTeamDetails(queryParams: TeamDetailsQueryParams) {
  console.log("Fetching team details for ID:", queryParams.id);
  return useQuery({
    queryKey: [queryKeys.admin.team.details, queryParams],
    queryFn: () => fetcher(`/team/${queryParams.id}`),
    enabled: !!queryParams.id,
  });
}
