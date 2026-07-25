import type { Metadata } from "next";

export interface SEOData {
  title: string;
  description: string;

  image?: string | null;

  keywords?: string[] | null;

  robots?: string | null;

  canonical?: string | null;

  locale?: string;

  type?: "website" | "article";
}

const SITE_NAME = "WPT Global Taiwan";

const SITE_URL =
  process.env.NEXT_PUBLIC_SITE_URL ??
  "https://wptglobal.com.tw";

export function createMetadata({
  title,
  description,
  image,
  keywords,
  robots,
  canonical,
  locale = "zh-Hant-TW",
  type = "website",
}: SEOData): Metadata {
  const metadata: Metadata = {
    metadataBase: new URL(SITE_URL),

    title,

    description,

    keywords: keywords ?? undefined,

    robots: robots ?? undefined,

    alternates: canonical
      ? {
          canonical,
        }
      : undefined,

    openGraph: {
      type,

      siteName: SITE_NAME,

      locale,

      title,

      description,

      url: canonical,

      images: image
        ? [
            {
              url: image,

              width: 1200,

              height: 630,

              alt: title,
            },
          ]
        : [],
    },

    twitter: {
      card: "summary_large_image",

      title,

      description,

      images: image ? [image] : [],
    },
  };

  return metadata;
}

export function buildCanonical(
  locale: string,
  path = "",
) {
  return `${SITE_URL}/${locale}${path}`;
}

export function buildPageTitle(
  title: string,
) {
  return `${title} | ${SITE_NAME}`;
}