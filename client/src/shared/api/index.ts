import axios, { type InternalAxiosRequestConfig } from "axios";
import {
  getStorageItem,
  removeStorageItem,
} from "@shared/utils/local-storage.ts";
import { storageKey } from "@shared/constants/local-storage.ts";
import { routePath } from "@shared/constants/route.ts";

const mainApiInstance = axios.create({
  baseURL: import.meta.env.VITE_API_BASE_URL,
  withCredentials: true,
});

const setAuthorizationHeader = (config: InternalAxiosRequestConfig) => {
  const authData = getStorageItem(storageKey.ACCESS_TOKEN);
  const accessToken = authData?.token;
  if (accessToken) {
    config.headers.Authorization = `Bearer ${accessToken}`;
  }

  return config;
};

mainApiInstance.interceptors.request.use(
  (config) => setAuthorizationHeader(config),
  (error) => Promise.reject(error),
);

mainApiInstance.interceptors.response.use(
  (response) => response,
  (error) => {
    if (error.response && error.response.status === 401) {
      const isLoginPage = window.location.href.includes(routePath.getLogin());
      removeStorageItem(storageKey.ACCESS_TOKEN);

      if (!isLoginPage) window.location.href = routePath.getLogin();
    }

    return Promise.reject(error?.response?.data);
  },
);

export default mainApiInstance;
