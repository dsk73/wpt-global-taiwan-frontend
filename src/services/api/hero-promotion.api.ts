// src/services/api/hero-promotion.api.ts

import { buildQuery } from "@/lib/query-builder";
import { ENDPOINTS } from "@/lib/endpoints";
import { fetcher } from "@/lib/fetcher";
import type { Locale } from "@/providers";
import type { HeroPromotionCard } from "@/types/hero";

/**
 * ============================================================
 * Hero Promotion Card API
 * ============================================================
 *
 * Responsible ONLY for communicating with Strapi.
 *
 * Responsibilities:
 * - Build query
 * - Fetch Hero Promotion Card
 * - Return raw Strapi response
 *
 * No business logic should exist here.
 * ============================================================
 */

/**
 * Fetch Hero Promotion Card (Single Type)
 */
export async function getHeroPromotionCard(
  locale: Locale,
): Promise<HeroPromotionCard> {
  const query = buildQuery({
    locale,
    populate: {
      Benefits: {
        populate: {
          Icon: true,
        },
      },
    },
  });

  return fetcher.getSingle<HeroPromotionCard>(
    `${ENDPOINTS.HERO_PROMOTION_CARD}?${query}`,
  );
}

/**
 * Hero Promotion Card API
 */
export const heroPromotionApi = {
  getHeroPromotionCard,
};

export default heroPromotionApi;
