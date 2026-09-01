// src/app/[locale]/layout.tsx

import type { Metadata } from "next";
import { notFound } from "next/navigation";

import Header from "@/features/header/components/Header";

import { isValidLocale } from "@/config/languages";

import { LocaleProvider, type Locale } from "@/providers";

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
 * Individual pages should override this with their own
 * generateMetadata() implementation.
 */
const LOCALE_SEO: Record<
  Locale,
  {
    title: string;
    description: string;
  }
> = {
  "zh-Hant-TW": {
    title: "WPT Global Taiwan",
    description: "WPT Global Taiwan 官方網站。",
  },

  en: {
    title: "WPT Global Taiwan",
    description: "Official WPT Global Taiwan Website.",
  },

  "ms-MY": {
    title: "WPT Global Taiwan",
    description: "Laman Web Rasmi WPT Global Taiwan.",
  },
};

/* ============================================================
   METADATA
============================================================ */

/**
 * Generates locale-aware fallback metadata.
 *
 * Individual page metadata takes precedence over this layout
 * metadata when the page defines its own generateMetadata().
 */
export async function generateMetadata({
  params,
}: Pick<LocaleLayoutProps, "params">): Promise<Metadata> {
  const { locale } = await params;

  if (!isValidLocale(locale)) {
    notFound();
  }

  const currentLocale: Locale = locale;

  const canonical = buildCanonical(currentLocale);

  const languages = buildLanguageAlternates();

  const seo = LOCALE_SEO[currentLocale];

  return createMetadata({
    title: buildPageTitle(seo.title),

    description: seo.description,

    canonical,

    locale: getOpenGraphLocale(currentLocale),

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
