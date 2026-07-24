import ambassadorsApi from "./api/ambassadors.api";

import { getMediaUrl } from "@/lib/media";
import type { Locale } from "@/providers";
import type { BrandAmbassador } from "@/types/ambassador";

/**
 * ============================================================
 * Brand Ambassadors Service
 * ============================================================
 *
 * Responsibilities:
 * - Fetch ambassadors from API
 * - Filter inactive ambassadors
 * - Sort by DisplayOrder
 * - Normalize image URLs
 * - Return UI-ready data
 *
 * This service should NEVER:
 * - Render JSX
 * - Contain React hooks
 * * ============================================================
 */

/**
 * Normalize ambassador media.
 */
function normalizeAmbassador(
  ambassador: BrandAmbassador,
): BrandAmbassador {
  return {
    ...ambassador,

    Photo: ambassador.Photo
      ? {
          ...ambassador.Photo,
          url: getMediaUrl(ambassador.Photo.url),
        }
      : ambassador.Photo,
  };
}

/**
 * Get all active ambassadors.
 */
export async function getBrandAmbassadors(
  locale: Locale,
): Promise<BrandAmbassador[]> {
  const ambassadors =
    await ambassadorsApi.getBrandAmbassadors(locale);

  return ambassadors
    .filter((item) => item.Active)
    .sort((a, b) => a.DisplayOrder - b.DisplayOrder)
    .map(normalizeAmbassador);
}

/**
 * Brand Ambassadors Service
 */
export const ambassadorsService = {
  getBrandAmbassadors,
};

export default ambassadorsService;