import { useMutation } from "@tanstack/react-query";
import mutator from "../../mutator";
import type { TeamRequest, SuccessData } from "../../../types/interfaces";

import handleSuccess from "../../../utils/handler/success";
import { useQueryClient } from "@tanstack/react-query";
import queryKeys from "../../../constants/reactQuery";

export default function usePlayerRegistration() {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: (data: TeamRequest) => mutator("POST", "/team", data),
    onSuccess: (data: SuccessData) => {
      handleSuccess(data);

      queryClient.invalidateQueries({
        queryKey: [queryKeys.admin.team.list],
      });
    },
  });
}
