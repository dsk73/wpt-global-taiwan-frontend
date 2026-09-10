// src/features/footer/components/Footer.tsx

import Image from "next/image";
import Link from "next/link";

import FooterBottom from "./FooterBottom";
import FooterColumn from "./FooterColumn";
import SocialLinks from "./SocialLinks";

import type { Locale } from "@/providers";

interface FooterProps {
  locale: Locale;
}

const DESCRIPTION: Record<Locale, string> = {
  "zh-Hant-TW": "",
  en: "",
  "ms-MY": "",
};

const GUIDES: Record<Locale, { label: string; href: string }[]> = {
  "zh-Hant-TW": [
    {
      label: "最新活動",
      href: "/zh-Hant-TW/activities",
    },
    {
      label: "撲克交流站",
      href: "/zh-Hant-TW/poker-exchange",
    },
    {
      label: "教學中心",
      href: "/zh-Hant-TW/teaching-center",
    },
    {
      label: "註冊教學",
      href: "/zh-Hant-TW/teaching-center/registration",
    },
    {
      label: "下載教學",
      href: "/zh-Hant-TW/teaching-center/download",
    },
    {
      label: "儲值教學",
      href: "/zh-Hant-TW/teaching-center/deposit",
    },
    {
      label: "出金教學",
      href: "/zh-Hant-TW/withdrawal",
    },
    {
      label: "推薦碼教學",
      href: "/zh-Hant-TW/referral-code",
    },
  ],
  en: [
    {
      label: "Activities & Promotions",
      href: "/en/activities",
    },
    {
      label: "Poker Exchange",
      href: "/en/poker-exchange",
    },
    {
      label: "Teaching Center",
      href: "/en/teaching-center",
    },
    {
      label: "Registration Guide",
      href: "/en/teaching-center/registration",
    },
    {
      label: "Download Guide",
      href: "/en/teaching-center/download",
    },
    {
      label: "Deposit Guide",
      href: "/en/teaching-center/deposit",
    },
    {
      label: "Withdrawal Guide",
      href: "/en/withdrawal",
    },
    {
      label: "Referral Code Guide",
      href: "/en/referral-code",
    },
  ],
  "ms-MY": [
    {
      label: "Aktiviti & Promosi",
      href: "/ms-MY/activities",
    },
    {
      label: "Poker Exchange",
      href: "/ms-MY/poker-exchange",
    },
    {
      label: "Pusat Pembelajaran",
      href: "/ms-MY/teaching-center",
    },
    {
      label: "Panduan Pendaftaran",
      href: "/ms-MY/teaching-center/registration",
    },
    {
      label: "Panduan Muat Turun",
      href: "/ms-MY/teaching-center/download",
    },
    {
      label: "Panduan Deposit",
      href: "/ms-MY/teaching-center/deposit",
    },
    {
      label: "Panduan Pengeluaran",
      href: "/ms-MY/withdrawal",
    },
    {
      label: "Panduan Kod Rujukan",
      href: "/ms-MY/referral-code",
    },
  ],
};

const LEGAL: Record<Locale, { label: string; href: string }[]> = {
  "zh-Hant-TW": [
    { label: "條款與條件", href: "/zh-Hant-TW/legal/terms-and-conditions" },
    { label: "隱私權政策", href: "/zh-Hant-TW/legal/privacy-policy" },
    { label: "Cookie 政策", href: "/zh-Hant-TW/legal/cookie-policy" },
    { label: "KYC 政策和程序", href: "/zh-Hant-TW/legal/kyc-policy" },
    {
      label: "客戶接受政策",
      href: "/zh-Hant-TW/legal/customer-acceptance-policy",
    },
    { label: "獎金政策", href: "/zh-Hant-TW/legal/bonus-policy" },
    {
      label: "客戶爭議解決",
      href: "/zh-Hant-TW/legal/customer-dispute-resolution",
    },
  ],
  en: [
    { label: "Terms & Conditions", href: "/en/legal/terms-and-conditions" },
    { label: "Privacy Policy", href: "/en/legal/privacy-policy" },
    { label: "Cookie Policy", href: "/en/legal/cookie-policy" },
    { label: "KYC Policies and Procedures", href: "/en/legal/kyc-policy" },
    {
      label: "Customer Acceptance Policy",
      href: "/en/legal/customer-acceptance-policy",
    },
    { label: "Bonus Policy", href: "/en/legal/bonus-policy" },
    {
      label: "Complaint Dispute Resolution",
      href: "/en/legal/customer-dispute-resolution",
    },
  ],
  "ms-MY": [
    { label: "Terma & Syarat", href: "/ms-MY/legal/terms-and-conditions" },
    { label: "Dasar Privasi", href: "/ms-MY/legal/privacy-policy" },
    { label: "Dasar Cookie", href: "/ms-MY/legal/cookie-policy" },
    { label: "Dasar & Prosedur KYC", href: "/ms-MY/legal/kyc-policy" },
    {
      label: "Dasar Penerimaan Pelanggan",
      href: "/ms-MY/legal/customer-acceptance-policy",
    },
    { label: "Dasar Bonus", href: "/ms-MY/legal/bonus-policy" },
    {
      label: "Penyelesaian Aduan",
      href: "/ms-MY/legal/customer-dispute-resolution",
    },
  ],
};

