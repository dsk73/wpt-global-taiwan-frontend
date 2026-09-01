// src/app/robots.ts

import type { MetadataRoute } from "next";

import { buildSiteUrl } from "@/lib/metadata";

/**
 * Global robots.txt configuration.
 *
 * Allows search engines to crawl the public website
 * and points them to the XML sitemap.
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
