import { useMutation } from "@tanstack/react-query";
import mutator from "../../mutator";
import type {
  PlayerRegistrationData,
  SuccessData,
} from "../../../types/interfaces";

import handleSuccess from "../../../utils/handler/success";
import { useQueryClient } from "@tanstack/react-query";
import queryKeys from "../../../constants/reactQuery";
import handleError from "../../../utils/handler/error";

export default function usePlayerRegistration() {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: (data: PlayerRegistrationData) =>
      mutator("POST", "/player", data),
    onSuccess: (data: SuccessData) => {
      handleSuccess(data);

      queryClient.invalidateQueries({
        queryKey: [queryKeys.admin.player.list],
      });
    },
    onError: (error: any) => {
      handleError(error);
    },
  });
}
