// src/app/[locale]/activities/[slug]/page.tsx

import type { Metadata } from "next";
import { notFound } from "next/navigation";

import Header from "@/features/header/components/Header";
import { Footer } from "@/features/footer";

import ActivityHero from "@/features/activity-detail/components/ActivityHero";
import ActivityContent from "@/features/activity-detail/components/ActivityContent";
import ActivityGallery from "@/features/activity-detail/components/ActivityGallery";
import RelatedActivities from "@/features/activity-detail/components/RelatedActivities";

import {
  getActivity,
  getRelatedActivities,
  getActivitySlugs,
} from "@/services/activities.service";

import type { Locale } from "@/providers";

import { isValidLocale } from "@/config/languages";

import {
  buildCanonical,
  buildLanguageAlternates,
  buildSEOImageUrl,
  createMetadata,
  getOpenGraphLocale,
} from "@/lib/metadata";

/* ============================================================
   Props
============================================================ */

interface ActivityPageProps {
  params: Promise<{
    locale: Locale;
    slug: string;
  }>;
}

/* ============================================================
   Metadata
============================================================ */

/**
 * Generate SEO metadata from the activity's Strapi SEO fields.
 *
 * CMS SEO fields take priority over the activity's normal
 * content fields.
 */
export async function generateMetadata({
  params,
}: ActivityPageProps): Promise<Metadata> {
  const { locale, slug } = await params;

  if (!isValidLocale(locale)) {
    notFound();
  }

  const activity = await getActivity(locale, slug);

  if (!activity) {
    return {
      title: "Activity Not Found",
      robots: {
        index: false,
        follow: false,
      },
    };
  }

  const title = activity.SEO?.MetaTitle ?? activity.Title;

  const description = activity.SEO?.MetaDescription ?? activity.Summary ?? "";

  const image = buildSEOImageUrl(
    activity.BannerImage?.url ?? activity.Thumbnail?.url,
  );

  const canonical =
    activity.SEO?.CanonicalURL ||
    buildCanonical(locale, `/activities/${activity.Slug}`);

  const languages = buildLanguageAlternates(`/activities/${activity.Slug}`);

  return createMetadata({
    title,

    description,

    keywords: activity.SEO?.Keywords ?? undefined,

    robots: activity.SEO?.Robots ?? undefined,

    canonical,

    image,

    locale: getOpenGraphLocale(locale),

    type: "article",

    alternates: {
      canonical,
      languages,
    },
  });
}

/* ============================================================
   Static Params
============================================================ */

export async function generateStaticParams() {
  const locales: Locale[] = ["zh-Hant-TW", "en", "ms-MY"];

  const params = await Promise.all(
    locales.map(async (locale) => {
      const slugs = await getActivitySlugs(locale);

      return slugs.map((slug) => ({
        locale,
        slug,
      }));
    }),
  );

  return params.flat();
}

/* ============================================================
   Page
============================================================ */

export default async function ActivityPage({ params }: ActivityPageProps) {
  const { locale, slug } = await params;

  if (!isValidLocale(locale)) {
    notFound();
  }

  const activity = await getActivity(locale, slug);

  if (!activity) {
    notFound();
  }

  const relatedActivities = await getRelatedActivities(
    locale,
    activity.documentId,
  );

  return (
    <>
      <Header />

      <main className="min-h-screen bg-[#070B15]">
        <ActivityHero activity={activity} locale={locale} />

        <section className="mx-auto max-w-7xl px-4 py-20 sm:px-6 lg:px-8">
          <ActivityContent content={activity.Content} />

          <ActivityGallery
            gallery={activity.Gallery}
            locale={locale}
            className="mt-24"
          />

          <RelatedActivities activities={relatedActivities} locale={locale} />
        </section>
      </main>

      <Footer locale={locale} />
    </>
  );
}
