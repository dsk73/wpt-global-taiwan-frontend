// src/app/[locale]/page.tsx

import type { Metadata } from "next";
import { notFound } from "next/navigation";

import Hero from "@/features/hero/components/Hero";
import Ambassadors from "@/features/ambassadors/components/Ambassadors";
import Activities from "@/features/activities/components/Activities";
import { FAQHeader, FAQSection } from "@/features/faq";
import Footer from "@/features/footer/components/Footer";
import FloatingLineButton from "@/features/floating-line/components/FloatingLineButton";

import { getHeroData } from "@/services/hero.service";
import { getBrandAmbassadors } from "@/services/ambassadors.service";
import { getPaymentMethods } from "@/services/payment.service";
import { getHomepageActivities } from "@/services/activities.service";
import { fetchFAQs } from "@/services";

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
   PROPS
============================================================ */

interface HomePageProps {
  params: Promise<{
    locale: Locale;
  }>;
}

/* ============================================================
   SEO
============================================================ */

/**
 * Homepage SEO metadata for each supported locale.
 *
 * SEO goals:
 * - Establish the homepage as the primary WPT / WPTG / WPT Global
 *   brand and product landing page.
 * - Target WPT Global Taiwan brand intent.
 * - Support relevant online poker search intent naturally.
 * - Keep registration, download, deposit, withdrawal, referral-code,
 *   and promotion keywords focused on their dedicated pages.
 * - Keep each locale naturally localized.
 * - Avoid keyword stuffing.
 */
const HOME_SEO: Record<
  Locale,
  {
    title: string;
    description: string;
    keywords: string[];
  }
> = {
  "zh-Hant-TW": {
    title: "WPT Global 台灣｜WPTG 官方入口・線上撲克",
    description:
      "WPT Global 台灣官方入口，了解 WPT、WPTG 與 WPT Global，探索線上撲克、精彩撲克賽事、最新活動與撲克教學，掌握 WPT Global Taiwan 最新資訊。",
    keywords: [
      "WPT",
      "WPTG",
      "WPT Global",
      "WPT Global 台灣",
      "WPTG 台灣",
      "WPT 線上",
      "WPT 線上撲克",
      "WPT 撲克",
      "線上撲克",
      "台灣撲克",
      "撲克遊戲",
      "撲克賽事",
      "德州撲克",
    ],
  },

  en: {
    title: "WPT Global Taiwan | WPTG Official Online Poker",
    description:
      "Official WPT Global Taiwan portal for WPT, WPTG and WPT Global. Explore online poker, poker tournaments, latest activities and poker guides for players.",
    keywords: [
      "WPT",
      "WPTG",
      "WPT Global",
      "WPT Global Taiwan",
      "WPTG Taiwan",
      "WPT online",
      "WPT online poker",
      "WPT poker",
      "online poker",
      "online poker Taiwan",
      "poker tournaments",
      "poker events",
      "Texas Hold'em",
    ],
  },

  "ms-MY": {
    title: "WPT Global Taiwan | Portal Rasmi WPTG & Poker Dalam Talian",
    description:
      "Portal rasmi WPT Global Taiwan untuk WPT, WPTG dan WPT Global. Terokai poker dalam talian, kejohanan poker, aktiviti terkini dan panduan poker untuk pemain.",
    keywords: [
      "WPT",
      "WPTG",
      "WPT Global",
      "WPT Global Taiwan",
      "WPTG Taiwan",
      "WPT online",
      "WPT online poker",
      "WPT poker",
      "poker dalam talian",
      "poker online",
      "poker Taiwan",
      "kejohanan poker",
      "acara poker",
      "Texas Hold'em",
    ],
  },
};

/* ============================================================
   METADATA
============================================================ */

/**
 * Generates locale-aware homepage metadata.
 *
 * The canonical URL always points to the current locale.
 * Hreflang alternates connect the equivalent homepage versions
 * across Traditional Chinese, English and Malay.
 */
export async function generateMetadata({
  params,
}: HomePageProps): Promise<Metadata> {
  const { locale } = await params;

  if (!isValidLocale(locale)) {
    notFound();
  }

  const seo = HOME_SEO[locale];

  const canonical = buildCanonical(locale);

  const languages = buildLanguageAlternates();

  return createMetadata({
    title: buildPageTitle(seo.title),

    description: seo.description,

    keywords: seo.keywords,

    canonical,

    locale: getOpenGraphLocale(locale),

    type: "website",

    alternates: {
      canonical,

      languages,
    },
  });
}

/* ============================================================
   PAGE
============================================================ */

export default async function HomePage({ params }: HomePageProps) {
  const { locale } = await params;

  if (!isValidLocale(locale)) {
    notFound();
  }

  const [hero, ambassadors, , activitiesData, groupedFAQs] = await Promise.all([
    getHeroData(locale),
    getBrandAmbassadors(locale),
    getPaymentMethods(locale),
    getHomepageActivities(locale),
    fetchFAQs(locale),
  ]);

  return (
    <>
      <Hero slides={hero.slides} promotionCard={hero.promotionCard} />

      <main>
        <Ambassadors ambassadors={ambassadors} locale={locale} />

        <Activities
          activities={[
            ...(activitiesData.featured ? [activitiesData.featured] : []),
            ...activitiesData.activities,
          ]}
          locale={locale}
        />

        <section
          aria-labelledby="homepage-faq-heading"
          className="py-14 lg:py-20"
        >
          <FAQHeader locale={locale} />

          <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
            <FAQSection groupedFAQs={groupedFAQs} locale={locale} />
          </div>
        </section>
      </main>

      <Footer locale={locale} />

      <FloatingLineButton />
    </>
  );
}
