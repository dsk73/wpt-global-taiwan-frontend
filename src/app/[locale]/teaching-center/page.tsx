// src/app/[locale]/teaching-center/page.tsx

import type { Metadata } from "next";
import { notFound } from "next/navigation";

import { Footer } from "@/features/footer";

import {
  TeachingCenterGrid,
  TeachingCenterHero,
} from "@/features/teaching-center";

import { fetchTeachingCenterPage, fetchTeachingGuides } from "@/services";

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

interface TeachingCenterPageProps {
  params: Promise<{
    locale: Locale;
  }>;
}

/* ============================================================
   SEO CONTENT
============================================================ */

const PAGE_TITLE: Record<Locale, string> = {
  "zh-Hant-TW": "撲克教學中心",
  en: "Poker Teaching Center",
  "ms-MY": "Pusat Pembelajaran Poker",
};

const PAGE_DESCRIPTION: Record<Locale, string> = {
  "zh-Hant-TW":
    "探索 WPT Global Taiwan 撲克教學中心，學習撲克規則、策略、技巧與實用指南，提升您的撲克遊戲技巧。",

  en: "Explore the WPT Global Taiwan Poker Teaching Center for poker rules, strategies, tips and practical guides to improve your poker skills.",

  "ms-MY":
    "Terokai Pusat Pembelajaran Poker WPT Global Taiwan untuk mempelajari peraturan, strategi, tip dan panduan praktikal bagi meningkatkan kemahiran poker anda.",
};

/* ============================================================
   SEO KEYWORDS
============================================================ */

const PAGE_KEYWORDS: Record<Locale, string[]> = {
  "zh-Hant-TW": [
    "WPT Global Taiwan",
    "WPT Global 教學",
    "WPTG 教學",
    "撲克教學",
    "撲克教學中心",
    "德州撲克教學",
    "德州撲克規則",
    "德州撲克策略",
    "撲克策略",
    "撲克技巧",
    "撲克指南",
    "線上撲克教學",
    "線上撲克指南",
  ],

  en: [
    "WPT Global Taiwan",
    "WPT Global teaching center",
    "WPTG poker guide",
    "poker teaching center",
    "poker tutorials",
    "poker rules",
    "poker strategy",
    "poker tips",
    "poker guides",
    "online poker guide",
    "online poker strategy",
    "Texas Hold'em rules",
    "Texas Hold'em strategy",
  ],

  "ms-MY": [
    "WPT Global Taiwan",
    "pusat pembelajaran WPT Global",
    "panduan poker WPTG",
    "pusat pembelajaran poker",
    "tutorial poker",
    "peraturan poker",
    "strategi poker",
    "tip poker",
    "panduan poker",
    "panduan poker online",
    "strategi poker online",
    "peraturan Texas Hold'em",
    "strategi Texas Hold'em",
  ],
};

/* ============================================================
   METADATA
============================================================ */

export async function generateMetadata({
  params,
}: TeachingCenterPageProps): Promise<Metadata> {
  const { locale } = await params;

  /* ----------------------------------------------------------
     Validate locale
  ---------------------------------------------------------- */

  if (!isValidLocale(locale)) {
    notFound();
  }

  /* ----------------------------------------------------------
     Canonical URL
  ---------------------------------------------------------- */

  const canonical = buildCanonical(locale, "/teaching-center");

  /* ----------------------------------------------------------
     Hreflang / language alternates
  ---------------------------------------------------------- */

  const languages = buildLanguageAlternates("/teaching-center");

  /* ----------------------------------------------------------
     Metadata
  ---------------------------------------------------------- */

  return createMetadata({
    title: buildPageTitle(PAGE_TITLE[locale]),

    description: PAGE_DESCRIPTION[locale],

    keywords: PAGE_KEYWORDS[locale],

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

export default async function TeachingCenterPage({
  params,
}: TeachingCenterPageProps) {
  const { locale } = await params;

  /* ----------------------------------------------------------
     Validate locale
  ---------------------------------------------------------- */

  if (!isValidLocale(locale)) {
    notFound();
  }

  /* ----------------------------------------------------------
     Fetch page content and teaching guides in parallel
  ---------------------------------------------------------- */

  const [page, guides] = await Promise.all([
    fetchTeachingCenterPage(locale),
    fetchTeachingGuides(locale),
  ]);

  return (
    <>
      <main className="min-h-screen bg-[#070B15] pt-32">
        {/* ======================================================
            HERO
        ====================================================== */}

        {page && <TeachingCenterHero page={page} />}

        {/* ======================================================
            TEACHING GUIDES
        ====================================================== */}

        <section
          className="
            mx-auto
            max-w-7xl
            px-4
            py-20

            sm:px-6

            lg:px-8
          "
        >
          {/* ====================================================
              GUIDE SECTION INTRO
          ==================================================== */}

          {page?.GuideSectionTitle && (
            <div className="mb-12 text-center">
              <h2
                className="
                  text-4xl
                  font-bold
                  text-white

                  md:text-5xl
                "
              >
                {page.GuideSectionTitle}
              </h2>

              {page.GuideSectionDescription && (
                <div
                  className="
                    prose
                    prose-invert
                    mx-auto
                    mt-5
                    max-w-3xl
                    text-lg
                    leading-8
                    text-white/70
                  "
                  dangerouslySetInnerHTML={{
                    __html: page.GuideSectionDescription,
                  }}
                />
              )}
            </div>
          )}

          {/* ====================================================
              TEACHING GUIDE GRID
          ==================================================== */}

          {guides.length > 0 ? (
            <TeachingCenterGrid guides={guides} locale={locale} />
          ) : (
            <div
              className="
                rounded-3xl
                border
                border-white/10
                bg-white/5
                p-12
                text-center
              "
            >
              <p className="text-lg text-white/60">
                No teaching guides are currently available.
              </p>
            </div>
          )}
        </section>
      </main>

      {/* ======================================================
          FOOTER
      ====================================================== */}

      <Footer locale={locale} />
    </>
  );
}
