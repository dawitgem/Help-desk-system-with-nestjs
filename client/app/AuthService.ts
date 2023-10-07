import Cookies from "js-cookie";

export const setAccessToken = (AccessToken: string) => {
  Cookies.set("access_token", AccessToken, { expires: 1, secure: true });
};
export const getAccessToken = () => {
  return Cookies.get("access_token");
};

export const removeAccessToken = () => {
  Cookies.remove("access_token");
};
