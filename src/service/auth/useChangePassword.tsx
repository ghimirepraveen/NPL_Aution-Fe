import { useMutation } from "@tanstack/react-query";

import mutator from "../mutator";
import handleSuccess from "../../utils/handler/success";

import type {
  ChangePasswordResponse,
  ErrorData,
  ChangePasswordVariables,
} from "../../types/interfaces";

export default function useChangePassword() {
  return useMutation<
    ChangePasswordResponse,
    ErrorData,
    ChangePasswordVariables
  >({
    mutationFn: (data: ChangePasswordVariables) =>
      mutator("POST", "/auth/change-password", data),
    onSuccess: (data) => handleSuccess(data),
  });
}
