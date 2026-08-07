import { AxiosRequestConfig } from "axios";

import { axiosClient } from "./axios";
import {
  normalizeCollection,
  normalizeSingle,
  StrapiCollectionResponse,
  StrapiResponse,
} from "./response";

export class APIError extends Error {
  public status?: number;
  public details?: unknown;

  constructor(message: string, status?: number, details?: unknown) {
    super(message);

    this.name = "APIError";
    this.status = status;
    this.details = details;
  }
}
function handleError(error: unknown): never {
  if (typeof error === "object" && error !== null && "response" in error) {
    const axiosError = error as {
      response?: {
        status: number;
        data?: {
          error?: {
            message?: string;
            details?: unknown;
          };
        };
      };
    };

    throw new APIError(
      axiosError.response?.data?.error?.message ?? "Something went wrong.",
      axiosError.response?.status,
      axiosError.response?.data?.error?.details,
    );
  }

  if (error instanceof Error) {
    throw new APIError(error.message);
  }

  throw new APIError("Unexpected error occurred.");
}

export const fetcher = {
  async getSingle<T>(url: string, config?: AxiosRequestConfig): Promise<T> {
    try {
      const response = await axiosClient.get<StrapiResponse<T>>(url, config);

      return normalizeSingle(response.data);
    } catch (error) {
      handleError(error);
    }
  },

  async getCollection<T>(
    url: string,
    config?: AxiosRequestConfig,
  ): Promise<T[]> {
    try {
      const response = await axiosClient.get<StrapiCollectionResponse<T>>(
        url,
        config,
      );

      return normalizeCollection(response.data);
    } catch (error) {
      handleError(error);
    }
  },

  async post<T, D = unknown>(
    url: string,
    data: D,
    config?: AxiosRequestConfig,
  ): Promise<T> {
    try {
      const response = await axiosClient.post<StrapiResponse<T>>(
        url,
        data,
        config,
      );

      return normalizeSingle(response.data);
    } catch (error) {
      handleError(error);
    }
  },

  async put<T, D = unknown>(
    url: string,
    data: D,
    config?: AxiosRequestConfig,
  ): Promise<T> {
    try {
      const response = await axiosClient.put<StrapiResponse<T>>(
        url,
        data,
        config,
      );

      return normalizeSingle(response.data);
    } catch (error) {
      handleError(error);
    }
  },

  async patch<T, D = unknown>(
    url: string,
    data: D,
    config?: AxiosRequestConfig,
  ): Promise<T> {
    try {
      const response = await axiosClient.patch<StrapiResponse<T>>(
        url,
        data,
        config,
      );

      return normalizeSingle(response.data);
    } catch (error) {
      handleError(error);
    }
  },

  async delete<T>(url: string, config?: AxiosRequestConfig): Promise<T> {
    try {
      const response = await axiosClient.delete<StrapiResponse<T>>(url, config);

      return normalizeSingle(response.data);
    } catch (error) {
      handleError(error);
    }
  },
};

export default fetcher;
