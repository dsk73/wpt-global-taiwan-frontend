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
   Props
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
    title: "關於我們",
    description:
      "了解 WPT Global Taiwan，探索我們提供的全球撲克平台、撲克遊戲、賽事活動與玩家服務。",
    keywords: [
      "WPT Global Taiwan",
      "關於 WPT Global",
      "WPT Global Taiwan 關於我們",
      "全球撲克平台",
      "線上撲克",
    ],
  },

  en: {
    title: "About Us",
    description:
      "Learn more about WPT Global Taiwan and discover our global poker platform, poker games, tournaments and player services.",
    keywords: [
      "WPT Global Taiwan",
      "about WPT Global",
      "WPT Global Taiwan about us",
      "global poker platform",
      "online poker",
    ],
  },

  "ms-MY": {
    title: "Tentang Kami",
    description:
      "Ketahui lebih lanjut tentang WPT Global Taiwan dan terokai platform poker global, permainan poker, kejohanan serta perkhidmatan pemain kami.",
    keywords: [
      "WPT Global Taiwan",
      "tentang WPT Global",
      "WPT Global Taiwan tentang kami",
      "platform poker global",
      "poker online",
    ],
  },
};

/* ============================================================
   Metadata
============================================================ */

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
   Page
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
