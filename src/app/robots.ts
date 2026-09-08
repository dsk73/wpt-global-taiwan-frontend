// src/app/robots.ts

import type { MetadataRoute } from "next";

import { buildSiteUrl } from "@/lib/metadata";

/* ============================================================
   ROBOTS
============================================================ */

/**
 * Global robots.txt configuration.
 *
 * Search engines are allowed to crawl all public website
 * routes. URLs that should not be part of the SEO sitemap
 * are handled through sitemap/canonical/redirect decisions,
 * not by blocking them in robots.txt.
 */
export default function robots(): MetadataRoute.Robots {
  return {
    rules: {
      userAgent: "*",
      allow: "/",
    },

    sitemap: buildSiteUrl("/sitemap.xml"),
  };
}
