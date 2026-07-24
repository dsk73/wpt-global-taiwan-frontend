import type { Locale } from "@/providers";
import type { FooterColumnItem } from "../components/FooterColumn";
import type { SocialLink } from "../components/SocialLinks";

interface FooterContent {
  description: string;
  navigationTitle: string;
  legalTitle: string;
  socialTitle: string;
  navigation: FooterColumnItem[];
  legal: FooterColumnItem[];
  social: SocialLink[];
}

export function useFooter(locale: Locale): FooterContent {
  switch (locale) {
    case "zh-Hant-TW":
      return {
        description:
          "WPT Global Taiwan 是您的官方德州撲克平台，提供最新賽事、活動、教學以及玩家專屬優惠。",

        navigationTitle: "快速連結",

        legalTitle: "法律資訊",

        socialTitle: "社群媒體",

        navigation: [
          {
            label: "首頁",
            href: "/",
          },
          {
            label: "活動",
            href: "#activities",
          },
          {
            label: "下載",
            href: "#download",
          },
          {
            label: "FAQ",
            href: "#faq",
          },
          {
            label: "聯絡我們",
            href: "#contact",
          },
        ],

        legal: [
          {
            label: "使用條款",
            href: "#",
          },
          {
            label: "隱私政策",
            href: "#",
          },
          {
            label: "Cookies 政策",
            href: "#",
          },
          {
            label: "責任遊戲",
            href: "#",
          },
        ],

        social: [
          {
            label: "Telegram",
            href: "https://t.me/",
          },
          {
            label: "Facebook",
            href: "https://facebook.com/",
          },
          {
            label: "Instagram",
            href: "https://instagram.com/",
          },
          {
            label: "YouTube",
            href: "https://youtube.com/",
          },
        ],
      };

    case "ms-MY":
      return {
        description:
          "WPT Global Taiwan ialah destinasi rasmi anda untuk kejohanan, promosi, pembelajaran poker dan ganjaran eksklusif.",

        navigationTitle: "Navigasi",

        legalTitle: "Perundangan",

        socialTitle: "Media Sosial",

        navigation: [
          {
            label: "Laman Utama",
            href: "/",
          },
          {
            label: "Aktiviti",
            href: "#activities",
          },
          {
            label: "Muat Turun",
            href: "#download",
          },
          {
            label: "FAQ",
            href: "#faq",
          },
          {
            label: "Hubungi",
            href: "#contact",
          },
        ],

        legal: [
          {
            label: "Terma & Syarat",
            href: "#",
          },
          {
            label: "Dasar Privasi",
            href: "#",
          },
          {
            label: "Dasar Cookies",
            href: "#",
          },
          {
            label: "Permainan Bertanggungjawab",
            href: "#",
          },
        ],

        social: [
          {
            label: "Telegram",
            href: "https://t.me/",
          },
          {
            label: "Facebook",
            href: "https://facebook.com/",
          },
          {
            label: "Instagram",
            href: "https://instagram.com/",
          },
          {
            label: "YouTube",
            href: "https://youtube.com/",
          },
        ],
      };

    case "en":
    default:
      return {
        description:
          "WPT Global Taiwan is your official destination for tournaments, promotions, poker education and exclusive player benefits.",

        navigationTitle: "Navigation",

        legalTitle: "Legal",

        socialTitle: "Social Media",

        navigation: [
          {
            label: "Home",
            href: "/",
          },
          {
            label: "Activities",
            href: "#activities",
          },
          {
            label: "Download",
            href: "#download",
          },
          {
            label: "FAQ",
            href: "#faq",
          },
          {
            label: "Contact",
            href: "#contact",
          },
        ],

        legal: [
          {
            label: "Terms & Conditions",
            href: "#",
          },
          {
            label: "Privacy Policy",
            href: "#",
          },
          {
            label: "Cookies Policy",
            href: "#",
          },
          {
            label: "Responsible Gaming",
            href: "#",
          },
        ],

        social: [
          {
            label: "Telegram",
            href: "https://t.me/",
          },
          {
            label: "Facebook",
            href: "https://facebook.com/",
          },
          {
            label: "Instagram",
            href: "https://instagram.com/",
          },
          {
            label: "YouTube",
            href: "https://youtube.com/",
          },
        ],
      };
  }
}