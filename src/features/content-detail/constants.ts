import type { Locale } from "@/providers";

export const DEFAULT_BANNER_IMAGE = "/images/placeholder.jpg";

export const DEFAULT_GALLERY_TITLE: Record<Locale, string> = {
  "zh-Hant-TW": "圖片集",
  en: "Gallery",
  "ms-MY": "Galeri",
};

export const DEFAULT_GALLERY_SUBTITLE: Record<Locale, string> = {
  "zh-Hant-TW": "精彩內容",
  en: "Explore the highlights",
  "ms-MY": "Terokai sorotan",
};

export const DEFAULT_RELATED_SECTION: Record<
  Locale,
  {
    eyebrow: string;
    title: string;
    subtitle: string;
  }
> = {
  "zh-Hant-TW": {
    eyebrow: "WPT GLOBAL",
    title: "您可能也喜歡",
    subtitle: "探索更多精彩內容。",
  },

  en: {
    eyebrow: "WPT GLOBAL",
    title: "You May Also Like",
    subtitle: "Explore more content you might be interested in.",
  },

  "ms-MY": {
    eyebrow: "WPT GLOBAL",
    title: "Anda Mungkin Juga Suka",
    subtitle: "Terokai lebih banyak kandungan yang mungkin menarik minat anda.",
  },
};

export const DEFAULT_ANIMATION_DURATION = 0.45;

export const STAGGER_DELAY = 0.08;

export const HERO_OVERLAY_CLASSES =
  "absolute inset-0 bg-black/60";

export const HERO_GRADIENT_CLASSES =
  "absolute inset-0 bg-linear-to-t from-[#070B15] via-[#070B15]/35 to-transparent";