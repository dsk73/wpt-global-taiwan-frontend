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
   Props
============================================================ */

interface HomePageProps {
  params: Promise<{
    locale: Locale;
  }>;
}

/* ============================================================
   SEO
============================================================ */

const HOME_SEO: Record<
  Locale,
  {
    title: string;
    description: string;
    keywords: string[];
  }
> = {
  "zh-Hant-TW": {
    title: "WPT Global Taiwan｜全球撲克平台",
    description:
      "WPT Global Taiwan 官方網站，探索精彩撲克遊戲、賽事活動、撲克教學與最新資訊，立即加入 WPT Global Taiwan。",
    keywords: [
      "WPT Global Taiwan",
      "WPT Global",
      "WPT 撲克",
      "線上撲克",
      "撲克遊戲",
      "撲克賽事",
      "撲克教學",
    ],
  },

  en: {
    title: "WPT Global Taiwan | Global Poker Platform",
    description:
      "Official WPT Global Taiwan website. Explore exciting poker games, tournaments, poker guides and the latest updates from WPT Global Taiwan.",
    keywords: [
      "WPT Global Taiwan",
      "WPT Global",
      "online poker",
      "poker games",
      "poker tournaments",
      "poker strategy",
      "poker guides",
    ],
  },

  "ms-MY": {
    title: "WPT Global Taiwan | Platform Poker Global",
    description:
      "Laman web rasmi WPT Global Taiwan. Terokai permainan poker, kejohanan, panduan poker dan berita terkini daripada WPT Global Taiwan.",
    keywords: [
      "WPT Global Taiwan",
      "WPT Global",
      "poker online",
      "permainan poker",
      "kejohanan poker",
      "strategi poker",
      "panduan poker",
    ],
  },
};

/* ============================================================
   Metadata
============================================================ */

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

    alternates: {
      canonical,
      languages,
    },
  });
}

/* ============================================================
   Page
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

        <section className="py-14 lg:py-20">
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
