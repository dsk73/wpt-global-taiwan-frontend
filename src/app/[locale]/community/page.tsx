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
   * Find the official LINE social link
   * -----------------------------------------------------------
   *
   * The LINE CTA should specifically use the LINE social entry,
   * rather than depending on DisplayOrder.
   */
  const lineSocial =
    page.SocialLink.find((social) => social.Platform === "LINE") ?? null;

  /*
   * -----------------------------------------------------------
   * Remaining Social Links
   * -----------------------------------------------------------
   *
   * Keep LINE out of the social-card grid because it is already
   * displayed separately in the dedicated LINE CTA.
   */
  const remainingSocialLinks = page.SocialLink.filter(
    (social) => social.Platform !== "LINE",
  );

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

        {lineSocial && (
          <CommunityLineCTA
            social={lineSocial}
            lineId={page.LINEID}
            lineButtonText={page.LINEButtonText}
            lineButtonURL={page.LINEButtonURL}
            locale={locale}
          />
        )}

        {/* -------------------------------------------------------
         * Social Links
         * ----------------------------------------------------- */}

        <CommunitySocialGrid socialLinks={remainingSocialLinks} />

        {/* -------------------------------------------------------
         * Footer Description
         * ----------------------------------------------------- */}

        <CommunityFooterText content={page.BottomDescription} />
      </main>

      <Footer locale={locale} />
    </>
  );
}
