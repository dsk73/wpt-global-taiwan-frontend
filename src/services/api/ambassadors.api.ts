import { buildQuery } from "@/lib/query-builder";
import { DEFAULT_SORT, ENDPOINTS } from "@/lib/endpoints";
import fetcher from "@/lib/fetcher";
import type { Locale } from "@/providers";
import type { BrandAmbassador } from "@/types/ambassador";

/**
 * ============================================================
 * Brand Ambassadors API
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
 * - Filter ambassadors
 * - Sort ambassadors manually
 * - Normalize image URLs
 * - Transform DTOs
 *
 * Those responsibilities belong to ambassadors.service.ts.
 * ============================================================
 */

/**
 * Fetch all Brand Ambassadors for the requested locale.
 */
export async function getBrandAmbassadors(
  locale: Locale,
): Promise<BrandAmbassador[]> {
  const query = buildQuery({
    locale,
    populate: "*",
    sort: DEFAULT_SORT,
  });

  return fetcher.getCollection<BrandAmbassador>(
    `${ENDPOINTS.AMBASSADORS}?${query}`,
  );
}

/**
 * Brand Ambassadors API
 */
export const ambassadorsApi = {
  getBrandAmbassadors,
};

export default ambassadorsApi;