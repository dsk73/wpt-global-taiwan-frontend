// src/app/[locale]/download/page.tsx

import type { Metadata } from "next";
import { notFound } from "next/navigation";

import Footer from "@/features/footer/components/Footer";

import {
  DownloadButtons,
  DownloadContent,
  DownloadHero,
  DownloadQR,
} from "@/features/download";

import { fetchDownloadPage } from "@/services";

import type { Locale } from "@/providers";

import { isValidLocale } from "@/config/languages";

import {
  buildCanonical,
  buildLanguageAlternates,
  buildPageTitle,
  buildSEOImageUrl,
  createMetadata,
  getOpenGraphLocale,
} from "@/lib/metadata";

/* ============================================================
   Props
============================================================ */

interface DownloadPageProps {
  params: Promise<{
    locale: Locale;
  }>;
}

/* ============================================================
   SEO FALLBACKS
============================================================ */

/**
 * Localized SEO fallbacks used when Strapi SEO fields are
 * empty or unavailable.
 *
 * Primary search intent:
 * - WPT Global Taiwan
 * - WPTG Taiwan
 * - WPT Global
 * - WPTG
 *
 * High-intent download searches:
 * - WPT Global Download
 * - WPTG Download
 *
 * Supporting conversion intent:
 * - WPT Global Registration
 * - WPTG Registration
 * - WPT Online
 * - WPT Online Poker
 */
const DOWNLOAD_SEO: Record<
  Locale,
  {
    title: string;
    description: string;
    keywords: string[];
  }
> = {
  "zh-Hant-TW": {
    title: "WPT Global Taiwan｜WPTG 官方下載",
    description:
      "下載 WPT Global Taiwan 官方應用程式，加入 WPTG Taiwan 線上撲克平台，探索 WPT Global 遊戲、賽事與更多玩家服務。",
    keywords: [
      "WPT Global Taiwan",
      "WPTG Taiwan",
      "WPT Global",
      "WPTG",
      "WPT Global Download",
      "WPTG Download",
      "WPT Global 下載",
      "WPTG 下載",
      "WPT Global Taiwan 下載",
      "WPT Global 官方下載",
      "WPTG 官方下載",
      "WPT Global Registration",
      "WPTG Registration",
      "WPT Online",
      "WPT Online Poker",
      "線上撲克",
      "WPT 線上撲克",
    ],
  },

  en: {
    title: "WPT Global Taiwan | WPTG Official Download",
    description:
      "Download the official WPT Global Taiwan app and join WPTG Taiwan's online poker platform to explore WPT Global games, tournaments and player services.",
    keywords: [
      "WPT Global Taiwan",
      "WPTG Taiwan",
      "WPT Global",
      "WPTG",
      "WPT Global Download",
      "WPTG Download",
      "WPT Global app download",
      "WPTG app download",
      "WPT Global Taiwan download",
      "WPT Global official download",
      "WPTG official download",
      "WPT Global Registration",
      "WPTG Registration",
      "WPT Online",
      "WPT Online Poker",
      "online poker",
      "WPT online poker",
    ],
  },

  "ms-MY": {
    title: "WPT Global Taiwan | Muat Turun Rasmi WPTG",
    description:
      "Muat turun aplikasi rasmi WPT Global Taiwan dan sertai platform poker dalam talian WPTG Taiwan untuk menikmati permainan, kejohanan dan perkhidmatan pemain WPT Global.",
    keywords: [
      "WPT Global Taiwan",
      "WPTG Taiwan",
      "WPT Global",
      "WPTG",
      "WPT Global Download",
      "WPTG Download",
      "muat turun WPT Global",
      "muat turun WPTG",
      "muat turun WPT Global Taiwan",
      "muat turun rasmi WPT Global",
      "muat turun rasmi WPTG",
      "WPT Global Registration",
      "WPTG Registration",
      "WPT Online",
      "WPT Online Poker",
      "poker online",
      "poker dalam talian WPT",
    ],
  },
};

/* ============================================================
   SEO KEYWORD PARSER
============================================================ */

/**
 * Converts Strapi's comma-separated keyword value into the
 * array format expected by Next.js Metadata.
 */
function parseKeywords(keywords?: string | null): string[] | undefined {
  if (!keywords) {
    return undefined;
  }

  const parsed = keywords
    .split(",")
    .map((keyword) => keyword.trim())
    .filter(Boolean);

  return parsed.length > 0 ? parsed : undefined;
}

/* ============================================================
   Metadata
============================================================ */

export async function generateMetadata({
  params,
}: DownloadPageProps): Promise<Metadata> {
  const { locale } = await params;

  if (!isValidLocale(locale)) {
    notFound();
  }

  const download = await fetchDownloadPage(locale);

  const fallbackSEO = DOWNLOAD_SEO[locale];

  /*
   * CMS SEO fields always take priority.
   *
   * If a value is not configured in Strapi, the localized
   * SEO fallback is used instead.
   */
  const title = download.SEO?.MetaTitle || download.Title || fallbackSEO.title;

  const description = download.SEO?.MetaDescription || fallbackSEO.description;

  const canonical =
    download.SEO?.CanonicalURL || buildCanonical(locale, "/download");

  const languages = buildLanguageAlternates("/download");

  const image = buildSEOImageUrl(download.SEO?.OGImage?.url);

  const cmsKeywords = parseKeywords(download.SEO?.Keywords);

  const keywords = cmsKeywords ?? fallbackSEO.keywords;

  return createMetadata({
    title: buildPageTitle(title),

    description,

    keywords,

    robots: download.SEO?.Robots || undefined,

    canonical,

    image,

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

export default async function DownloadPage({ params }: DownloadPageProps) {
  const { locale } = await params;

  if (!isValidLocale(locale)) {
    notFound();
  }

  const download = await fetchDownloadPage(locale);

  return (
    <>
      <main className="min-h-screen">
        <DownloadHero download={download} />

        <DownloadButtons download={download} />

        <DownloadContent download={download} />

        <DownloadQR />
      </main>

      <Footer locale={locale} />
    </>
  );
}
