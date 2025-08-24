import { Modal, notification, message } from "antd";

import type { ErrorData } from "../../types/interfaces";

const notifyError = (error: ErrorData) => {
  notification.destroy();
  return notification.error({
    message: error?.response?.data?.title || "Something went wrong!",
    description: error?.response?.data?.message || "",
  });
};

const notifyErrorMessage = (error: ErrorData) => {
  message.destroy();
  return message.error(
    error?.response?.data?.message || "Something went wrong!"
  );
};

export const handleError = (error: ErrorData) => {
  if (error?.response?.status === 401 || error?.response?.status === 404) {
    return;
  }

  if (error?.response?.status === 440) {
    return Modal.confirm({
      title: "Session Expired!",
      content: "Do you want to go to the login page?",
      okText: "Okay",

      onOk: () => {
        localStorage.removeItem("accessToken");
        localStorage.removeItem("refreshToken");
        window.location.href = "/login";
      },

      onCancel: () => {
        Modal.destroyAll();
      },

      maskClosable: false,
    });
  }

  notifyError(error);
};

export const handleErrorMessage = (error: ErrorData) => {
  notifyErrorMessage(error);
};

export default handleError;
