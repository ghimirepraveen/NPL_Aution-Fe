import { useMutation } from "@tanstack/react-query";
import mutator from "../mutator";
import type { TeamRequest, SuccessData } from "../../types/interfaces";

import handleSuccess from "../../utils/handler/success";
import { useQueryClient } from "@tanstack/react-query";
import queryKeys from "../../constants/reactQuery";

export default function useTeamEdit(teamId: string) {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: (data: TeamRequest) => mutator("PUT", `/team/${teamId}`, data),
    onSuccess: (data: SuccessData) => {
      handleSuccess(data);

      queryClient.invalidateQueries({
        queryKey: [queryKeys.admin.team.list],
      });
    },
  });
}
