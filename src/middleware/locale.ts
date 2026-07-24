import { DEFAULT_LOCALE, SUPPORTED_LOCALES } from "@/config/languages";
import type { Locale } from "@/providers";

/**
 * Returns true if the locale is supported.
 */
export function isLocale(locale: string): locale is Locale {
  return SUPPORTED_LOCALES.includes(locale as Locale);
}

/**
 * Returns a valid locale.
 * Falls back to DEFAULT_LOCALE when invalid.
 */
export function resolveLocale(locale?: string | null): Locale {
  if (!locale) {
    return DEFAULT_LOCALE;
  }

  return isLocale(locale) ? locale : DEFAULT_LOCALE;
}

/**
 * Returns browser locale if supported.
 */
export function getBrowserLocale(): Locale {
  if (typeof navigator === "undefined") {
    return DEFAULT_LOCALE;
  }

  const language = navigator.language;

  if (language.startsWith("zh")) {
    return "zh-Hant-TW";
  }

  if (language.startsWith("ms")) {
    return "ms-MY";
  }

  if (language.startsWith("en")) {
    return "en";
  }

  return DEFAULT_LOCALE;
}

/**
 * Returns locale from cookie.
 */
export function getLocaleFromCookie(cookie?: string | null): Locale {
  if (!cookie) {
    return DEFAULT_LOCALE;
  }

  return resolveLocale(cookie);
}