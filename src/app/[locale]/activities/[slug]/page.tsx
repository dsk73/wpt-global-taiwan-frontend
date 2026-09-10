// src/app/[locale]/activities/[slug]/page.tsx

import type { Metadata } from "next";
import { permanentRedirect, notFound } from "next/navigation";

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
  SITE_URL,
} from "@/lib/metadata";

/* ============================================================
   LEGACY URL REDIRECTS
============================================================ */

/**
 * Handles legacy/malformed activity URLs that were previously
 * indexed or discovered by search engines.
 *
 * The old URL used the activity title as the slug instead of
 * the actual CMS slug.
 */
const LEGACY_ACTIVITY_REDIRECTS: Record<string, string> = {
  "Join the Community Poker Festival and enjoy freerolls, exclusive events, exciting challenges, and rewards with poker players worldwide.":
    "community-poker-festival-2026",
};

/* ============================================================
   PROPS
============================================================ */

interface ActivityPageProps {
  params: Promise<{
    locale: Locale;
    slug: string;
  }>;
}

/* ============================================================
   METADATA
============================================================ */

/**
 * Generates SEO metadata for an individual activity page.
 *
 * SEO priority:
 *
 * 1. Strapi SEO fields
 * 2. Activity content fields
 * 3. Locale-aware URL information
 *
 * The activity's CMS SEO configuration remains the source
 * of truth whenever those fields are available.
 */
export async function generateMetadata({
  params,
}: ActivityPageProps): Promise<Metadata> {
  const { locale, slug } = await params;

  if (!isValidLocale(locale)) {
    notFound();
  }

  const activity = await getActivity(locale, slug);

  /**
   * Prevent non-existent activity pages from being indexed.
   */
  if (!activity) {
    return {
      title: "Activity Not Found",

      robots: {
        index: false,
        follow: false,
      },
    };
  }

  /* ==========================================================
     SEO VALUES
  ========================================================== */

  const seoTitle =
    activity.SEO?.MetaTitle?.trim() || activity.Title?.trim() || "Activity";

  const seoDescription =
    activity.SEO?.MetaDescription?.trim() || activity.Summary?.trim() || "";

  const seoImage = buildSEOImageUrl(
    activity.BannerImage?.url ?? activity.Thumbnail?.url,
  );

  /* ==========================================================
     URLS
  ========================================================== */

  const activitySlug = activity.Slug || slug;

  const canonical = buildCanonical(locale, `/activities/${activitySlug}`);

  const languages = buildLanguageAlternates(`/activities/${activitySlug}`);

  /* ==========================================================
     METADATA
  ========================================================== */

  return createMetadata({
    title: seoTitle,

    description: seoDescription,

    keywords:
      activity.SEO?.Keywords && activity.SEO.Keywords.length > 0
        ? activity.SEO.Keywords
        : undefined,

    robots: activity.SEO?.Robots ?? undefined,

    canonical,

    image: seoImage,

    locale: getOpenGraphLocale(locale),

    type: "article",

    alternates: {
      canonical,

      languages,
    },
  });
}

/* ============================================================
   STATIC PARAMS
============================================================ */

/**
 * Pre-generates all known activity detail pages for each
 * supported locale.
 *
 * Existing Strapi-driven routing behavior is preserved.
 */
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
   PAGE
============================================================ */

export default async function ActivityPage({ params }: ActivityPageProps) {
  const { locale, slug } = await params;

  if (!isValidLocale(locale)) {
    notFound();
  }

  /* ==========================================================
     LEGACY URL REDIRECT
  ========================================================== */

  const legacySlug = LEGACY_ACTIVITY_REDIRECTS[slug];

  if (legacySlug) {
    permanentRedirect(`/${locale}/activities/${legacySlug}`);
  }

  const activity = await getActivity(locale, slug);

  if (!activity) {
    notFound();
  }

  const relatedActivities = await getRelatedActivities(
    locale,
    activity.documentId,
  );

  /* ==========================================================
     STRUCTURED DATA
  ========================================================== */

  const activitySlug = activity.Slug || slug;

  const canonical = buildCanonical(locale, `/activities/${activitySlug}`);

  const activityImage = buildSEOImageUrl(
    activity.BannerImage?.url ?? activity.Thumbnail?.url,
  );

  const breadcrumbHome =
    locale === "zh-Hant-TW"
      ? "首頁"
      : locale === "ms-MY"
        ? "Laman Utama"
        : "Home";

  const breadcrumbActivities =
    locale === "zh-Hant-TW"
      ? "最新活動"
      : locale === "ms-MY"
        ? "Aktiviti"
        : "Activities";

  const structuredData = {
    "@context": "https://schema.org",

    "@graph": [
      {
        "@type": "WebPage",

        "@id": `${canonical}#webpage`,

        url: canonical,

        name: activity.Title,

        description: activity.Summary || undefined,

        inLanguage: locale,

        isPartOf: {
          "@id": `${SITE_URL}/#website`,
        },

        publisher: {
          "@id": `${SITE_URL}/#organization`,
        },

        breadcrumb: {
          "@id": `${canonical}#breadcrumb`,
        },

        mainEntity: {
          "@id": `${canonical}#article`,
        },
      },

      {
        "@type": "Article",

        "@id": `${canonical}#article`,

        url: canonical,

        headline: activity.Title,

        description: activity.Summary || undefined,

        inLanguage: locale,

        mainEntityOfPage: {
          "@id": `${canonical}#webpage`,
        },

        isPartOf: {
          "@id": `${SITE_URL}/#website`,
        },

        publisher: {
          "@id": `${SITE_URL}/#organization`,
        },

        breadcrumb: {
          "@id": `${canonical}#breadcrumb`,
        },

        ...(activityImage
          ? {
              image: [activityImage],
            }
          : {}),

        ...(activity.Author?.Name
          ? {
              author: {
                "@type": "Person",
                name: activity.Author.Name,
              },
            }
          : {}),

        ...(activity.publishedAt || activity.PublishDate
          ? {
              datePublished: activity.publishedAt || activity.PublishDate,
            }
          : {}),

        ...(activity.updatedAt
          ? {
              dateModified: activity.updatedAt,
            }
          : {}),

        ...(activity.category?.Name
          ? {
              articleSection: activity.category.Name,
            }
          : {}),

        ...(activity.Tags?.length
          ? {
              keywords: activity.Tags.join(", "),
            }
          : {}),
      },

      {
        "@type": "BreadcrumbList",

        "@id": `${canonical}#breadcrumb`,

        itemListElement: [
          {
            "@type": "ListItem",

            position: 1,

            name: breadcrumbHome,

            item: buildCanonical(locale, ""),
          },

          {
            "@type": "ListItem",

            position: 2,

            name: breadcrumbActivities,

            item: buildCanonical(locale, "/activities"),
          },

          {
            "@type": "ListItem",

            position: 3,

            name: activity.Title,

            item: canonical,
          },
        ],
      },
    ],
  };

  return (
    <>
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{
          __html: JSON.stringify(structuredData),
        }}
      />

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
