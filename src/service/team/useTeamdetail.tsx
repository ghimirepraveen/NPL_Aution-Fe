import { useQuery } from "@tanstack/react-query";
import queryKeys from "../../constants/reactQuery";
import fetcher from "../fetcher";

type TeamDetailsQueryParams = { id: string | number };

export default function useTeamDetails(queryParams: TeamDetailsQueryParams) {
  return useQuery({
    queryKey: [queryKeys.admin.team.details, queryParams],
    queryFn: () => fetcher(`/team/${queryParams.id}`),
  });
}
