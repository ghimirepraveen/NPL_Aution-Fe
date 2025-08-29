import { useQuery } from "@tanstack/react-query";
import queryKeys from "../../../constants/reactQuery";
import fetcher from "../../fetcher";

type EmailTemplateDetailsQueryParams = { slug: string };

export default function useEmailTemplateDetails(
  queryParams: EmailTemplateDetailsQueryParams
) {
  return useQuery({
    queryKey: [queryKeys.admin.emailTemplet.details, queryParams],
    queryFn: () => fetcher(`/email-template/${queryParams.slug}`),
  });
}
