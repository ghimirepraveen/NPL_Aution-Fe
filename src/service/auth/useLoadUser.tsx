import { useQuery } from "@tanstack/react-query";

import fetcher from "../fetcher";
//import queryKeys from "../../constants/reactQuery";
import { getAccessToken } from "../../utils/auth";

export default function useLoadUser() {
  const accessToken = getAccessToken();

  return useQuery({
    queryKey: ["auth", "user"],
    queryFn: () => fetcher(`/auth/my-profile`),
    enabled: !!accessToken,
  });
}
