// src/lib/metadata.ts

import type { Metadata } from "next";

import type { Locale } from "@/providers";

/* ============================================================
   SITE CONFIG
============================================================ */

const SITE_NAME = "WPT Global Taiwan";

const SITE_URL =
  process.env.NEXT_PUBLIC_SITE_URL ?? "https://wptglobal-asia.com";

/* ============================================================
   SEO DATA
============================================================ */

export interface SEOData {
  title: string;
  description: string;

  image?: string | null;

  keywords?: string[] | null;

  robots?: string | null;

  canonical?: string | null;

  locale?: string;

  type?: "website" | "article";

  alternates?: {
    canonical?: string | null;
    languages?: Record<string, string>;
  };
}

/* ============================================================
   SITE URL
============================================================ */

/**
 * Builds an absolute URL for the website.
 *
 * Examples:
 *
 * buildSiteUrl()
 * => https://wptglobal-asia.com
 *
 * buildSiteUrl("/en/about")
 * => https://wptglobal-asia.com/en/about
 */
export function buildSiteUrl(path = ""): string {
  if (!path) {
    return SITE_URL;
  }

  return `${SITE_URL}${path.startsWith("/") ? path : `/${path}`}`;
}

/* ============================================================
   CANONICAL
============================================================ */

/**
 * Builds a locale-aware canonical URL.
 *
 * The supplied path must NOT contain a locale prefix.
 *
 * Example:
 *
 * buildCanonical("zh-Hant-TW", "/about")
 *
 * => https://wptglobal-asia.com/zh-Hant-TW/about
 */
export function buildCanonical(locale: Locale, path = ""): string {
  const normalizedPath = path ? (path.startsWith("/") ? path : `/${path}`) : "";

  return `${SITE_URL}/${locale}${normalizedPath}`;
}

/* ============================================================
   HREFLANG
============================================================ */

/**
 * Builds hreflang URLs for all supported locales.
 *
 * IMPORTANT:
 * The supplied path must NOT contain a locale prefix.
 *
 * Example:
 *
 * buildLanguageAlternates("/about")
 *
 * =>
 * {
 *   "zh-Hant-TW": "https://wptglobal-asia.com/zh-Hant-TW/about",
 *   "en": "https://wptglobal-asia.com/en/about",
 *   "ms-MY": "https://wptglobal-asia.com/ms-MY/about",
 *   "x-default": "https://wptglobal-asia.com/zh-Hant-TW/about"
 * }
 */
export function buildLanguageAlternates(path = ""): Record<string, string> {
  const normalizedPath = path ? (path.startsWith("/") ? path : `/${path}`) : "";

  return {
    "zh-Hant-TW": `${SITE_URL}/zh-Hant-TW${normalizedPath}`,
    en: `${SITE_URL}/en${normalizedPath}`,
    "ms-MY": `${SITE_URL}/ms-MY${normalizedPath}`,
    "x-default": `${SITE_URL}/zh-Hant-TW${normalizedPath}`,
  };
}

/* ============================================================
   SEO IMAGE
============================================================ */

/**
 * Converts a relative image URL into an absolute URL.
 *
 * Strapi commonly returns paths such as:
 *
 * /uploads/og-image.jpg
 *
 * while SEO metadata requires an absolute URL.
 */
export function buildSEOImageUrl(image?: string | null): string | undefined {
  if (!image) {
    return undefined;
  }

  if (image.startsWith("http://") || image.startsWith("https://")) {
    return image;
  }

  return buildSiteUrl(image);
}

/* ============================================================
   ROBOTS
============================================================ */

/**
 * Normalizes a Strapi robots value.
 *
 * Examples:
 *
 * "index, follow"
 * "noindex, nofollow"
 * "index, nofollow"
 * "noindex, follow"
 */
export function buildRobots(
  robots?: string | null,
): Metadata["robots"] | undefined {
  if (!robots) {
    return undefined;
  }

  const normalized = robots
    .toLowerCase()
    .split(",")
    .map((value) => value.trim())
    .filter(Boolean);

  return {
    index: !normalized.includes("noindex"),
    follow: !normalized.includes("nofollow"),
  };
}

/* ============================================================
   METADATA CREATOR
============================================================ */

/**
 * Creates consistent Next.js metadata for all pages.
 *
 * This is the central SEO metadata helper used throughout
 * the application.
 */
export function createMetadata({
  title,
  description,
  image,
  keywords,
  robots,
  canonical,
  locale = "zh-Hant-TW",
  type = "website",
  alternates,
}: SEOData): Metadata {
  const absoluteImage = buildSEOImageUrl(image);

  const resolvedCanonical = canonical ?? undefined;

  return {
    metadataBase: new URL(SITE_URL),

    title,

    description,

    keywords: keywords && keywords.length > 0 ? keywords : undefined,

    robots: buildRobots(robots),

    alternates:
      resolvedCanonical || alternates?.languages
        ? {
            canonical: resolvedCanonical,
            languages: alternates?.languages,
          }
        : undefined,

    openGraph: {
      type,

      siteName: SITE_NAME,

      locale,

      title,

      description,

      url: resolvedCanonical ?? SITE_URL,

      images: absoluteImage
        ? [
            {
              url: absoluteImage,
              width: 1200,
              height: 630,
              alt: title,
            },
          ]
        : undefined,
    },

    twitter: {
      card: "summary_large_image",

      title,

      description,

      images: absoluteImage ? [absoluteImage] : undefined,
    },
  };
}

/* ============================================================
   PAGE TITLE
============================================================ */

/**
 * Builds the standard SEO title format.
 *
 * Example:
 *
 * buildPageTitle("Teaching Center")
 *
 * => Teaching Center | WPT Global Taiwan
 */
export function buildPageTitle(title: string): string {
  return `${title} | ${SITE_NAME}`;
}

/* ============================================================
   OPEN GRAPH LOCALE
============================================================ */

/**
 * Returns the locale-specific Open Graph locale.
 */
export function getOpenGraphLocale(locale: Locale): string {
  switch (locale) {
    case "zh-Hant-TW":
      return "zh_TW";

    case "ms-MY":
      return "ms_MY";

    case "en":
      return "en_US";

    default:
      return "zh_TW";
  }
}

/* ============================================================
   SITE CONFIG EXPORTS
============================================================ */

export { SITE_NAME, SITE_URL };
