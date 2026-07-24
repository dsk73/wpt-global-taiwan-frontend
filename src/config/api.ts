/**
 * ------------------------------------------------------------
 * Application API Configuration
 * ------------------------------------------------------------
 */

import type { Locale } from "@/providers";
import { DEFAULT_LOCALE } from "./languages";

export const API_CONFIG = {
  APP_NAME:
    process.env.NEXT_PUBLIC_APP_NAME ?? "WPT Global Taiwan",

  APP_URL:
    process.env.NEXT_PUBLIC_APP_URL ??
    "http://localhost:3001",

  DEFAULT_LOCALE:
    (process.env.NEXT_PUBLIC_DEFAULT_LOCALE as Locale) ??
    DEFAULT_LOCALE,

  STRAPI_URL:
    process.env.NEXT_PUBLIC_STRAPI_URL ??
    "http://localhost:1338",

  STRAPI_API_URL:
    process.env.NEXT_PUBLIC_STRAPI_API_URL ??
    "http://localhost:1338/api",

  REQUEST_TIMEOUT: 30000,
} as const;

/**
 * ------------------------------------------------------------
 * Helpers
 * ------------------------------------------------------------
 */

export function getAPIURL(path = ""): string {
  return `${API_CONFIG.STRAPI_API_URL}${path}`;
}

export function getMediaURL(
  url?: string | null
): string {
  if (!url) {
    return "";
  }

  if (
    url.startsWith("http://") ||
    url.startsWith("https://")
  ) {
    return url;
  }

  return `${API_CONFIG.STRAPI_URL}${url}`;
}

/**
 * ------------------------------------------------------------
 * Locale Helpers
 * ------------------------------------------------------------
 */

export function getDefaultLocale(): Locale {
  return API_CONFIG.DEFAULT_LOCALE;
}

export function getLocaleQuery(locale: Locale): string {
  return `locale=${encodeURIComponent(locale)}`;
}

export default API_CONFIG;