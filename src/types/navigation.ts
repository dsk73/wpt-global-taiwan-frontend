export type Locale = "zh-Hant-TW" | "en" | "ms-MY";

export interface NavigationItem {
  label: {
    "zh-Hant-TW": string;
    en: string;
    "ms-MY": string;
  };

  href: string;
}

export interface HeaderAction {
  label: {
    "zh-Hant-TW": string;
    en: string;
    "ms-MY": string;
  };

  href: string;

  variant: "primary" | "secondary";
}