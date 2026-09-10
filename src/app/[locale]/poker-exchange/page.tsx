// src/app/[locale]/poker-exchange/page.tsx

import type { Metadata } from "next";
import { notFound } from "next/navigation";

import { Header } from "@/features/header";
import { Footer } from "@/features/footer";

import FeaturedPokerExchange from "@/features/poker-exchange/components/FeaturedPokerExchange";
import PokerExchangeGrid from "@/features/poker-exchange/components/PokerExchangeGrid";

import { getAllPokerExchangeArticles } from "@/services/poker-exchange.service";

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
   Props
============================================================ */

interface PokerExchangePageProps {
  params: Promise<{
    locale: Locale;
  }>;
}

/* ============================================================
   PAGE CONTENT
============================================================ */

const PAGE_TITLE: Record<Locale, string> = {
  "zh-Hant-TW": "WPT 德州撲克｜撲克交流與策略",
  en: "WPT Texas Hold'em | Poker Strategy & Exchange",
  "ms-MY": "WPT Texas Hold'em | Strategi & Komuniti Poker",
};

const PAGE_DESCRIPTION: Record<Locale, string> = {
  "zh-Hant-TW":
    "探索 WPT 德州撲克與線上撲克內容，掌握撲克策略、技巧、賽事新聞與 WPT Global Taiwan 專業文章。",

  en: "Explore WPT Texas Hold'em and online poker content, including poker strategies, tips, tournament news and expert articles from WPT Global Taiwan.",

  "ms-MY":
    "Terokai WPT Texas Hold'em dan kandungan poker online, termasuk strategi, tip, berita kejohanan dan artikel pakar daripada WPT Global Taiwan.",
};

/* ============================================================
   SEO KEYWORDS
============================================================ */

const PAGE_KEYWORDS: Record<Locale, string[]> = {
  "zh-Hant-TW": [
    "WPT",
    "WPT Global Taiwan",
    "WPT 德州撲克",
    "WPT 線上撲克",
    "WPT 撲克",
    "Poker Exchange",
    "撲克交流站",
    "撲克策略",
    "撲克新聞",
    "撲克賽事",
    "線上撲克",
    "德州撲克",
    "德州撲克策略",
    "撲克技巧",
    "撲克攻略",
    "撲克文章",
  ],

  en: [
    "WPT",
    "WPT Global Taiwan",
    "WPT Texas Hold'em",
    "WPT online poker",
    "WPT poker",
    "Poker Exchange",
    "poker strategy",
    "poker news",
    "poker tournament news",
    "online poker",
    "Texas Hold'em",
    "Texas Hold'em strategy",
    "poker tips",
    "poker guides",
    "poker articles",
    "poker insights",
  ],

  "ms-MY": [
    "WPT",
    "WPT Global Taiwan",
    "WPT Texas Hold'em",
    "WPT online poker",
    "WPT poker",
    "Poker Exchange",
    "strategi poker",
    "berita poker",
    "kejohanan poker",
    "poker online",
    "Texas Hold'em",
    "strategi Texas Hold'em",
    "tips poker",
    "panduan poker",
    "artikel poker",
  ],
};

/* ============================================================
   METADATA
============================================================ */

export async function generateMetadata({
  params,
}: PokerExchangePageProps): Promise<Metadata> {
  const { locale } = await params;

  /*
   * Prevent unsupported locale values from generating
   * incorrect or duplicate SEO metadata.
   */
  if (!isValidLocale(locale)) {
    notFound();
  }

  const title = PAGE_TITLE[locale];

  const description = PAGE_DESCRIPTION[locale];

  /*
   * Canonical URL for the current localized page.
   */
  const canonical = buildCanonical(locale, "/poker-exchange");

  /*
   * hreflang URLs for all supported locales.
   */
  const languages = buildLanguageAlternates("/poker-exchange");

  return createMetadata({
    /*
     * Uses the project's shared title builder so the page
     * follows the same title format as the rest of the website.
     */
    title: buildPageTitle(title),

    /*
     * Localized meta description.
     */
    description,

    /*
     * Localized SEO keyword set.
     */
    keywords: PAGE_KEYWORDS[locale],

    /*
     * Canonical URL.
     */
    canonical,

    /*
     * Correct Open Graph locale.
     */
    locale: getOpenGraphLocale(locale),

    /*
     * Canonical + hreflang alternates.
     */
    alternates: {
      canonical,
      languages,
    },

    /*
     * Open Graph metadata.
     *
     * The shared createMetadata helper remains responsible
     * for the project's common OG configuration.
     */
  });
}

/* ============================================================
   PAGE
============================================================ */

export default async function PokerExchangePage({
  params,
}: PokerExchangePageProps) {
  const { locale } = await params;

  /*
   * Validate locale before fetching localized content.
   */
  if (!isValidLocale(locale)) {
    notFound();
  }

  /*
   * Fetch all Poker Exchange articles for the
   * currently selected locale.
   */
  const articles = await getAllPokerExchangeArticles(locale);

  /*
   * Select the article marked as Featured.
   */
  const featured = articles.find((article) => article.Featured) ?? null;

  /*
   * Prevent the featured article from appearing again
   * inside the latest articles grid.
   */
  const latest = articles.filter(
    (article) => article.documentId !== featured?.documentId,
  );

  /* ==========================================================
     STRUCTURED DATA
  ========================================================== */

  const canonical = buildCanonical(locale, "/poker-exchange");

  const breadcrumbHome =
    locale === "zh-Hant-TW"
      ? "首頁"
      : locale === "ms-MY"
        ? "Laman Utama"
        : "Home";

  const breadcrumbPokerExchange =
    locale === "zh-Hant-TW"
      ? "撲克交流站"
      : locale === "ms-MY"
        ? "Komuniti Poker"
        : "Poker Exchange";

  const itemListArticles = articles.map((article, index) => ({
    "@type": "ListItem",
    position: index + 1,
    name: article.Title,
    url: buildCanonical(locale, `/poker-exchange/${article.Slug}`),
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

        numberOfItems: itemListArticles.length,

        itemListElement: itemListArticles,
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

            name: breadcrumbPokerExchange,

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
        {/* ======================================================
            HERO
        ====================================================== */}

        <section
          className="
            border-b
            border-white/10
          "
        >
          <div
            className="
              mx-auto
              max-w-7xl
              px-4
              py-20

              sm:px-6

              lg:px-8
            "
          >
            <h1
              className="
                text-5xl
                font-bold
                text-white

                md:text-6xl
              "
            >
              {PAGE_TITLE[locale]}
            </h1>

            <p
              className="
                mt-6
                max-w-3xl
                text-lg
                leading-8
                text-white/70
              "
            >
              {PAGE_DESCRIPTION[locale]}
            </p>
          </div>
        </section>

        {/* ======================================================
            CONTENT
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
              FEATURED ARTICLE
          ==================================================== */}

          {featured && (
            <FeaturedPokerExchange article={featured} locale={locale} />
          )}

          {/* ====================================================
              LATEST ARTICLES
          ==================================================== */}

          {latest.length > 0 && (
            <div className="mt-16">
              <PokerExchangeGrid articles={latest} locale={locale} />
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
