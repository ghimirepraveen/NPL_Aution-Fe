import { useQuery } from "@tanstack/react-query";
import queryKeys from "../../constants/reactQuery";
import fetcher from "../fetcher";

type PlayerDetailsQueryParams = { id: string | number };

export default function usePlayerDetails(
  queryParams: PlayerDetailsQueryParams
) {
  return useQuery({
    queryKey: [queryKeys.admin.player.details, queryParams],
    queryFn: () => fetcher(`/player/${queryParams.id}`),
  });
}
