import type { BrandAmbassador } from "@/types/ambassador";

/**
 * ============================================================
 * Brand Ambassadors Helpers
 * ============================================================
 *
 * Shared helper functions for the Ambassador feature.
 * No React.
 * No API calls.
 * No business logic.
 * ============================================================
 */

/**
 * Returns only active ambassadors.
 */
export function getActiveAmbassadors(
  ambassadors: BrandAmbassador[],
): BrandAmbassador[] {
  return ambassadors.filter((item) => item.Active);
}

/**
 * Sort ambassadors by display order.
 */
export function sortAmbassadors(
  ambassadors: BrandAmbassador[],
): BrandAmbassador[] {
  return [...ambassadors].sort(
    (a, b) => a.DisplayOrder - b.DisplayOrder,
  );
}

/**
 * Returns true if carousel controls should be shown.
 */
export function shouldShowCarousel(
  ambassadors: BrandAmbassador[],
  slidesPerView: number,
): boolean {
  return ambassadors.length > slidesPerView;
}

/**
 * Desktop: 4
 * Tablet: 3
 * Mobile: 2
 */
export function getSlidesPerView(width: number): number {
  if (width >= 1280) return 4;
  if (width >= 768) return 3;
  return 2;
}

/**
 * Total carousel pages.
 */
export function getTotalPages(
  totalItems: number,
  slidesPerView: number,
): number {
  return Math.max(
    1,
    Math.ceil(totalItems / slidesPerView),
  );
}