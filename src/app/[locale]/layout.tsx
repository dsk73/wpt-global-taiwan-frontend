// src/app/[locale]/layout.tsx

import type { Metadata } from "next";
import { notFound } from "next/navigation";

import Header from "@/features/header/components/Header";

import { isValidLocale } from "@/config/languages";

import { LocaleProvider, type Locale } from "@/providers";

import {
  buildCanonical,
  buildLanguageAlternates,
  createMetadata,
  getOpenGraphLocale,
} from "@/lib/metadata";

/* ============================================================
   PROPS
============================================================ */

interface LocaleLayoutProps {
  children: React.ReactNode;

  params: Promise<{
    locale: string;
  }>;
}

/* ============================================================
   LOCALE SEO
============================================================ */

/**
 * Locale-level fallback SEO metadata.
 *
 * These values are used only when an individual page does not
 * provide its own generateMetadata() implementation.
 *
 * Page-level metadata should take precedence wherever available.
 */
const LOCALE_SEO: Record<
  Locale,
  {
    title: string;
    description: string;
    keywords: string[];
  }
> = {
  "zh-Hant-TW": {
    title: "WPT Global Taiwan｜WPTG 官方網站",

    description:
      "WPT Global Taiwan 官方網站，提供 WPTG 註冊、下載、儲值教學、線上撲克、德州撲克、最新優惠、教學資源與活動資訊。",

    keywords: [
      "WPT",
      "WPTG",
      "WPT Global",
      "WPT Global Taiwan",
      "WPTG Taiwan",
      "WPT Global Registration",
      "WPTG Registration",
      "WPT Global Download",
      "WPTG Download",
      "WPT Global deposit",
      "WPTG stored value",
      "WPT Global Stored Value",
      "WPT Global Offers",
      "WPT Global Teaching",
      "WPTG Teaching",
      "WPT Texas Hold'em",
      "WPT Online Poker",
      "WPT Online",
    ],
  },

  en: {
    title: "WPT Global Taiwan | WPTG Official Portal",

    description:
      "Official WPT Global Taiwan portal for WPTG registration, download, deposit and top-up tutorials, online poker, Texas Hold'em, latest offers, teaching resources and activities.",

    keywords: [
      "WPT",
      "WPTG",
      "WPT Global",
      "WPT Global Taiwan",
      "WPTG Taiwan",
      "WPT Global Registration",
      "WPTG Registration",
      "WPT Global Download",
      "WPTG Download",
      "WPT Global deposit",
      "WPTG stored value",
      "WPT Global Stored Value",
      "WPT Global Offers",
      "WPT Global Teaching",
      "WPTG Teaching",
      "WPT Texas Hold'em",
      "WPT Online Poker",
      "WPT Online",
    ],
  },

  "ms-MY": {
    title: "WPT Global Taiwan | Portal Rasmi WPTG",

    description:
      "Portal rasmi WPT Global Taiwan untuk pendaftaran WPTG, muat turun, tutorial tambah nilai dan deposit, poker dalam talian, Texas Hold'em, tawaran terkini, panduan pembelajaran dan aktiviti.",

    keywords: [
      "WPT",
      "WPTG",
      "WPT Global",
      "WPT Global Taiwan",
      "WPTG Taiwan",
      "WPT Global Registration",
      "WPTG Registration",
      "WPT Global Download",
      "WPTG Download",
      "WPT Global deposit",
      "WPTG stored value",
      "WPT Global Stored Value",
      "WPT Global Offers",
      "WPT Global Teaching",
      "WPTG Teaching",
      "WPT Texas Hold'em",
      "WPT Online Poker",
      "WPT Online",
    ],
  },
};

/* ============================================================
   METADATA
============================================================ */

/**
 * Generates locale-aware fallback metadata.
 *
 * Individual page metadata takes precedence when a page defines
 * its own generateMetadata() implementation.
 *
 * SEO handled here:
 *
 * - Locale-specific title
 * - SEO description
 * - Target keyword coverage
 * - Canonical URL
 * - hreflang alternates
 * - x-default
 * - Open Graph locale
 * - Index / follow directives
 */
export async function generateMetadata({
  params,
}: Pick<LocaleLayoutProps, "params">): Promise<Metadata> {
  const { locale } = await params;

  if (!isValidLocale(locale)) {
    notFound();
  }

  const currentLocale: Locale = locale;

  const seo = LOCALE_SEO[currentLocale];

  const canonical = buildCanonical(currentLocale);

  const languages = buildLanguageAlternates();

  return createMetadata({
    title: seo.title,

    description: seo.description,

    keywords: seo.keywords,

    robots: "index, follow",

    canonical,

    locale: getOpenGraphLocale(currentLocale),

    type: "website",

    alternates: {
      canonical,

      languages,
    },
  });
}

/* ============================================================
   LAYOUT
============================================================ */

export default async function LocaleLayout({
  children,
  params,
}: LocaleLayoutProps) {
  const { locale } = await params;

  if (!isValidLocale(locale)) {
    notFound();
  }

  const currentLocale: Locale = locale;

  return (
    <LocaleProvider locale={currentLocale}>
      <Header />

      <main className="min-h-screen pt-21">{children}</main>
    </LocaleProvider>
  );
}
