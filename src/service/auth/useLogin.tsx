import { useMutation } from "@tanstack/react-query";
import useMisc from "../../hooks/useMics";
import mutator from "../../service/mutator";
import { setAccessToken, setRefreshToken } from "../../utils/auth";

type LoginPayload = {
  email: string;
  password: string;
};

type LoginResponse = {
  data: {
    accessToken: string;
    refreshToken: string;
  };
};

const useLogin = () => {
  const { authRefetch } = useMisc() || {};

  return useMutation({
    mutationFn: (data: LoginPayload) => mutator("POST", "/auth/login", data),
    onSuccess: (data: LoginResponse) => {
      if (data?.data?.accessToken) setAccessToken(data.data.accessToken);
      if (data?.data?.refreshToken) setRefreshToken(data.data.refreshToken);
      authRefetch();
    },
  });
};

export default useLogin;
