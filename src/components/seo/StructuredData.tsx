// src/components/seo/StructuredData.tsx

import type { Locale } from "@/providers";
import { SITE_NAME, SITE_URL } from "@/lib/metadata";

/* ============================================================
   TYPES
============================================================ */

type StructuredDataProps = {
  locale: Locale;
};

/* ============================================================
   SITE STRUCTURED DATA
============================================================ */

/**
 * Global JSON-LD structured data shared across all localized
 * pages.
 *
 * Includes:
 * - Organization
 * - WebSite
 *
 * Page-specific structured data such as BreadcrumbList,
 * Article, and FAQPage will be added at the relevant page level.
 */
export default function StructuredData({ locale }: StructuredDataProps) {
  const structuredData = {
    "@context": "https://schema.org",

    "@graph": [
      {
        "@type": "Organization",

        "@id": `${SITE_URL}/#organization`,

        name: SITE_NAME,

        url: SITE_URL,
      },

      {
        "@type": "WebSite",

        "@id": `${SITE_URL}/#website`,

        url: SITE_URL,

        name: SITE_NAME,

        inLanguage: locale,

        publisher: {
          "@id": `${SITE_URL}/#organization`,
        },
      },
    ],
  };

  return (
    <script
      type="application/ld+json"
      dangerouslySetInnerHTML={{
        __html: JSON.stringify(structuredData),
      }}
    />
  );
}
