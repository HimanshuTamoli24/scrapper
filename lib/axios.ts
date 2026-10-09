import axios from "axios";
import env from "./env";

export const axiosInstance = axios.create({
  baseURL: env.NEXT_PUBLIC_APP_URL + "/api",
});
