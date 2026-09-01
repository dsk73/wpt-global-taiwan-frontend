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

const CONTACT_SEO: Record<
  Locale,
  {
    title: string;
    description: string;
    keywords: string[];
  }
> = {
  "zh-Hant-TW": {
    title: "聯絡我們",
    description:
      "聯絡 WPT Global Taiwan，取得官方資訊與玩家支援，了解更多 WPT Global Taiwan 相關服務。",
    keywords: [
      "WPT Global Taiwan",
      "WPT Global 聯絡我們",
      "WPT Global 客服",
      "WPTG 聯絡",
      "撲克客服",
      "WPT Global 支援",
    ],
  },

  en: {
    title: "Contact Us",
    description:
      "Contact WPT Global Taiwan for official information, player support and assistance with WPT Global Taiwan services.",
    keywords: [
      "WPT Global Taiwan",
      "WPT Global contact",
      "WPT Global customer support",
      "WPTG contact",
      "poker support",
      "WPT Global support",
    ],
  },

  "ms-MY": {
    title: "Hubungi Kami",
    description:
      "Hubungi WPT Global Taiwan untuk mendapatkan maklumat rasmi, sokongan pemain dan bantuan berkaitan perkhidmatan WPT Global Taiwan.",
    keywords: [
      "WPT Global Taiwan",
      "hubungi WPT Global",
      "sokongan pelanggan WPT Global",
      "hubungi WPTG",
      "sokongan poker",
      "sokongan WPT Global",
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
