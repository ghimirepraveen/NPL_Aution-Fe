import { useQuery, keepPreviousData } from "@tanstack/react-query";
import fetcher from "../../fetcher";
import queryKeys from "../../../constants/reactQuery";

export default function usePlayerFetch() {
  return useQuery({
    queryKey: [queryKeys.admin.player.list],
    queryFn: () => fetcher(`/player/for-select`),
    placeholderData: keepPreviousData,
  });
}
