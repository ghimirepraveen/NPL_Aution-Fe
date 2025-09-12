import { useMutation } from "@tanstack/react-query";
import mutator from "../../mutator";
import type { SiteSetting, SuccessData } from "../../../types/interfaces";

import handleSuccess from "../../../utils/handler/success";
import { useQueryClient } from "@tanstack/react-query";
import queryKeys from "../../../constants/reactQuery";
import handleError from "../../../utils/handler/error";

export default function useSiteSettingUpdate() {
  const queryClient = useQueryClient();
  console.log("useSiteSettingUpdate");

  return useMutation({
    mutationFn: (data: SiteSetting) => mutator("PUT", "/site-setting", data),
    onSuccess: (data: SuccessData) => {
      handleSuccess(data);

      queryClient.invalidateQueries({
        queryKey: [queryKeys.admin.site.settings],
      });
    },
    onError: (error: any) => {
      handleError(error);
    },
  });
}
