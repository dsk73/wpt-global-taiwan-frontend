// src/app/[locale]/resources/page.tsx

import type { Metadata } from "next";
import { notFound } from "next/navigation";

import { Footer } from "@/features/footer";
import { Header } from "@/features/header";

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

interface ResourcesPageProps {
  params: Promise<{
    locale: Locale;
  }>;
}

/* ============================================================
   PAGE SEO
============================================================ */

const RESOURCES_SEO: Record<
  Locale,
  {
    title: string;
    description: string;
    keywords: string[];
  }
> = {
  "zh-Hant-TW": {
    title: "撲克資源",
    description:
      "探索 WPT Global Taiwan 撲克資源，取得撲克資訊、策略、教學與玩家實用指南。",
    keywords: [
      "WPT Global Taiwan",
      "撲克資源",
      "撲克教學",
      "撲克策略",
      "線上撲克",
      "德州撲克",
      "撲克指南",
    ],
  },

  en: {
    title: "Poker Resources",
    description:
      "Explore WPT Global Taiwan poker resources, including poker information, strategies, guides and useful resources for players.",
    keywords: [
      "WPT Global Taiwan",
      "poker resources",
      "poker guides",
      "poker strategy",
      "online poker",
      "Texas Hold'em",
      "poker tips",
    ],
  },

  "ms-MY": {
    title: "Sumber Poker",
    description:
      "Terokai sumber poker WPT Global Taiwan termasuk maklumat poker, strategi, panduan dan sumber berguna untuk pemain.",
    keywords: [
      "WPT Global Taiwan",
      "sumber poker",
      "panduan poker",
      "strategi poker",
      "poker online",
      "Texas Hold'em",
      "tips poker",
    ],
  },
};

/* ============================================================
   METADATA
============================================================ */

export async function generateMetadata({
  params,
}: ResourcesPageProps): Promise<Metadata> {
  const { locale } = await params;

  if (!isValidLocale(locale)) {
    notFound();
  }

  const seo = RESOURCES_SEO[locale];

  const canonical = buildCanonical(locale, "/resources");

  const languages = buildLanguageAlternates("/resources");

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

export default async function ResourcesPage({ params }: ResourcesPageProps) {
  const { locale } = await params;

  if (!isValidLocale(locale)) {
    notFound();
  }

  const seo = RESOURCES_SEO[locale];

  return (
    <>
      <Header />

      <main className="min-h-screen bg-[#070B15] pt-32">
        {/* ======================================================
            HERO
        ====================================================== */}

        <section className="border-b border-white/10">
          <div className="mx-auto max-w-7xl px-4 py-20 sm:px-6 lg:px-8">
            <h1 className="text-5xl font-bold text-white md:text-6xl">
              {seo.title}
            </h1>

            <p className="mt-6 max-w-3xl text-lg leading-8 text-white/70">
              {seo.description}
            </p>
          </div>
        </section>

        {/* ======================================================
            RESOURCES CONTENT
        ====================================================== */}

        <section className="mx-auto max-w-7xl px-4 py-20 sm:px-6 lg:px-8">
          <div className="rounded-3xl border border-white/10 bg-white/5 p-10 text-center">
            <p className="text-lg text-white/60">
              {locale === "zh-Hant-TW"
                ? "目前沒有可用的資源。"
                : locale === "ms-MY"
                  ? "Tiada sumber tersedia pada masa ini."
                  : "No resources are currently available."}
            </p>
          </div>
        </section>
      </main>

      <Footer locale={locale} />
    </>
  );
}
