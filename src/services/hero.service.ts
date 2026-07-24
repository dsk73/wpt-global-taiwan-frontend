import { getHeroSlides as fetchHeroSlides } from "@/services/api/hero.api";
import type { Locale } from "@/providers";
import type { HeroSlide } from "@/types/hero";

/**
 * ============================================================
 * Hero Service
 * ============================================================
 *
 * Business layer between the UI and API.
 *
 * Responsibilities:
 * - Fetch Hero slides
 * - Apply business rules
 * - Filter unpublished/inactive slides
 * - Sort slides
 * - Return safe data to the UI
 *
 * React components should ONLY consume this service.
 * ============================================================
 */

/**
 * Get all active Hero slides.
 */
export async function getHeroSlides(
  locale: Locale,
): Promise<HeroSlide[]> {
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
 * Get a single Hero slide by document ID.
 */
export async function getHeroSlide(
  documentId: string,
  locale: Locale,
): Promise<HeroSlide | null> {
  try {
    const slides = await getHeroSlides(locale);

    return (
      slides.find(
        (slide) => slide.documentId === documentId,
      ) ?? null
    );
  } catch (error) {
    console.error("[Hero Service] Failed to fetch Hero slide.", error);

    return null;
  }
}

/**
 * Hero Service
 */
export const heroService = {
  getHeroSlides,
  getHeroSlide,
};

export default heroService;