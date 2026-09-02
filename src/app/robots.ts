// src/app/robots.ts

import type { MetadataRoute } from "next";

import { buildSiteUrl } from "@/lib/metadata";

/* ============================================================
   ROBOTS
============================================================ */

/**
 * Global robots.txt configuration.
 *
 * Allows search engines to crawl all public website pages
 * and provides the canonical XML sitemap location.
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
