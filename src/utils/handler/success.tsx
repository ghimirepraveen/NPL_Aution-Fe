import { notification, message } from "antd";

import type { SuccessData } from "../../types/interfaces";

export const handleSuccess = (data: SuccessData) => {
  if (data?.title || data?.message) {
    return notification.success({
      message: data?.title || "",
      description: data?.message || "",
    });
  }

  notification.success({
    message: "Success",
    description: "",
  });
};

export const handleSuccessMessage = (data: SuccessData) => {
  if (data?.message) {
    return message.success(data.message);
  }

  message.success("Success");
};

export default handleSuccess;
