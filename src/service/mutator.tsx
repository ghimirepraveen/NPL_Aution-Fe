import axiosInstance from "../axiosInstance";

export default function mutator(method: string, url: string, data?: unknown) {
  console.log("Mutator called with:", { method, url, data });
  return axiosInstance({
    method,
    url,
    data,
  }).then((res) => {
    console.log("Mutator response:", res);
    return res.data;
  });
}
