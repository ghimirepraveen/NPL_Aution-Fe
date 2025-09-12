import { useMutation } from "@tanstack/react-query";
import mutator from "../../mutator";
import type { EmailTemplate, SuccessData } from "../../../types/interfaces";

import handleSuccess from "../../../utils/handler/success";
import { useQueryClient } from "@tanstack/react-query";
import queryKeys from "../../../constants/reactQuery";
import handleError from "../../../utils/handler/error";

export default function useEmailTemplateEdit(slug: string) {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: (data: EmailTemplate) =>
      mutator("PUT", `/email-template/${slug}`, data),
    onSuccess: (data: SuccessData) => {
      handleSuccess(data);

      queryClient.invalidateQueries({
        queryKey: [queryKeys.admin.emailTemplet.details, { slug }],
      });
    },
    onError: (error: any) => {
      handleError(error);
    },
  });
}
