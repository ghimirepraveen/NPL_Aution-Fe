import axiosInstance from "../axiosInstance";
import { setAccessToken, setRefreshToken } from "../utils/auth";

const performTokenRefresh = async (refreshToken: string) => {
  const { data } = await axiosInstance.post("/auth/get-new-access-token", {
    token: refreshToken,
  });

  if (data?.data?.accessToken) {
    setAccessToken(data?.data?.accessToken);
  }

  if (data?.data?.refreshToken) {
    setRefreshToken(data?.data?.refreshToken);
  }

  return Promise.resolve(true);
};

export default performTokenRefresh;
