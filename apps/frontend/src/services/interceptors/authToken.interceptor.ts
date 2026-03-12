import type { InternalAxiosRequestConfig } from "axios";
import { store } from "../../app/store";

export const authTokenInterceptor = (config: InternalAxiosRequestConfig) => {
  let token = store.getState().auth.access_token

  if (token) {
    config.headers.Authorization = `Bearer ${token}`;
  }

  return config;
}