import { getHeroSlides as fetchHeroSlides } from "@/services/api/hero.api";

import { getHeroPromotionCard as fetchHeroPromotionCard } from "@/services/api/hero-promotion.api";

import type { Locale } from "@/providers";

import type { HeroPromotionCard, HeroSlide } from "@/types/hero";

/**
 * ============================================================
 * Hero Service
 * ============================================================
 *
 * Business layer between the UI and API.
 *
 * Responsibilities:
 * - Fetch Hero slides
 * - Fetch Hero Promotion Card
 * - Filter inactive slides
 * - Sort slides
 * - Return UI-safe data
 *
 * React components should ONLY consume this service.
 * ============================================================
 */

/**
 * ============================================================
 * Get all active Hero slides.
 * ============================================================
 */

export async function getHeroSlides(locale: Locale): Promise<HeroSlide[]> {
  try {
    const slides = await fetchHeroSlides(locale);

    return slides
      .filter((slide) => slide.Active)
      .sort(
        (a, b) =>
          (a.DisplayOrder ?? Number.MAX_SAFE_INTEGER) -
          (b.DisplayOrder ?? Number.MAX_SAFE_INTEGER),
      );
  } catch (error) {
    console.error("[Hero Service] Failed to fetch Hero slides.", error);

    return [];
  }
}

/**
 * ============================================================
 * Get Hero Promotion Card
 * ============================================================
 */

export async function getHeroPromotionCard(
  locale: Locale,
): Promise<HeroPromotionCard | null> {
  try {
    return await fetchHeroPromotionCard(locale);
  } catch (error) {
    console.error("[Hero Service] Failed to fetch Hero Promotion Card.", error);

    return null;
  }
}

/**
 * ============================================================
 * Get Hero Data
 * ============================================================
 *
 * Fetches both:
 * - Hero Slides
 * - Hero Promotion Card
 *
 * This is the preferred method for the homepage Hero.
 * ============================================================
 */

export async function getHeroData(locale: Locale): Promise<{
  slides: HeroSlide[];
  promotionCard: HeroPromotionCard | null;
}> {
  const [slides, promotionCard] = await Promise.all([
    getHeroSlides(locale),
    getHeroPromotionCard(locale),
  ]);

  return {
    slides,
    promotionCard,
  };
}

/**
 * ============================================================
 * Get a single Hero slide by document ID.
 * ============================================================
 */

export async function getHeroSlide(
  documentId: string,
  locale: Locale,
): Promise<HeroSlide | null> {
  try {
    const slides = await getHeroSlides(locale);

    return slides.find((slide) => slide.documentId === documentId) ?? null;
  } catch (error) {
    console.error("[Hero Service] Failed to fetch Hero slide.", error);

    return null;
  }
}

/**
 * ============================================================
 * Hero Service
 * ============================================================
 */

export const heroService = {
  getHeroSlides,
  getHeroPromotionCard,
  getHeroData,
  getHeroSlide,
};

export default heroService;
