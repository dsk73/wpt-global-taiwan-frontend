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
  "zh-Hant-TW": "",
  en: "",
  "ms-MY": "",
};

const LEGAL: Record<Locale, { label: string; href: string }[]> = {
  "zh-Hant-TW": [
    { label: "條款與條件", href: "#" },
    { label: "隱私權政策", href: "#" },
    { label: "Cookie 政策", href: "#" },
    { label: "KYC 政策和程序", href: "#" },
    { label: "客戶接受政策", href: "#" },
    { label: "獎金政策", href: "#" },
    { label: "客戶爭議解決", href: "#" },
  ],
  en: [
    { label: "Terms & Conditions", href: "#" },
    { label: "Privacy Policy", href: "#" },
    { label: "Cookie Policy", href: "#" },
    { label: "KYC Policies and Procedures", href: "#" },
    { label: "Customer Acceptance Policy", href: "#" },
    { label: "Bonus Policy", href: "#" },
    { label: "Complaint Dispute Resolution", href: "#" },
  ],
  "ms-MY": [
    { label: "Terma & Syarat", href: "#" },
    { label: "Dasar Privasi", href: "#" },
    { label: "Dasar Cookie", href: "#" },
    { label: "Dasar & Prosedur KYC", href: "#" },
    { label: "Dasar Penerimaan Pelanggan", href: "#" },
    { label: "Dasar Bonus", href: "#" },
    { label: "Penyelesaian Aduan", href: "#" },
  ],
};

const COMMUNITY: Record<Locale, { label: string; href: string }[]> = {
  "zh-Hant-TW": [
    {
      label: "官方LINE",
      href: "https://lin.ee/ybdTE8k",
    },
    {
      label: "LINE 社群",
      href: "https://reurl.cc/53qANy",
    },
    {
      label: "官方 Instagram",
      href: "https://www.instagram.com/pokerbonus.tw/",
    },
    {
      label: "Instagram 頻道",
      href: "https://www.instagram.com/agogo_poker",
    },
    {
      label: "玩家交流群",
      href: "https://t.me/wptg_tw",
    },
  ],

  en: [
    {
      label: "Official LINE",
      href: "https://lin.ee/ybdTE8k",
    },
    {
      label: "LINE Community",
      href: "https://reurl.cc/53qANy",
    },
    {
      label: "Official Instagram",
      href: "https://www.instagram.com/pokerbonus.tw/",
    },
    {
      label: "Instagram Channel",
      href: "https://www.instagram.com/agogo_poker",
    },
    {
      label: "Player Community",
      href: "https://t.me/wptg_tw",
    },
  ],

  "ms-MY": [
    {
      label: "LINE Rasmi",
      href: "https://lin.ee/ybdTE8k",
    },
    {
      label: "Komuniti LINE",
      href: "https://reurl.cc/53qANy",
    },
    {
      label: "Instagram Rasmi",
      href: "https://www.instagram.com/pokerbonus.tw/",
    },
    {
      label: "Saluran Instagram",
      href: "https://www.instagram.com/agogo_poker",
    },
    {
      label: "Komuniti Pemain",
      href: "https://t.me/wptg_tw",
    },
  ],
};


export default function Footer({ locale }: FooterProps) {
  return (
    <footer className="relative overflow-hidden border-t border-white/10 bg-[#060B17]">
      {/* Background Glow */}
      <div className="pointer-events-none absolute inset-0">
        <div className="absolute left-1/2 top-0 h-72 w-72 -translate-x-1/2 rounded-full bg-blue-500/10 blur-3xl" />
      </div>

      <div className="relative mx-auto max-w-7xl px-4 py-20 sm:px-6 lg:px-8">
        <div className="grid grid-cols-1 gap-12 md:grid-cols-2 lg:grid-cols-3">
          {/* Logo */}
          <motion.div
            initial={{ opacity: 0, y: 24 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.45 }}
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

            {DESCRIPTION[locale] && (
              <p className="mt-6 max-w-xs leading-7 text-white/60">
                {DESCRIPTION[locale]}
              </p>
            )}
          </motion.div>

          {/* Legal */}
          <FooterColumn title="" items={LEGAL[locale]} />
          {/* Community */}
          <SocialLinks
            title="" links={COMMUNITY[locale]}
          />
        </div>

        <FooterBottom locale={locale} />
      </div>
    </footer>
  );
}
