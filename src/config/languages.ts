import type { Locale } from "@/providers";

export interface Language {
  code: Locale;
  name: string;
  nativeName: string;
  shortName: string;
  flag: string;
}

export const DEFAULT_LOCALE: Locale = "zh-Hant-TW";

export const SUPPORTED_LOCALES: readonly Locale[] = [
  "zh-Hant-TW",
  "en",
  "ms-MY",
] as const;

export const LANGUAGES: Language[] = [
  {
    code: "zh-Hant-TW",
    name: "Traditional Chinese",
    nativeName: "繁體中文",
    shortName: "TW",
    flag: "🇹🇼",
  },
  {
    code: "en",
    name: "English",
    nativeName: "English",
    shortName: "EN",
    flag: "🇺🇸",
  },
  {
    code: "ms-MY",
    name: "Malay",
    nativeName: "Bahasa Melayu",
    shortName: "MS",
    flag: "🇲🇾",
  },
];

export function isValidLocale(locale: string): locale is Locale {
  return SUPPORTED_LOCALES.includes(locale as Locale);
}

export function getLanguage(locale: Locale): Language {
  return (
    LANGUAGES.find((language) => language.code === locale) ??
    LANGUAGES[0]
  );
}