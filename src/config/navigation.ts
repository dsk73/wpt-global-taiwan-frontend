import { HeaderAction, NavigationItem } from "@/types/navigation";

export const NAVIGATION: NavigationItem[] = [
  {
    label: {
      "zh-Hant-TW": "最新活動",
      en: "Activities",
      "ms-MY": "Aktiviti",
    },
    href: "/activities",
  },
  {
    label: {
      "zh-Hant-TW": "撲克交流站",
      en: "Poker Exchange",
      "ms-MY": "Komuniti Poker",
    },
    href: "/poker-exchange",
  },
  {
    label: {
      "zh-Hant-TW": "教學中心",
      en: "Learning Center",
      "ms-MY": "Pusat Pembelajaran",
    },
    href: "/teaching-center",
  },
  {
    label: {
      "zh-Hant-TW": "關於我們",
      en: "About",
      "ms-MY": "Tentang Kami",
    },
    href: "/about",
  },

  {
  href: "/community",
  label: {
    "zh-Hant-TW": "社群",
    en: "Community",
    "ms-MY": "Komuniti",
  },
},
];

export const HEADER_ACTIONS: HeaderAction[] = [
  {
    label: {
      "zh-Hant-TW": "立即註冊",
      en: "Register",
      "ms-MY": "Daftar",
    },
    href: "/register",
    variant: "secondary",
  },
  {
    label: {
      "zh-Hant-TW": "立即下載",
      en: "Download",
      "ms-MY": "Muat Turun",
    },
    href: "/download",
    variant: "primary",
  },
];

export const TOPBAR_LINKS: NavigationItem[] = [
  {
    label: {
      "zh-Hant-TW": "常見問題",
      en: "FAQ",
      "ms-MY": "FAQ",
    },
    href: "/faq",
  },
  {
    label: {
      "zh-Hant-TW": "合作洽談",
      en: "Contact",
      "ms-MY": "Hubungi Kami",
    },
    href: "/partnership",
  },
];

export const LANGUAGES = [
  {
    code: "zh-Hant-TW",
    short: "繁中",
    name: "繁體中文",
  },
  {
    code: "en",
    short: "EN",
    name: "English",
  },
  {
    code: "ms-MY",
    short: "BM",
    name: "Bahasa Melayu",
  },
] as const;