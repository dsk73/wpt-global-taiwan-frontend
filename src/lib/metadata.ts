// src/lib/metadata.ts

import type { Metadata } from "next";

import type { Locale } from "@/providers";

/* ============================================================
   SITE CONFIG
============================================================ */

const SITE_NAME = "WPT Global Taiwan";

const SITE_URL = (
  process.env.NEXT_PUBLIC_SITE_URL ?? "https://wptglobal-asia.com"
).replace(/\/+$/, "");

/* ============================================================
   SUPPORTED LOCALES
============================================================ */

const DEFAULT_LOCALE: Locale = "zh-Hant-TW";

/* ============================================================
   SEO DATA
============================================================ */

export interface SEOData {
  /**
   * Page title.
   *
   * The global title template in app/layout.tsx automatically
   * appends "| WPT Global Taiwan".
   */
  title: string;

  /**
   * Search-engine description and social sharing description.
   */
  description: string;

  /**
   * Optional Open Graph / Twitter image.
   *
   * Can be:
   * - Absolute URL
   * - Relative path such as /uploads/og-image.jpg
   */
  image?: string | null;

  /**
   * Optional page-specific SEO keywords.
   */
  keywords?: string[] | null;

  /**
   * Optional robots directive from CMS.
   *
   * Examples:
   * - index, follow
   * - noindex, nofollow
   * - index, nofollow
   * - noindex, follow
   */
  robots?: string | null;

  /**
   * Canonical URL.
   *
   * Should normally be an absolute URL.
   */
  canonical?: string | null;

  /**
   * Open Graph locale.
   *
   * Examples:
   * - zh_TW
   * - en_US
   * - ms_MY
   */
  locale?: string;

  /**
   * Open Graph content type.
   */
  type?: "website" | "article";

  /**
   * Optional alternate URLs.
   */
  alternates?: {
    canonical?: string | null;

    languages?: Record<string, string>;
  };
}

/* ============================================================
   URL HELPERS
============================================================ */

/**
 * Normalizes a path so it always starts with "/".
 *
 * Examples:
 *
 * normalizePath("")
 * => ""
 *
 * normalizePath("about")
 * => "/about"
 *
 * normalizePath("/about")
 * => "/about"
 */
function normalizePath(path = ""): string {
  if (!path) {
    return "";
  }

  return path.startsWith("/") ? path : `/${path}`;
}

/**
 * Removes duplicate trailing slashes from a URL while preserving
 * the root URL.
 */
