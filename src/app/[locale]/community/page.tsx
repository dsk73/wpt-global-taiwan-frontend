// src/app/[locale]/community/page.tsx

import type { Metadata } from "next";
import { notFound } from "next/navigation";

import CommunityFooterText from "@/features/community/components/CommunityFooterText";
import CommunityHero from "@/features/community/components/CommunityHero";
import CommunityLineCTA from "@/features/community/components/CommunityLineCTA";
import CommunitySocialGrid from "@/features/community/components/CommunitySocialGrid";

import { Footer } from "@/features/footer";

import { getCommunityPage } from "@/services/community-page.service";

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

interface CommunityPageProps {
  params: Promise<{
    locale: Locale;
  }>;
}

/* ============================================================
   SEO
============================================================ */

/**
 * SEO metadata is aligned with the client's priority keyword
 * strategy for WPT, WPTG, WPT Global, WPTG Taiwan and
 * Taiwan-focused brand searches.
 *
 * Primary SEO intent:
 * - WPT Global Taiwan
 * - WPTG Taiwan
 * - WPT Global
 * - WPTG
 *
 * Secondary/community intent:
 * - WPT Global community
 * - WPT Global official community
 * - WPT Global LINE
 * - WPTG community
 *
 * Keywords are kept relevant to the actual page content.
 */
const COMMUNITY_SEO: Record<
  Locale,
  {
    title: string;
    description: string;
    keywords: string[];
  }
> = {
  "zh-Hant-TW": {
    title: "WPT Global Taiwan｜WPTG 官方社群",
    description:
      "WPT Global Taiwan｜WPTG 官方社群，掌握 WPT Global 最新資訊、活動、優惠與官方公告，加入官方 LINE 與社群，與撲克玩家交流。",
    keywords: [
      "WPT Global Taiwan",
      "WPTG Taiwan",
      "WPT Global",
      "WPTG",
      "WPT Global 官方社群",
      "WPTG 官方社群",
      "WPT Global 社群",
      "WPTG 社群",
      "WPT Global LINE",
      "WPT Global 官方 LINE",
      "WPTG LINE",
      "撲克社群",
      "線上撲克社群",
    ],
  },

  en: {
    title: "WPT Global Taiwan | WPTG Official Community",
    description:
      "Join the WPT Global Taiwan | WPTG official community for the latest WPT Global updates, offers, activities and announcements. Connect through official LINE and social channels.",
    keywords: [
      "WPT Global Taiwan",
      "WPTG Taiwan",
      "WPT Global",
      "WPTG",
      "WPT Global official community",
      "WPTG official community",
      "WPT Global community",
      "WPTG community",
      "WPT Global LINE",
      "WPT Global official LINE",
      "WPTG LINE",
      "poker community",
      "online poker community",
    ],
  },

  "ms-MY": {
    title: "WPT Global Taiwan | Komuniti Rasmi WPTG",
    description:
      "Sertai komuniti rasmi WPT Global Taiwan | WPTG untuk mendapatkan kemas kini, promosi, aktiviti dan pengumuman terkini WPT Global. Hubungi komuniti melalui LINE dan saluran rasmi.",
    keywords: [
      "WPT Global Taiwan",
      "WPTG Taiwan",
      "WPT Global",
      "WPTG",
      "komuniti rasmi WPT Global",
      "komuniti rasmi WPTG",
      "komuniti WPT Global",
      "komuniti WPTG",
      "WPT Global LINE",
      "LINE rasmi WPT Global",
      "WPTG LINE",
      "komuniti poker",
      "komuniti poker online",
    ],
  },
};

/* ============================================================
   Metadata
============================================================ */

export async function generateMetadata({
  params,
}: CommunityPageProps): Promise<Metadata> {
  const { locale } = await params;

  if (!isValidLocale(locale)) {
    notFound();
  }

  const seo = COMMUNITY_SEO[locale];

  const canonical = buildCanonical(locale, "/community");

  const languages = buildLanguageAlternates("/community");

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

export default async function CommunityPage({ params }: CommunityPageProps) {
  const { locale } = await params;

  if (!isValidLocale(locale)) {
    notFound();
  }

  const page = await getCommunityPage(locale);

  if (!page) {
    notFound();
  }

  /*
   * -----------------------------------------------------------
   * All Social Links
   * -----------------------------------------------------------
   *
   * The social-card grid displays EVERY active SocialLink
   * entry received from Strapi.
   *
   * There is:
   * - No URL filtering
   * - No Platform filtering
   * - No LINE filtering
   * - No deduplication
   * - No maximum number of cards
   *
   * If the same social entry appears multiple times in Strapi,
   * it will also appear multiple times on the page.
   *
   * Active filtering and DisplayOrder sorting are handled by
   * community-page.service.ts.
   */
  const socialLinks = page.SocialLink;

  return (
    <>
      <main className="min-h-screen bg-[#070B15] pt-32">
        {/* -------------------------------------------------------
         * Community Hero
         * ----------------------------------------------------- */}

        <CommunityHero page={page} />

        {/* -------------------------------------------------------
         * Official LINE CTA
         * ----------------------------------------------------- */}

        <CommunityLineCTA
          lineId={page.LINEID}
          lineButtonText={page.LINEButtonText}
          lineButtonURL={page.LINEButtonURL}
          lineImage={page.LINEImage}
          locale={locale}
        />

        {/* -------------------------------------------------------
         * ALL Social Links
         * ----------------------------------------------------- */}

        <CommunitySocialGrid socialLinks={socialLinks} />

        {/* -------------------------------------------------------
         * Footer Description
         * ----------------------------------------------------- */}

        <CommunityFooterText content={page.BottomDescription} />
      </main>

      <Footer locale={locale} />
    </>
  );
}
