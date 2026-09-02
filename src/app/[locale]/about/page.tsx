// src/app/[locale]/about/page.tsx

import type { Metadata } from "next";
import { notFound } from "next/navigation";

import Footer from "@/features/footer/components/Footer";

import {
  AboutGlobalSection,
  AboutHero,
  AboutIntroduction,
} from "@/features/about";

import { fetchAboutPage } from "@/services";

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
   PROPS
============================================================ */

interface AboutPageProps {
  params: Promise<{
    locale: Locale;
  }>;
}

/* ============================================================
   SEO
============================================================ */

const ABOUT_SEO: Record<
  Locale,
  {
    title: string;
    description: string;
    keywords: string[];
  }
> = {
  "zh-Hant-TW": {
    title: "關於 WPT Global Taiwan｜官方線上撲克平台",
    description:
      "了解 WPT Global Taiwan 官方線上撲克平台，探索 WPT Global 的品牌、線上撲克遊戲、撲克賽事、玩家服務與全球撲克體驗。",
    keywords: [
      "WPT Global Taiwan",
      "WPTG Taiwan",
      "WPT Global",
      "WPT Global Taiwan 官方網站",
      "WPT Global 關於我們",
      "WPT Global Taiwan 關於我們",
      "線上撲克",
      "線上撲克平台",
      "撲克遊戲",
      "撲克賽事",
      "全球撲克平台",
      "Texas Hold'em",
    ],
  },

  en: {
    title: "About WPT Global Taiwan | Official Poker Platform",
    description:
      "Learn about WPT Global Taiwan, the official online poker platform, and discover WPT Global's poker games, tournaments, player services and global poker experience.",
    keywords: [
      "WPT Global Taiwan",
      "WPTG Taiwan",
      "WPT Global",
      "WPT Global Taiwan official website",
      "about WPT Global",
      "WPT Global Taiwan about us",
      "online poker",
      "online poker platform",
      "poker games",
      "poker tournaments",
      "global poker platform",
      "Texas Hold'em",
    ],
  },

  "ms-MY": {
    title: "Tentang WPT Global Taiwan | Platform Poker Dalam Talian Rasmi",
    description:
      "Ketahui tentang WPT Global Taiwan, platform poker dalam talian rasmi, serta terokai permainan poker, kejohanan, perkhidmatan pemain dan pengalaman poker global WPT Global.",
    keywords: [
      "WPT Global Taiwan",
      "WPTG Taiwan",
      "WPT Global",
      "laman web rasmi WPT Global Taiwan",
      "tentang WPT Global",
      "WPT Global Taiwan tentang kami",
      "poker online",
      "platform poker online",
      "permainan poker",
      "kejohanan poker",
      "platform poker global",
      "Texas Hold'em",
    ],
  },
};

/* ============================================================
   METADATA
============================================================ */

/**
 * Generates locale-aware SEO metadata for the About page.
 *
 * Includes:
 * - Optimized page title
 * - Localized meta description
 * - Relevant search keywords
 * - Locale-specific canonical URL
 * - hreflang language alternates
 * - Locale-specific Open Graph metadata
 */
export async function generateMetadata({
  params,
}: AboutPageProps): Promise<Metadata> {
  const { locale } = await params;

  if (!isValidLocale(locale)) {
    notFound();
  }

  const seo = ABOUT_SEO[locale];

  const canonical = buildCanonical(locale, "/about");

  const languages = buildLanguageAlternates("/about");

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
   PAGE
============================================================ */

export default async function AboutPage({ params }: AboutPageProps) {
  const { locale } = await params;

  if (!isValidLocale(locale)) {
    notFound();
  }

  const about = await fetchAboutPage(locale);

  return (
    <>
      <main className="bg-[#07090F]">
        <AboutHero about={about} />

        <AboutIntroduction about={about} />

        <AboutGlobalSection about={about} />
      </main>

      <Footer locale={locale} />
    </>
  );
}
