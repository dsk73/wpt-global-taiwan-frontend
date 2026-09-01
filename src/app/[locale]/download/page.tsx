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

  const title =
    download.SEO?.MetaTitle || download.Title || "Download WPT Global Taiwan";

  const description =
    download.SEO?.MetaDescription ||
    "Download WPT Global Taiwan and start playing poker on our global poker platform.";

  const canonical =
    download.SEO?.CanonicalURL || buildCanonical(locale, "/download");

  const languages = buildLanguageAlternates("/download");

  const image = buildSEOImageUrl(download.SEO?.OGImage?.url);

  return createMetadata({
    title: buildPageTitle(title),

    description,

    keywords: download.SEO?.Keywords
      ? download.SEO.Keywords.split(",")
          .map((keyword) => keyword.trim())
          .filter(Boolean)
      : undefined,

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
