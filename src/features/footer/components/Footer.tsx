//src/features/footer/components/Footer.tsx

"use client";

import Image from "next/image";
import Link from "next/link";
import { motion } from "framer-motion";

import FooterBottom from "./FooterBottom";
import FooterColumn from "./FooterColumn";
import SocialLinks from "./SocialLinks";

import type { Locale } from "@/providers";

interface FooterProps {
  locale: Locale;
}

const DESCRIPTION: Record<Locale, string> = {
  "zh-Hant-TW":
    "WPT Global Taiwan 是您的官方德州撲克平台，提供最新賽事、活動、教學以及玩家專屬優惠。",
  en: "WPT Global Taiwan is your official destination for tournaments, promotions, poker education and exclusive player benefits.",
  "ms-MY":
    "WPT Global Taiwan ialah destinasi rasmi anda untuk kejohanan, promosi, pembelajaran poker dan ganjaran eksklusif.",
};

const NAVIGATION: Record<Locale, { label: string; href: string }[]> = {
  "zh-Hant-TW": [
    { label: "首頁", href: "/" },
    { label: "活動", href: "#activities" },
    { label: "下載", href: "#download" },
    { label: "FAQ", href: "#faq" },
    { label: "聯絡我們", href: "#contact" },
  ],
  en: [
    { label: "Home", href: "/" },
    { label: "Activities", href: "#activities" },
    { label: "Download", href: "#download" },
    { label: "FAQ", href: "#faq" },
    { label: "Contact", href: "#contact" },
  ],
  "ms-MY": [
    { label: "Laman Utama", href: "/" },
    { label: "Aktiviti", href: "#activities" },
    { label: "Muat Turun", href: "#download" },
    { label: "FAQ", href: "#faq" },
    { label: "Hubungi", href: "#contact" },
  ],
};

const LEGAL: Record<Locale, { label: string; href: string }[]> = {
  "zh-Hant-TW": [
    { label: "使用條款", href: "#" },
    { label: "隱私政策", href: "#" },
    { label: "Cookies 政策", href: "#" },
    { label: "責任遊戲", href: "#" },
  ],
  en: [
    { label: "Terms & Conditions", href: "#" },
    { label: "Privacy Policy", href: "#" },
    { label: "Cookies Policy", href: "#" },
    { label: "Responsible Gaming", href: "#" },
  ],
  "ms-MY": [
    { label: "Terma & Syarat", href: "#" },
    { label: "Dasar Privasi", href: "#" },
    { label: "Dasar Cookies", href: "#" },
    { label: "Permainan Bertanggungjawab", href: "#" },
  ],
};

const SOCIAL = [
  {
    label: "Official LINE",
    href: "https://lin.ee/ybdTE8k",
    icon: "line" as const,
  },
  {
    label: "Official LINE Community",
    href: "https://reurl.cc/53qANy",
    icon: "line" as const,
  },
  {
    label: "Telegram",
    href: "https://t.me/wptg_tw",
    icon: "telegram" as const,
  },
  {
    label: "Official Instagram",
    href: "https://www.instagram.com/wptglobal_kol",
    icon: "Official Instagram" as const,
  },
  {
    label: "Instagram Channel",
    href: "https://www.instagram.com/agogo_poker",
    icon: "instagram" as const,
  },
];

const TITLES: Record<
  Locale,
  {
    navigation: string;
    legal: string;
    social: string;
  }
> = {
  "zh-Hant-TW": {
    navigation: "快速連結",
    legal: "法律資訊",
    social: "社群媒體",
  },
  en: {
    navigation: "Navigation",
    legal: "Legal",
    social: "Social Media",
  },
  "ms-MY": {
    navigation: "Navigasi",
    legal: "Perundangan",
    social: "Media Sosial",
  },
};

export default function Footer({ locale }: FooterProps) {
  return (
    <footer className="relative overflow-hidden border-t border-white/10 bg-[#060B17]">
      {/* Background Glow */}
      <div className="pointer-events-none absolute inset-0">
        <div className="absolute left-1/2 top-0 h-72 w-72 -translate-x-1/2 rounded-full bg-blue-500/10 blur-3xl" />
      </div>

      <div className="relative mx-auto max-w-7xl px-4 py-20 sm:px-6 lg:px-8">
        <div className="grid grid-cols-2 gap-12 lg:grid-cols-4">
          {/* Logo */}
          <motion.div
            initial={{ opacity: 0, y: 24 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.45 }}
            className="col-span-2 lg:col-span-1"
          >
            <Link href="/">
              <Image
                src="/logos/wpt-logo.png"
                alt="WPT Global Taiwan"
                width={180}
                height={55}
                priority
                className="h-auto w-auto"
              />
            </Link>

            <p className="mt-6 max-w-xs leading-7 text-white/60">
              {DESCRIPTION[locale]}
            </p>
          </motion.div>

          {/* Navigation */}
          <FooterColumn
            title={TITLES[locale].navigation}
            items={NAVIGATION[locale]}
          />

          {/* Legal */}
          <FooterColumn title={TITLES[locale].legal} items={LEGAL[locale]} />

          {/* Social */}
          <SocialLinks title={TITLES[locale].social} links={SOCIAL} />
        </div>

        <FooterBottom locale={locale} />
      </div>
    </footer>
  );
}
