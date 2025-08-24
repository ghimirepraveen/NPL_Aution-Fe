export const getAccessToken = () => {
  const accessToken = localStorage.getItem("accessToken");
  return accessToken || "";
};

export const setAccessToken = (accessToken: string) => {
  if (accessToken) {
    localStorage.setItem("accessToken", accessToken);
  }
};

export const removeAccessToken = () => {
  localStorage.removeItem("accessToken");
};

export const getRefreshToken = () => {
  const refreshToken = localStorage.getItem("refreshToken");
  return refreshToken || "";
};

export const setRefreshToken = (refreshToken: string) => {
  if (refreshToken) {
    localStorage.setItem("refreshToken", refreshToken);
  }
};

export const removeRefreshToken = () => {
  localStorage.removeItem("refreshToken");
};
