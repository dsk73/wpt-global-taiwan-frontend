// src/app/[locale]/contact/page.tsx

import type { Metadata } from "next";
import { notFound } from "next/navigation";

import type { Locale } from "@/providers";

import { isValidLocale } from "@/config/languages";

import {
  buildCanonical,
  buildLanguageAlternates,
  buildPageTitle,
  createMetadata,
  getOpenGraphLocale,
} from "@/lib/metadata";

/* ============================================================
   Props
============================================================ */

interface ContactPageProps {
  params: Promise<{
    locale: Locale;
  }>;
}

/* ============================================================
   SEO
============================================================ */

/**
 * SEO metadata is focused on the client's priority WPT/WPTG
 * brand terms together with contact, support and assistance
 * search intent relevant to this page.
 */
const CONTACT_SEO: Record<
  Locale,
  {
    title: string;
    description: string;
    keywords: string[];
  }
> = {
  "zh-Hant-TW": {
    title: "聯絡 WPT Global Taiwan｜WPTG 官方客服",
    description:
      "聯絡 WPT Global Taiwan｜WPTG 官方客服，取得 WPT Global 官方資訊、玩家支援與服務協助，了解 WPT Global Taiwan 相關服務。",
    keywords: [
      "WPT Global Taiwan",
      "WPTG Taiwan",
      "WPT Global",
      "WPTG",
      "WPT Global Taiwan 聯絡",
      "WPT Global 聯絡我們",
      "WPTG 聯絡",
      "WPT Global 客服",
      "WPTG 客服",
      "WPT Global 官方客服",
      "WPT Global 支援",
      "WPTG 支援",
      "WPT Global 玩家支援",
      "撲克客服",
    ],
  },

  en: {
    title: "Contact WPT Global Taiwan | WPTG Official Support",
    description:
      "Contact WPT Global Taiwan | WPTG official support for WPT Global information, player assistance and service support related to WPT Global Taiwan.",
    keywords: [
      "WPT Global Taiwan",
      "WPTG Taiwan",
      "WPT Global",
      "WPTG",
      "WPT Global Taiwan contact",
      "WPT Global contact",
      "WPTG contact",
      "WPT Global customer support",
      "WPTG customer support",
      "WPT Global official support",
      "WPT Global support",
      "WPTG support",
      "WPT Global player support",
      "poker support",
    ],
  },

  "ms-MY": {
    title: "Hubungi WPT Global Taiwan | Sokongan Rasmi WPTG",
    description:
      "Hubungi WPT Global Taiwan | sokongan rasmi WPTG untuk mendapatkan maklumat WPT Global, bantuan pemain dan sokongan perkhidmatan berkaitan WPT Global Taiwan.",
    keywords: [
      "WPT Global Taiwan",
      "WPTG Taiwan",
      "WPT Global",
      "WPTG",
      "hubungi WPT Global Taiwan",
      "hubungi WPT Global",
      "hubungi WPTG",
      "sokongan pelanggan WPT Global",
      "sokongan pelanggan WPTG",
      "sokongan rasmi WPT Global",
      "sokongan WPT Global",
      "sokongan WPTG",
      "sokongan pemain WPT Global",
      "sokongan poker",
    ],
  },
};

/* ============================================================
   Metadata
============================================================ */

export async function generateMetadata({
  params,
}: ContactPageProps): Promise<Metadata> {
  const { locale } = await params;

  if (!isValidLocale(locale)) {
    notFound();
  }

  const seo = CONTACT_SEO[locale];

  const canonical = buildCanonical(locale, "/contact");

  const languages = buildLanguageAlternates("/contact");

  return createMetadata({
    title: buildPageTitle(seo.title),

    description: seo.description,

    keywords: seo.keywords,

    canonical,

    locale: getOpenGraphLocale(locale),

    alternates: {
      canonical,
      languages,
    },
  });
}

/* ============================================================
   Page
============================================================ */

export default async function ContactPage({ params }: ContactPageProps) {
  const { locale } = await params;

  if (!isValidLocale(locale)) {
    notFound();
  }

  return <main className="min-h-screen pt-32">Contact Page</main>;
}
