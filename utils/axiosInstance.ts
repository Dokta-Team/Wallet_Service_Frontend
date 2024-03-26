import axios, { AxiosInstance } from "axios";
import { getCookie } from "@/utils/cookieData";
import { TOKEN_NAME } from "@/config/config";
const URL =
  process.env.NODE_ENV === "development"
    ? process.env.NEXT_PUBLIC_LOCAL_BASE_URL
    : process.env.NEXT_PUBLIC_LIVE_BASE_URL;
export const host = `${URL}/api`;
// Create an axios instance
export const useAxios: AxiosInstance = axios.create({
  baseURL: host,
  headers: {
    Accept: "application/json",
  },
});
export const useAxiosFormData = axios.create({
  baseURL: host,
  headers: {
    "Content-Type": "multipart/form-data",
    Accept: "application/json",
  },
});
export async function setToken(token?: any) {
  token = !token ? getCookie(TOKEN_NAME) : token;
  if (token) {
    useAxios.defaults.headers.common["Authorization"] = `Bearer ${token}`;
  } else {
    delete useAxios.defaults.headers.common["Authorization"];
  }
}
