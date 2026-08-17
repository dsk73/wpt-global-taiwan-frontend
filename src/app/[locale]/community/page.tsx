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
   * Platform is localized text, so we must NOT identify LINE
   * using the Platform field.
   *
   * The LINE CTA uses LINEButtonURL as the stable identifier.
   */
  const lineSocial =
    page.SocialLink.find((social) => social.URL === page.LINEButtonURL) ?? null;

  /*
   * -----------------------------------------------------------
   * All Social Links
   * -----------------------------------------------------------
   *
   * IMPORTANT:
   *
   * The social-card grid must display EVERY SocialLink entry
   * received from Strapi.
   *
   * There is:
   * - No URL filtering
   * - No Platform filtering
   * - No deduplication
   * - No maximum number of cards
   *
   * If the same social entry appears multiple times in Strapi,
   * it will also appear multiple times on the page.
   *
   * DisplayOrder and Active are handled by the service layer.
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
