// src/app/sitemap.ts

import type { MetadataRoute } from "next";

import { SUPPORTED_LOCALES } from "@/config/languages";
import type { Locale } from "@/providers";

import { buildCanonical, buildLanguageAlternates } from "@/lib/metadata";

import { getActivitySlugs } from "@/services/activities.service";
import { fetchTeachingGuides } from "@/services/teaching-center.service";
import { getAllPokerExchangeArticles } from "@/services/poker-exchange.service";

/* ============================================================
   STATIC ROUTES
============================================================ */

/**
 * Static routes that should be included in the SEO sitemap.
 *
 * Register and Download are intentionally excluded because
 * those actions use external landing URLs and are not intended
 * to function as standalone SEO/content pages.
 *
 * Dynamic CMS routes are added separately below.
 */
const STATIC_ROUTES = [
  "",
  "/about",
  "/activities",
  "/community",
  "/contact",
  "/faq",
  "/legal",
  "/legal/bonus-policy",
  "/legal/cookie-policy",
  "/legal/customer-acceptance-policy",
  "/legal/customer-dispute-resolution",
  "/legal/kyc-policy",
  "/legal/privacy-policy",
  "/legal/terms-and-conditions",
  "/resources",
  "/teaching-center",
  "/poker-exchange",
  "/withdrawal",
  "/referral-code",
] as const;

/* ============================================================
   PRIORITY
============================================================ */

function getPriority(route: string): number {
  if (route === "") {
    return 1;
  }

  if (
    route === "/activities" ||
    route === "/teaching-center" ||
    route === "/poker-exchange" ||
    route === "/withdrawal" ||
    route === "/referral-code"
  ) {
    return 0.8;
  }

  if (route.startsWith("/legal")) {
    return 0.5;
  }

  return 0.7;
}

/* ============================================================
   CHANGE FREQUENCY
============================================================ */

function getChangeFrequency(
  route: string,
): MetadataRoute.Sitemap[number]["changeFrequency"] {
  if (route === "") {
    return "weekly";
  }

  if (
    route === "/activities" ||
    route === "/teaching-center" ||
    route === "/poker-exchange"
  ) {
    return "weekly";
  }

  if (route.startsWith("/legal")) {
    return "yearly";
  }

  return "monthly";
}

/* ============================================================
   STATIC SITEMAP ENTRIES
============================================================ */

function buildStaticEntries(): MetadataRoute.Sitemap {
  const entries: MetadataRoute.Sitemap = [];

  for (const locale of SUPPORTED_LOCALES) {
    const currentLocale = locale as Locale;

    for (const route of STATIC_ROUTES) {
      const url = buildCanonical(currentLocale, route);

      const languages = buildLanguageAlternates(route);

      entries.push({
        url,

        alternates: {
          languages,
        },

        changeFrequency: getChangeFrequency(route),

        priority: getPriority(route),
      });
    }
  }

  return entries;
}

/* ============================================================
   ACTIVITY ENTRIES
============================================================ */

async function buildActivityEntries(): Promise<MetadataRoute.Sitemap> {
  const entries: MetadataRoute.Sitemap = [];

  for (const locale of SUPPORTED_LOCALES) {
    const currentLocale = locale as Locale;

    try {
      const slugs = await getActivitySlugs(currentLocale);

      for (const slug of slugs) {
        if (!slug) {
          continue;
        }

        const route = `/activities/${slug}`;

        const url = buildCanonical(currentLocale, route);

        const languages = buildLanguageAlternates(route);

        entries.push({
          url,

          alternates: {
            languages,
          },

          changeFrequency: "weekly",

          priority: 0.7,
        });
      }
    } catch (error) {
      console.error(
        `Failed to build activity sitemap entries for locale: ${currentLocale}`,
        error,
      );
    }
  }

  return entries;
}

/* ============================================================
   TEACHING CENTER ENTRIES
============================================================ */

async function buildTeachingCenterEntries(): Promise<MetadataRoute.Sitemap> {
  const entries: MetadataRoute.Sitemap = [];

  for (const locale of SUPPORTED_LOCALES) {
    const currentLocale = locale as Locale;

    try {
      const guides = await fetchTeachingGuides(currentLocale);

      for (const guide of guides) {
        if (!guide.Slug) {
          continue;
        }

        const route = `/teaching-center/${guide.Slug}`;

        const url = buildCanonical(currentLocale, route);

        const languages = buildLanguageAlternates(route);

        entries.push({
          url,

          alternates: {
            languages,
          },

          changeFrequency: "monthly",

          priority: 0.7,
        });
      }
    } catch (error) {
      console.error(
        `Failed to build teaching center sitemap entries for locale: ${currentLocale}`,
        error,
      );
    }
  }

  return entries;
}

/* ============================================================
   POKER EXCHANGE ENTRIES
============================================================ */

async function buildPokerExchangeEntries(): Promise<MetadataRoute.Sitemap> {
  const entries: MetadataRoute.Sitemap = [];

  for (const locale of SUPPORTED_LOCALES) {
    const currentLocale = locale as Locale;

    try {
      const articles = await getAllPokerExchangeArticles(currentLocale);

      for (const article of articles) {
        if (!article.Slug) {
          continue;
        }

        const route = `/poker-exchange/${article.Slug}`;

        const url = buildCanonical(currentLocale, route);

        const languages = buildLanguageAlternates(route);

        entries.push({
          url,

          alternates: {
            languages,
          },

          changeFrequency: "monthly",

          priority: 0.7,
        });
      }
    } catch (error) {
      console.error(
        `Failed to build poker exchange sitemap entries for locale: ${currentLocale}`,
        error,
      );
    }
  }

  return entries;
}

/* ============================================================
   SITEMAP
============================================================ */

export default async function sitemap(): Promise<MetadataRoute.Sitemap> {
  const [
    staticEntries,
    activityEntries,
    teachingCenterEntries,
    pokerExchangeEntries,
  ] = await Promise.all([
    Promise.resolve(buildStaticEntries()),
    buildActivityEntries(),
    buildTeachingCenterEntries(),
    buildPokerExchangeEntries(),
  ]);

  return [
    ...staticEntries,
    ...activityEntries,
    ...teachingCenterEntries,
    ...pokerExchangeEntries,
  ];
}
