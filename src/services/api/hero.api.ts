import { buildQuery } from "@/lib/query-builder";
import { DEFAULT_SORT, ENDPOINTS } from "@/lib/endpoints";
import fetcher from "@/lib/fetcher";

import type { Locale } from "@/providers";

import type { HeroPromotionCard, HeroSlide } from "@/types/hero";

/**
 * ============================================================
 * Hero API
 * ============================================================
 *
 * Responsible ONLY for communicating with Strapi.
 *
 * Responsibilities:
 * - Build request query
 * - Perform HTTP request
 * - Return raw Strapi response
 *
 * This layer should NEVER:
 * - Transform data
 * - Filter slides
 * - Sort manually
 * - Normalize media URLs
 *
 * Those belong in hero.service.ts
 * ============================================================
 */

/**
 * ============================================================
 * Hero Slides
 * ============================================================
 */

export async function getHeroSlides(locale: Locale): Promise<HeroSlide[]> {
  const query = buildQuery({
    locale,
    populate: "*",
    sort: DEFAULT_SORT,
  });

  return fetcher.getCollection<HeroSlide>(`${ENDPOINTS.HERO}?${query}`);
}

/**
 * ============================================================
 * Hero Promotion Card (Single Type)
 * ============================================================
 */

export async function getHeroPromotionCard(
  locale: Locale,
): Promise<HeroPromotionCard | null> {
  const query = buildQuery({
    locale,
    populate: "*",
  });

  return fetcher.getSingle<HeroPromotionCard>(
    `${ENDPOINTS.HERO_PROMOTION_CARD}?${query}`,
  );
}

/**
 * ============================================================
 * Hero API
 * ============================================================
 */

export const heroApi = {
  getHeroSlides,
  getHeroPromotionCard,
};

export default heroApi;
