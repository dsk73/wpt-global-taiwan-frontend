import axios, {
  AxiosError,
  AxiosInstance,
  AxiosResponse,
  InternalAxiosRequestConfig,
} from "axios";

import { API_CONFIG } from "@/config";

export const axiosClient: AxiosInstance = axios.create({
  baseURL: API_CONFIG.STRAPI_API_URL,
  timeout: API_CONFIG.REQUEST_TIMEOUT,
  headers: {
    "Content-Type": "application/json",
  },
});

/**
 * ------------------------------------------------------------
 * Request Interceptor
 * ------------------------------------------------------------
 */

axiosClient.interceptors.request.use(
  (config: InternalAxiosRequestConfig) => {
    const token = process.env.STRAPI_API_TOKEN;

    if (token) {
      config.headers.Authorization = `Bearer ${token}`;
    }

    return config;
  },
  (error: AxiosError) => Promise.reject(error)
);

/**
 * ------------------------------------------------------------
 * Response Interceptor
 * ------------------------------------------------------------
 */

axiosClient.interceptors.response.use(
  (response: AxiosResponse) => response,
  (error: AxiosError) => {
    if (error.code === "ECONNABORTED") {
      return Promise.reject(
        new Error("Request timeout. Please try again.")
      );
    }

    if (!error.response) {
      return Promise.reject(
        new Error(
          "Unable to connect to the server. Please check your network."
        )
      );
    }

    return Promise.reject(error);
  }
);

export default axiosClient;