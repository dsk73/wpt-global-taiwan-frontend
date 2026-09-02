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
 * - Target the primary WPT Global Taiwan brand term.
 * - Target relevant Taiwan poker search intent.
 * - Keep titles concise and descriptive.
 * - Provide natural, localized descriptions.
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
    title: "WPT Global Taiwan｜官方線上撲克平台",
    description:
      "WPT Global Taiwan 官方網站，探索線上撲克、精彩撲克賽事、最新活動、撲克教學與玩家資訊，立即了解 WPT Global Taiwan。",
    keywords: [
      "WPT Global Taiwan",
      "WPTG Taiwan",
      "WPT Global",
      "WPT 撲克",
      "線上撲克",
      "線上撲克台灣",
      "台灣撲克",
      "撲克遊戲",
      "撲克賽事",
      "撲克比賽",
      "撲克教學",
      "德州撲克",
    ],
  },

  en: {
    title: "WPT Global Taiwan | Official Online Poker",
    description:
      "Official WPT Global Taiwan website. Discover online poker, poker tournaments, latest activities, poker guides and player resources from WPT Global Taiwan.",
    keywords: [
      "WPT Global Taiwan",
      "WPTG Taiwan",
      "WPT Global",
      "online poker",
      "online poker Taiwan",
      "poker Taiwan",
      "poker games",
      "poker tournaments",
      "poker events",
      "poker strategy",
      "poker guides",
      "Texas Hold'em",
    ],
  },

  "ms-MY": {
    title: "WPT Global Taiwan | Platform Poker Dalam Talian",
    description:
      "Laman web rasmi WPT Global Taiwan. Terokai poker dalam talian, kejohanan poker, aktiviti terkini, panduan poker dan sumber pemain daripada WPT Global Taiwan.",
    keywords: [
      "WPT Global Taiwan",
      "WPTG Taiwan",
      "WPT Global",
      "poker dalam talian",
      "poker online",
      "poker Taiwan",
      "permainan poker",
      "kejohanan poker",
      "acara poker",
      "strategi poker",
      "panduan poker",
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