const COMMUNITY: Record<Locale, { label: string; href: string }[]> = {
  "zh-Hant-TW": [
    { label: "官方LINE", href: "https://lin.ee/ybdTE8k" },
    { label: "LINE 社群", href: "https://reurl.cc/53qANy" },
    {
      label: "官方 Instagram",
      href: "https://www.instagram.com/pokerbonus.tw/",
    },
    {
      label: "Instagram 頻道",
      href: "https://www.instagram.com/agogo_poker",
    },
    { label: "玩家交流群", href: "https://t.me/wptg_tw" },
  ],
  en: [
    { label: "Official LINE", href: "https://lin.ee/ybdTE8k" },
    { label: "LINE Community", href: "https://reurl.cc/53qANy" },
    {
      label: "Official Instagram",
      href: "https://www.instagram.com/pokerbonus.tw/",
    },
    {
      label: "Instagram Channel",
      href: "https://www.instagram.com/agogo_poker",
    },
    { label: "Player Community", href: "https://t.me/wptg_tw" },
  ],
  "ms-MY": [
    { label: "LINE Rasmi", href: "https://lin.ee/ybdTE8k" },
    { label: "Komuniti LINE", href: "https://reurl.cc/53qANy" },
    {
      label: "Instagram Rasmi",
      href: "https://www.instagram.com/pokerbonus.tw/",
    },
    {
      label: "Saluran Instagram",
      href: "https://www.instagram.com/agogo_poker",
    },
    { label: "Komuniti Pemain", href: "https://t.me/wptg_tw" },
  ],
};

const GUIDE_TITLES: Record<Locale, string> = {
  "zh-Hant-TW": "教學與指南",
  en: "Guides",
  "ms-MY": "Panduan",
};

const LEGAL_TITLES: Record<Locale, string> = {
  "zh-Hant-TW": "法律資訊",
  en: "Legal",
  "ms-MY": "Undang-undang",
};

const COMMUNITY_TITLES: Record<Locale, string> = {
  "zh-Hant-TW": "社群",
  en: "Community",
  "ms-MY": "Komuniti",
};

export default function Footer({ locale }: FooterProps) {
  return (
    <footer className="relative overflow-hidden border-t border-white/10 bg-[#060B17]">
      <div className="pointer-events-none absolute inset-0">
        <div className="absolute left-1/2 top-0 h-72 w-72 -translate-x-1/2 rounded-full bg-blue-500/10 blur-3xl" />
      </div>

      <div className="relative mx-auto max-w-7xl px-4 py-16 sm:px-6 lg:px-8 lg:py-18">
        <div
          className="
            grid grid-cols-1
            gap-10
            sm:grid-cols-2
            lg:grid-cols-4
            lg:gap-x-16
            lg:gap-y-0
          "
        >
          {/* Logo */}
          <div>
            <Link
              href={`/${locale}`}
              className="inline-flex items-center"
              aria-label="WPT Global Taiwan"
            >
              <Image
                src="/images/logo.png"
                alt="WPT Global Taiwan"
                width={180}
                height={60}
                className="h-auto w-45"
              />
            </Link>

            {DESCRIPTION[locale] && (
              <p className="mt-5 max-w-xs text-sm leading-6 text-white/60">
                {DESCRIPTION[locale]}
              </p>
            )}
          </div>

          {/* Guides / Internal Links */}
          <div className="self-start">
            <FooterColumn title={GUIDE_TITLES[locale]} items={GUIDES[locale]} />
          </div>

          {/* Legal Links */}
          <div className="self-start">
            <FooterColumn title={LEGAL_TITLES[locale]} items={LEGAL[locale]} />
          </div>

          {/* Community Links */}
          <div className="self-start">
            <SocialLinks
              title={COMMUNITY_TITLES[locale]}
              links={COMMUNITY[locale]}
            />
          </div>
        </div>

        <FooterBottom locale={locale} />
      </div>
    </footer>
  );
}