function normalizeUrl(url: string): string {
  return url.replace(/([^:]\/)\/+/g, "$1").replace(/\/+$/, "");
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
 *
 * buildSiteUrl("en/about")
 * => https://wptglobal-asia.com/en/about
 */
export function buildSiteUrl(path = ""): string {
  const normalizedPath = normalizePath(path);

  if (!normalizedPath) {
    return SITE_URL;
  }

  return `${SITE_URL}${normalizedPath}`;
}

/* ============================================================
   CANONICAL
============================================================ */

/**
 * Builds a locale-aware canonical URL.
 *
 * IMPORTANT:
 * The supplied path must NOT contain a locale prefix.
 *
 * Example:
 *
 * buildCanonical("zh-Hant-TW", "/about")
 *
 * =>
 * https://wptglobal-asia.com/zh-Hant-TW/about
 */
export function buildCanonical(locale: Locale, path = ""): string {
  const normalizedPath = normalizePath(path);

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
 *   "zh-Hant-TW":
 *     "https://wptglobal-asia.com/zh-Hant-TW/about",
 *
 *   "en":
 *     "https://wptglobal-asia.com/en/about",
 *
 *   "ms-MY":
 *     "https://wptglobal-asia.com/ms-MY/about",
 *
 *   "x-default":
 *     "https://wptglobal-asia.com/zh-Hant-TW/about"
 * }
 */
export function buildLanguageAlternates(path = ""): Record<string, string> {
  const normalizedPath = normalizePath(path);

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
 *
 * Absolute URLs are returned unchanged.
 */
export function buildSEOImageUrl(image?: string | null): string | undefined {
  if (!image) {
    return undefined;
  }

  const trimmedImage = image.trim();

  if (!trimmedImage) {
    return undefined;
  }

  if (
    trimmedImage.startsWith("http://") ||
    trimmedImage.startsWith("https://")
  ) {
    return trimmedImage;
  }

  return buildSiteUrl(trimmedImage);
}

/* ============================================================
   ROBOTS
============================================================ */

/**
 * Normalizes a Strapi robots value into the Next.js Metadata
 * robots format.
 *
 * Examples:
 *
 * "index, follow"
 * => { index: true, follow: true }
 *
 * "noindex, nofollow"
 * => { index: false, follow: false }
 *
 * "index, nofollow"
 * => { index: true, follow: false }
 *
 * "noindex, follow"
 * => { index: false, follow: true }
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

  if (normalized.length === 0) {
    return undefined;
  }

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
 *
 * SEO features handled here:
 *
 * - Page title
 * - Meta description
 * - Keywords
 * - Robots
 * - Canonical URL
 * - Hreflang
 * - Open Graph
 * - Twitter Card
 * - Locale
 * - Social sharing image
 * - Metadata base URL
 */
export function createMetadata({
  title,
  description,
  image,
  keywords,
  robots,
  canonical,
  locale = "zh-TW",
  type = "website",
  alternates,
}: SEOData): Metadata {
  const absoluteImage = buildSEOImageUrl(image);

  /**
   * Canonical URLs should be absolute URLs.
   *
   * If a relative canonical is supplied by existing page code,
   * convert it into an absolute URL instead of generating an
   * invalid/incomplete canonical reference.
   */
  const resolvedCanonical = canonical
    ? canonical.startsWith("http://") || canonical.startsWith("https://")
      ? normalizeUrl(canonical)
      : buildSiteUrl(canonical)
    : undefined;

  /**
   * Normalize alternate URLs so relative URLs cannot accidentally
   * produce incomplete hreflang references.
   */
  const resolvedLanguages = alternates?.languages
    ? Object.fromEntries(
        Object.entries(alternates.languages).map(([language, url]) => [
          language,
          url.startsWith("http://") || url.startsWith("https://")
            ? normalizeUrl(url)
            : buildSiteUrl(url),
        ]),
      )
    : undefined;

  const resolvedAlternates =
    resolvedCanonical || resolvedLanguages
      ? {
          canonical: resolvedCanonical,

          languages: resolvedLanguages,
        }
      : undefined;

  return {
    metadataBase: new URL(SITE_URL),

    applicationName: SITE_NAME,

    title,

    description,

    keywords: keywords && keywords.length > 0 ? keywords : undefined,

    robots: buildRobots(robots),

    alternates: resolvedAlternates,

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
 * Returns the page title only.
 *
 * The global Next.js title template in app/layout.tsx
 * automatically adds:
 *
 * | WPT Global Taiwan
 *
 * Example:
 *
 * buildPageTitle("Teaching Center")
 *
 * => "Teaching Center"
 *
 * Final browser title:
 *
 * Teaching Center | WPT Global Taiwan
 */
export function buildPageTitle(title: string): string {
  return title;
}

/* ============================================================
   OPEN GRAPH LOCALE
============================================================ */

/**
 * Returns the locale-specific Open Graph locale.
 *
 * Supported website locales:
 *
 * zh-Hant-TW => zh_TW
 * en        => en_US
 * ms-MY     => ms_MY
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
   SEO LOCALE HELPER
============================================================ */

/**
 * Returns the Open Graph locale for a website locale.
 *
 * This helper provides a safe default for pages where the locale
 * may be optional.
 */
export function getSEOLocale(locale: Locale = DEFAULT_LOCALE): string {
  return getOpenGraphLocale(locale);
}

/* ============================================================
   SITE CONFIG EXPORTS
============================================================ */

export { SITE_NAME, SITE_URL };
