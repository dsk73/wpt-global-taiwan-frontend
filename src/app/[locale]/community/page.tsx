import { notFound } from "next/navigation";

import CommunityFooterText from "@/features/community/components/CommunityFooterText";
import CommunityHero from "@/features/community/components/CommunityHero";
import CommunityLineCTA from "@/features/community/components/CommunityLineCTA";
import CommunitySocialGrid from "@/features/community/components/CommunitySocialGrid";

import { Footer } from "@/features/footer";

import { getCommunityPage } from "@/services/community-page.service";

import type { Locale } from "@/providers";

interface CommunityPageProps {
  params: Promise<{
    locale: Locale;
  }>;
}

export default async function CommunityPage({ params }: CommunityPageProps) {
  const { locale } = await params;

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
         * -----------------------------------------------------
         *
         * IMPORTANT:
         *
         * The LINE CTA uses ONLY the dedicated Community Page
         * fields:
         *
         * - LINEID
         * - LINEButtonText
         * - LINEButtonURL
         * - LINEImage
         *
         * It does NOT use SocialLink.
         */}

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
