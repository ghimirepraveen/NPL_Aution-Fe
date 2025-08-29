import * as React from "react";

import dayjs from "dayjs";
import { RouterProvider } from "react-router-dom";
import { ConfigProvider, notification } from "antd";

import { ReactQueryDevtools } from "@tanstack/react-query-devtools";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";

import router from "./router/router";
import relativeTime from "dayjs/plugin/relativeTime";

import handleError from "./utils/handler/error";
// import queryKeys from "constants/reactQuery";
import SuspenseLoading from "./components/loading/suspenseLoading/suspenseLoading";

import type { ErrorData } from "./types/interfaces";
import { App as AntdApp } from "antd";

dayjs.extend(relativeTime);

notification.config({
  duration: 2,
});

const queryClient = new QueryClient({
  defaultOptions: {
    queries: {
      refetchOnWindowFocus: false,
      retry: (failureCount, error: ErrorData) => {
        if (
          error?.response?.status === 401 ||
          error?.response?.status === 403 ||
          error?.response?.status === 404 ||
          error?.response?.status === 440
        ) {
          return false;
        }
        return failureCount < 1;
      },
    },
    mutations: {
      onError: (error) => handleError(error),
    },
  },
});

export default function App() {
  return (
    <>
      <React.Suspense fallback={<SuspenseLoading />}>
        <ConfigProvider
          theme={{
            token: {
              colorPrimary: "##003893",
            },
          }}
        >
          <QueryClientProvider client={queryClient}>
            <AntdApp>
              <RouterProvider router={router} />
            </AntdApp>

            <ReactQueryDevtools initialIsOpen={false} />
          </QueryClientProvider>
        </ConfigProvider>
      </React.Suspense>
    </>
  );
}
