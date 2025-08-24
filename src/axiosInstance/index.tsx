import axios from "axios";

import performTokenRefresh from "./performTokenRefresh";
import { getAccessToken, getRefreshToken } from "../utils/auth";

const axiosInstance = axios.create({
  baseURL: `http://localhost:4040/api/`,
});

axiosInstance.interceptors.request.use(
  (config) => {
    const accessToken = getAccessToken();
    if (accessToken) {
      config.headers["Authorization"] = `Bearer ${accessToken}`;
    }

    if (!config?.headers?.["Content-Type"]) {
      config.headers["Content-Type"] = "application/json";
    }

    return config;
  },
  (error) => Promise.reject(error)
);

axiosInstance.interceptors.response.use(
  (response) => response,
  async (error) => {
    const status = error?.response?.status;
    const refreshToken = getRefreshToken();

    if (status === 401 && refreshToken) {
      await performTokenRefresh(refreshToken);
      return axiosInstance.request(error?.config);
    }

    return Promise.reject(error);
  }
);

export default axiosInstance;
