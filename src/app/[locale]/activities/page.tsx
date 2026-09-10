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
  SITE_URL,
} from "@/lib/metadata";

/* ============================================================
   PROPS
============================================================ */

interface ActivitiesPageProps {
  params: Promise<{
    locale: Locale;
  }>;
}

/* ============================================================
   PAGE SEO
============================================================ */

const PAGE_TITLE: Record<Locale, string> = {
  "zh-Hant-TW": "WPT Global Taiwan 最新活動與優惠｜撲克賽事",
  en: "WPT Global Taiwan Activities & Promotions | Poker Events",
  "ms-MY": "Aktiviti & Promosi WPT Global Taiwan | Acara Poker",
};

const PAGE_DESCRIPTION: Record<Locale, string> = {
  "zh-Hant-TW":
    "查看 WPT Global Taiwan 最新活動、撲克優惠、線上撲克賽事與官方公告，掌握最新活動資訊與精彩撲克機會。",

  en: "Discover the latest WPT Global Taiwan activities, poker promotions, online poker tournaments and official announcements, with the latest opportunities for poker players.",

  "ms-MY":
    "Temui aktiviti terkini WPT Global Taiwan, promosi poker, kejohanan poker dalam talian dan pengumuman rasmi untuk mengikuti peluang poker terbaru.",
};

/* ============================================================
   SEO KEYWORDS
============================================================ */

const PAGE_KEYWORDS: Record<Locale, string[]> = {
  "zh-Hant-TW": [
    "WPT Global Taiwan",
    "WPTG Taiwan",
    "WPT Global 活動",
    "WPT Global 最新活動",
    "WPT Global 優惠",
    "WPT Global 活動優惠",
    "WPT Global 撲克活動",
    "撲克活動",
    "撲克優惠",
    "撲克賽事",
    "線上撲克活動",
    "線上撲克賽事",
    "線上撲克優惠",
    "德州撲克賽事",
  ],

  en: [
    "WPT Global Taiwan",
    "WPTG Taiwan",
    "WPT Global activities",
    "WPT Global latest activities",
    "WPT Global promotions",
    "WPT Global poker promotions",
    "WPT Global events",
    "poker promotions",
    "poker events",
    "poker tournaments",
    "online poker promotions",
    "online poker tournaments",
    "Texas Hold'em tournaments",
  ],

  "ms-MY": [
    "WPT Global Taiwan",
    "WPTG Taiwan",
    "aktiviti WPT Global",
    "aktiviti terkini WPT Global",
    "promosi WPT Global",
    "promosi poker WPT Global",
    "acara WPT Global",
    "promosi poker",
    "aktiviti poker",
    "kejohanan poker",
    "poker dalam talian",
    "promosi poker dalam talian",
    "kejohanan poker dalam talian",
    "kejohanan Texas Hold'em",
  ],
};

/* ============================================================
   METADATA
============================================================ */

/**
 * Generates locale-aware SEO metadata for the Activities page.
 *
 * Includes:
 * - Search-focused localized title
 * - Localized meta description
 * - Relevant activity, promotion and poker keywords
 * - Locale-specific canonical URL
 * - hreflang language alternates
 * - Locale-specific Open Graph metadata
 */
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
   PAGE
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

  /* ----------------------------------------------------------
     Structured Data
  ---------------------------------------------------------- */

  const canonical = buildCanonical(locale, "/activities");

  const breadcrumbHome =
    locale === "zh-Hant-TW"
      ? "首頁"
      : locale === "ms-MY"
        ? "Laman Utama"
        : "Home";

  const breadcrumbActivities =
    locale === "zh-Hant-TW"
      ? "最新活動"
      : locale === "ms-MY"
        ? "Aktiviti"
        : "Activities";

  const itemListActivities = activities.map((activity, index) => ({
    "@type": "ListItem",
    position: index + 1,
    name: activity.Title,
    url: buildCanonical(locale, `/activities/${activity.Slug}`),
  }));

  const structuredData = {
    "@context": "https://schema.org",

    "@graph": [
      {
        "@type": "WebPage",

        "@id": `${canonical}#webpage`,

        url: canonical,

        name: PAGE_TITLE[locale],

        description: PAGE_DESCRIPTION[locale],

        inLanguage: locale,

        isPartOf: {
          "@id": `${SITE_URL}/#website`,
        },

        publisher: {
          "@id": `${SITE_URL}/#organization`,
        },

        breadcrumb: {
          "@id": `${canonical}#breadcrumb`,
        },

        mainEntity: {
          "@id": `${canonical}#collection`,
        },
      },

      {
        "@type": "CollectionPage",

        "@id": `${canonical}#collection`,

        url: canonical,

        name: PAGE_TITLE[locale],

        description: PAGE_DESCRIPTION[locale],

        inLanguage: locale,

        isPartOf: {
          "@id": `${SITE_URL}/#website`,
        },

        publisher: {
          "@id": `${SITE_URL}/#organization`,
        },

        breadcrumb: {
          "@id": `${canonical}#breadcrumb`,
        },

        mainEntity: {
          "@id": `${canonical}#itemlist`,
        },
      },

      {
        "@type": "ItemList",

        "@id": `${canonical}#itemlist`,

        name: PAGE_TITLE[locale],

        numberOfItems: itemListActivities.length,

        itemListElement: itemListActivities,
      },

      {
        "@type": "BreadcrumbList",

        "@id": `${canonical}#breadcrumb`,

        itemListElement: [
          {
            "@type": "ListItem",

            position: 1,

            name: breadcrumbHome,

            item: buildCanonical(locale, ""),
          },

          {
            "@type": "ListItem",

            position: 2,

            name: breadcrumbActivities,

            item: canonical,
          },
        ],
      },
    ],
  };

  return (
    <>
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{
          __html: JSON.stringify(structuredData),
        }}
      />

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
