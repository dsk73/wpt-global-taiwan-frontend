// src/app/sitemap.ts

import type { MetadataRoute } from "next";

import { SUPPORTED_LOCALES } from "@/config/languages";
import type { Locale } from "@/providers";

import { buildCanonical, buildLanguageAlternates } from "@/lib/metadata";

/* ============================================================
   STATIC ROUTES
============================================================ */

/**
 * Static routes currently confirmed to exist.
 *
 * Dynamic CMS routes such as activities, teaching guides,
 * poker exchange articles, and tutorials will be added
 * separately once their Strapi data is connected.
 */
const STATIC_ROUTES = [
  "",
  "/about",
  "/activities",
  "/community",
  "/contact",
  "/download",
  "/faq",
  "/legal",
  "/legal/bonus-policy",
  "/legal/cookie-policy",
  "/legal/customer-acceptance-policy",
  "/legal/customer-dispute-resolution",
  "/legal/kyc-policy",
  "/legal/privacy-policy",
  "/legal/terms-and-conditions",
  "/register",
  "/resources",
  "/teaching-center",
  "/poker-exchange",
] as const;

/* ============================================================
   PRIORITY
============================================================ */

function getPriority(route: string): number {
  if (route === "") {
    return 1;
  }

  if (route === "/register") {
    return 0.9;
  }

  if (
    route === "/activities" ||
    route === "/teaching-center" ||
    route === "/poker-exchange"
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
   SITEMAP
============================================================ */

export default function sitemap(): MetadataRoute.Sitemap {
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
