import axiosInstance from "../axiosInstance";

export default function mutator(method: string, url: string, data?: unknown) {
  return axiosInstance({
    method,
    url,
    data,
  }).then((res) => {
    return res.data;
  });
}
