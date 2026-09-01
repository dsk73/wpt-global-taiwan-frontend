// src/app/[locale]/activities/page.tsx

import type { Metadata } from "next";
import { notFound } from "next/navigation";

import { Header } from "@/features/header";
import { Footer } from "@/features/footer";
import FeaturedActivity from "@/features/activities/components/FeaturedActivity";
import ActivityGrid from "@/features/activities/components/ActivityGrid";

import { getAllActivities } from "@/services/activities.service";

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

interface ActivitiesPageProps {
  params: Promise<{
    locale: Locale;
  }>;
}

/* ============================================================
   PAGE CONTENT
============================================================ */

const PAGE_TITLE: Record<Locale, string> = {
  "zh-Hant-TW": "最新活動與優惠",
  en: "Latest Activities & Promotions",
  "ms-MY": "Aktiviti & Promosi Terkini",
};

const PAGE_DESCRIPTION: Record<Locale, string> = {
  "zh-Hant-TW": "掌握 WPT Global Taiwan 最新活動、優惠、公告與賽事資訊。",
  en: "Stay updated with the latest WPT Global Taiwan activities, promotions and announcements.",
  "ms-MY":
    "Ikuti perkembangan terkini mengenai aktiviti, promosi dan pengumuman WPT Global Taiwan.",
};

/* ============================================================
   SEO
============================================================ */

const PAGE_KEYWORDS: Record<Locale, string[]> = {
  "zh-Hant-TW": [
    "WPT Global Taiwan",
    "WPT Global 活動",
    "WPT Global 優惠",
    "撲克活動",
    "撲克優惠",
    "撲克賽事",
    "線上撲克活動",
  ],

  en: [
    "WPT Global Taiwan",
    "WPT Global activities",
    "WPT Global promotions",
    "poker promotions",
    "poker tournaments",
    "online poker promotions",
    "poker events",
  ],

  "ms-MY": [
    "WPT Global Taiwan",
    "aktiviti WPT Global",
    "promosi WPT Global",
    "promosi poker",
    "kejohanan poker",
    "poker online",
    "aktiviti poker",
  ],
};

/* ============================================================
   Metadata
============================================================ */

export async function generateMetadata({
  params,
}: ActivitiesPageProps): Promise<Metadata> {
  const { locale } = await params;

  if (!isValidLocale(locale)) {
    notFound();
  }

  const canonical = buildCanonical(locale, "/activities");

  const languages = buildLanguageAlternates("/activities");

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
   Page
============================================================ */

export default async function ActivitiesPage({ params }: ActivitiesPageProps) {
  const { locale } = await params;

  if (!isValidLocale(locale)) {
    notFound();
  }

  const activities = await getAllActivities(locale);

  const featured = activities.find((activity) => activity.Featured) ?? null;

  const latest = activities.filter(
    (activity) => activity.documentId !== featured?.documentId,
  );

  return (
    <>
      <Header />

      <main className="bg-[#070B15] pt-32">
        {/* Hero */}
        <section className="border-b border-white/10">
          <div className="mx-auto max-w-7xl px-4 py-20 sm:px-6 lg:px-8">
            <h1 className="text-5xl font-bold text-white md:text-6xl">
              {PAGE_TITLE[locale]}
            </h1>

            <p className="mt-6 max-w-3xl text-lg leading-8 text-white/70">
              {PAGE_DESCRIPTION[locale]}
            </p>
          </div>
        </section>

        {/* Content */}
        <section className="mx-auto max-w-7xl px-4 py-20 sm:px-6 lg:px-8">
          {featured && <FeaturedActivity activity={featured} locale={locale} />}

          {latest.length > 0 && (
            <div className="mt-16">
              <ActivityGrid activities={latest} locale={locale} />
            </div>
          )}
        </section>
      </main>

      <Footer locale={locale} />
    </>
  );
}
