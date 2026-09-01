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

const COMMUNITY_SEO: Record<
  Locale,
  {
    title: string;
    description: string;
    keywords: string[];
  }
> = {
  "zh-Hant-TW": {
    title: "WPT Global Taiwan 社群",
    description:
      "加入 WPT Global Taiwan 官方社群，掌握最新撲克資訊、活動消息、優惠與官方公告，與其他撲克玩家交流。",
    keywords: [
      "WPT Global Taiwan",
      "WPT Global 社群",
      "WPTG 社群",
      "WPT Global LINE",
      "WPT Global 官方社群",
      "撲克社群",
      "線上撲克社群",
    ],
  },

  en: {
    title: "WPT Global Taiwan Community",
    description:
      "Join the official WPT Global Taiwan community to stay updated with poker news, activities, promotions, announcements and connect with other players.",
    keywords: [
      "WPT Global Taiwan",
      "WPT Global community",
      "WPTG community",
      "WPT Global LINE",
      "WPT Global official community",
      "poker community",
      "online poker community",
    ],
  },

  "ms-MY": {
    title: "Komuniti WPT Global Taiwan",
    description:
      "Sertai komuniti rasmi WPT Global Taiwan untuk mendapatkan berita poker, aktiviti, promosi dan pengumuman terkini serta berhubung dengan pemain lain.",
    keywords: [
      "WPT Global Taiwan",
      "komuniti WPT Global",
      "komuniti WPTG",
      "WPT Global LINE",
      "komuniti rasmi WPT Global",
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
