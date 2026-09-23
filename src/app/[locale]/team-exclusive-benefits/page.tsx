import type { Metadata } from "next";
import { notFound } from "next/navigation";

import {
  TeamExclusiveBenefitsCTA,
  TeamExclusiveBenefitsHero,
  TeamExclusiveBenefitsList,
} from "@/features/team-exclusive-benefits";

import { Footer } from "@/features/footer";

import {
  fetchTeamExclusiveBenefits,
  fetchTeamExclusiveBenefitsPage,
} from "@/services";

import {
  buildCanonical,
  buildLanguageAlternates,
  createMetadata,
  getSEOLocale,
} from "@/lib/metadata";

import type { Locale } from "@/providers";

/* ---------------------------------------
 * Page Props
 * ------------------------------------- */

interface TeamExclusiveBenefitsPageProps {
  params: Promise<{
    locale: Locale;
  }>;
}

/* ---------------------------------------
 * SEO Metadata
 * ------------------------------------- */

export async function generateMetadata({
  params,
}: TeamExclusiveBenefitsPageProps): Promise<Metadata> {
  const { locale } = await params;

  const page = await fetchTeamExclusiveBenefitsPage(locale);

  /*
   * Fallback metadata
   *
   * This prevents the page from returning invalid
   * metadata if the Strapi Single Type is unavailable.
   */
  if (!page) {
    const fallbackTitle =
      locale === "zh-Hant-TW"
        ? "戰隊專屬優惠"
        : locale === "ms-MY"
          ? "Faedah Eksklusif Pasukan"
          : "Team Exclusive Benefits";

    const fallbackDescription =
      locale === "zh-Hant-TW"
        ? "加入戰隊，一路解鎖 5 大專屬福利。"
        : locale === "ms-MY"
          ? "Sertai pasukan dan buka 5 faedah eksklusif."
          : "Join the team and unlock 5 exclusive benefits.";

    return createMetadata({
      title: fallbackTitle,
      description: fallbackDescription,
      canonical: buildCanonical(locale, "/team-exclusive-benefits"),
      alternates: {
        canonical: buildCanonical(locale, "/team-exclusive-benefits"),
        languages: buildLanguageAlternates("/team-exclusive-benefits"),
      },
      locale: getSEOLocale(locale),
      type: "website",
    });
  }

  /*
   * Use the localized Strapi content as the
   * primary SEO title and description.
   */
  const title = page.Title;

  const description =
    page.Subtitle ||
    (locale === "zh-Hant-TW"
      ? "加入戰隊，一路解鎖 5 大專屬福利。"
      : locale === "ms-MY"
        ? "Sertai pasukan dan buka 5 faedah eksklusif."
        : "Join the team and unlock 5 exclusive benefits.");

  /*
   * Convert the Strapi hero image into an absolute
   * URL through createMetadata().
   */
  const image = page.HeroImage?.url ?? null;

  const canonical = buildCanonical(locale, "/team-exclusive-benefits");

  return createMetadata({
    title,
    description,
    image,
    canonical,
    alternates: {
      canonical,
      languages: buildLanguageAlternates("/team-exclusive-benefits"),
    },
    locale: getSEOLocale(locale),
    type: "website",
  });
}

/* ---------------------------------------
 * Page
 * ------------------------------------- */

export default async function TeamExclusiveBenefitsPage({
  params,
}: TeamExclusiveBenefitsPageProps) {
  const { locale } = await params;

  /* ---------------------------------------
   * Fetch localized content
   * ------------------------------------- */

  const [page, benefits] = await Promise.all([
    fetchTeamExclusiveBenefitsPage(locale),
    fetchTeamExclusiveBenefits(locale),
  ]);

  /* ---------------------------------------
   * Required Page Content
   * ------------------------------------- */

  if (!page) {
    notFound();
  }

  return (
    <>
      <main className="min-h-screen bg-[#070B15]">
        {/* ---------------------------------------
         * Hero
         * ------------------------------------- */}

        <TeamExclusiveBenefitsHero page={page} />

        {/* ---------------------------------------
         * Benefits
         * ------------------------------------- */}

        <TeamExclusiveBenefitsList benefits={benefits} />

        {/* ---------------------------------------
         * CTA
         * ------------------------------------- */}

        <TeamExclusiveBenefitsCTA page={page} />
      </main>

      {/* ---------------------------------------
       * Footer
       * ------------------------------------- */}

      <Footer locale={locale} />
    </>
  );
}
