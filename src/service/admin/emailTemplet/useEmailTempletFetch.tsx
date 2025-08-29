import { useQuery, keepPreviousData } from "@tanstack/react-query";
import fetcher from "../../fetcher";
import queryKeys from "../../../constants/reactQuery";

export default function useEmailTempletFetch(queryParams = {}) {
  const query = new URLSearchParams(
    JSON.parse(JSON.stringify(queryParams))
  ).toString();

  return useQuery({
    queryKey: [queryKeys.admin.emailTemplet.list, query],
    queryFn: () => fetcher(`email-template/?${query}`),
    placeholderData: keepPreviousData,
  });
}
