import axiosInstance from "../axiosInstance";

export default function fetcher(url: string) {
  return axiosInstance.get(url).then((res) => res.data);
}
