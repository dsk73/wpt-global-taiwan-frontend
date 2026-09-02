// src/app/[locale]/teaching-center/[slug]/page.tsx

import type { Metadata } from "next";
import { notFound } from "next/navigation";

import { Footer } from "@/features/footer";

import {
  TeachingGuideHero,
  TeachingGuideMedia,
  TeachingGuideSections,
} from "@/features/teaching-center-detail";

import { fetchTeachingGuide } from "@/services";

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

interface TeachingCenterDetailPageProps {
  params: Promise<{
    locale: Locale;
    slug: string;
  }>;
}

/* ============================================================
   SEO CONTENT
============================================================ */

const SEO_DESCRIPTION_PREFIX: Record<Locale, string> = {
  en: "Learn more with this WPT Global Taiwan poker teaching guide covering practical poker rules, strategies, tips and techniques.",

  "zh-Hant-TW":
    "透過 WPT Global Taiwan 撲克教學指南，了解實用的撲克規則、策略、技巧與遊戲方法。",

  "ms-MY":
    "Pelajari lebih lanjut melalui panduan pembelajaran poker WPT Global Taiwan yang merangkumi peraturan, strategi, tip dan teknik poker praktikal.",
};

/* ============================================================
   METADATA
============================================================ */

export async function generateMetadata({
  params,
}: TeachingCenterDetailPageProps): Promise<Metadata> {
  const { locale, slug } = await params;

  /* ----------------------------------------------------------
     Validate locale
  ---------------------------------------------------------- */

  if (!isValidLocale(locale)) {
    notFound();
  }

  /* ----------------------------------------------------------
     Fetch teaching guide
  ---------------------------------------------------------- */

  const guide = await fetchTeachingGuide(slug, locale);

  /* ----------------------------------------------------------
     Guide not found
  ---------------------------------------------------------- */

  if (!guide) {
    return {
      title: "Teaching Guide",
      robots: {
        index: false,
        follow: false,
      },
    };
  }

  /* ----------------------------------------------------------
     SEO title
  ---------------------------------------------------------- */

  const title = guide.Title;

  /* ----------------------------------------------------------
     SEO description
  ---------------------------------------------------------- */

  const description = `${SEO_DESCRIPTION_PREFIX[locale]} ${guide.Title}`;

  /* ----------------------------------------------------------
     Canonical URL
  ---------------------------------------------------------- */

  const canonical = buildCanonical(locale, `/teaching-center/${guide.Slug}`);

  /* ----------------------------------------------------------
     Hreflang / language alternates
  ---------------------------------------------------------- */

  const languages = buildLanguageAlternates(`/teaching-center/${guide.Slug}`);

  /* ----------------------------------------------------------
     Metadata
  ---------------------------------------------------------- */

  return createMetadata({
    title: buildPageTitle(title),

    description,

    canonical,

    locale: getOpenGraphLocale(locale),

    type: "article",

    alternates: {
      canonical,
      languages,
    },
  });
}

/* ============================================================
   PAGE
============================================================ */

export default async function TeachingCenterDetailPage({
  params,
}: TeachingCenterDetailPageProps) {
  const { locale, slug } = await params;

  /* ----------------------------------------------------------
     Validate locale
  ---------------------------------------------------------- */

  if (!isValidLocale(locale)) {
    notFound();
  }

  /* ----------------------------------------------------------
     Fetch teaching guide
  ---------------------------------------------------------- */

  const guide = await fetchTeachingGuide(slug, locale);

  /* ----------------------------------------------------------
     Guide not found
  ---------------------------------------------------------- */

  if (!guide) {
    notFound();
  }

  return (
    <>
      <main className="min-h-screen bg-[#070B15] pt-32">
        {/* ======================================================
            HERO
        ====================================================== */}

        <TeachingGuideHero guide={guide} />

        {/* ======================================================
            GUIDE MEDIA
        ====================================================== */}

        <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
          <TeachingGuideMedia guide={guide} />
        </div>

        {/* ======================================================
            GUIDE SECTIONS
        ====================================================== */}

        <div className="mx-auto max-w-7xl px-4 py-16 sm:px-6 lg:px-8">
          <TeachingGuideSections guide={guide} />

          {/* ====================================================
              CTA
          ==================================================== */}

          {guide.CTA && (
            <section className="mt-20 border-t border-white/10 pt-12">
              <div
                className="
                  flex
                  flex-col
                  items-center
                  justify-between
                  gap-6
                  rounded-3xl
                  border
                  border-white/10
                  bg-white/5
                  px-6
                  py-8

                  sm:flex-row
                  sm:px-10
                "
              >
                <p
                  className="
                    text-center
                    text-lg
                    font-medium
                    text-white

                    sm:text-left
                  "
                >
                  Ready to get started?
                </p>

                <a
                  href={guide.CTA.URL}
                  target={guide.CTA.OpenInNewTab ? "_blank" : undefined}
                  rel={
                    guide.CTA.OpenInNewTab ? "noopener noreferrer" : undefined
                  }
                  className="
                    inline-flex
                    shrink-0
                    items-center
                    justify-center
                    rounded-xl
                    bg-(--primary)
                    px-7
                    py-3
                    font-semibold
                    text-black
                    transition-all
                    duration-300
                    hover:scale-105
                  "
                >
                  {guide.CTA.Label}
                </a>
              </div>
            </section>
          )}
        </div>
      </main>

      {/* ======================================================
          FOOTER
      ====================================================== */}

      <Footer locale={locale} />
    </>
  );
}
