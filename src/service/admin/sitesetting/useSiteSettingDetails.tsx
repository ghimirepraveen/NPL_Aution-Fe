import { useQuery } from "@tanstack/react-query";
import queryKeys from "../../../constants/reactQuery";
import fetcher from "../../fetcher";

export default function useSiteSettingDetails() {
  console.log("useSiteSettingDetails");
  return useQuery({
    queryKey: [queryKeys.admin.site.settings],
    queryFn: () => fetcher(`/site-setting`),
  });
}
