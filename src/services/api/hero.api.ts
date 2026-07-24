import { buildQuery } from "@/lib/query-builder";
import { DEFAULT_SORT, ENDPOINTS } from "@/lib/endpoints";
import fetcher from "@/lib/fetcher";
import type { Locale } from "@/providers";
import type { HeroSlide } from "@/types/hero";

/**
 * ============================================================
 * Hero API
 * ============================================================
 *
 * This layer is responsible ONLY for communicating with Strapi.
 *
 * Responsibilities:
 * - Build request query
 * - Perform HTTP request
 * - Return raw Strapi response
 *
 * This layer should NEVER:
 * - Filter slides
 * - Sort slides manually
 * - Normalize image URLs
 * - Build button objects
 * - Transform DTOs
 *
 * Those responsibilities belong to hero.service.ts.
 * ============================================================
 */

/**
 * Fetch all Hero slides for the requested locale.
 */
export async function getHeroSlides(
  locale: Locale,
): Promise<HeroSlide[]> {
  const query = buildQuery({
    locale,
    populate: "*",
    sort: DEFAULT_SORT,
  });

  return fetcher.getCollection<HeroSlide>(
    `${ENDPOINTS.HERO}?${query}`,
  );
}

/**
 * Hero API
 */
export const heroApi = {
  getHeroSlides,
};

export default heroApi;