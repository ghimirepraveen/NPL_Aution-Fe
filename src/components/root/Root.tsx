import * as React from "react";
import { notification } from "antd";
import { useQueryClient } from "@tanstack/react-query";
import { Outlet, useNavigate, useLocation } from "react-router-dom";

import axiosInstance from "../../axiosInstance";
import useLoadUser from "../../service/auth/useLoadUser";

import {
  getRefreshToken,
  removeAccessToken,
  removeRefreshToken,
} from "../../utils/auth";

export default function Root() {
  const queryClient = useQueryClient();
  const navigate = useNavigate();
  const location = useLocation();

  const {
    isLoading: authLoading,
    fetchStatus: authFetchStatus,
    refetch: authRefetch,
    data: authData,
  } = useLoadUser();

  React.useEffect(() => {
    window.scrollTo(0, 0);
  }, [location]);

  const authLogout = async () => {
    try {
      const refreshToken = getRefreshToken();

      await axiosInstance.put("/auth/logout", {
        refreshToken,
      });

      queryClient.clear();
      navigate("/login");
      removeAccessToken();
      removeRefreshToken();
      notification.success({
        message: "You are logged out",
      });
    } catch (e) {
      console.error(e);
      return;
    }
  };

  return (
    <Outlet
      context={{
        authData,
        authLoading,
        authRefetch,
        authFetchStatus,
        authLogout,
      }}
    />
  );
}
