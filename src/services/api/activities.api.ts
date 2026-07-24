import { DEFAULT_SORT, ENDPOINTS } from "@/lib/endpoints";
import fetcher from "@/lib/fetcher";
import { buildQuery } from "@/lib/query-builder";

import type { Locale } from "@/providers";
import type { Activity } from "@/types/activity";

/**
 * ============================================================
 * Activities API
 * ============================================================
 *
 * Responsibilities:
 * - Build Strapi query
 * - Fetch Activities
 * - Return raw Strapi response
 *
 * This layer should NEVER:
 * - Filter manually
 * - Sort manually
 * - Format dates
 * - Format media
 * - Pick featured activities
 *
 * Those belong to activities.service.ts
 * ============================================================
 */

/**
 * Fetch all activities for a locale.
 */
export async function getActivities(
  locale: Locale,
): Promise<Activity[]> {
  const query = buildQuery({
    locale,
    populate: "*",
    sort: DEFAULT_SORT,
  });

  return fetcher.getCollection<Activity>(
    `${ENDPOINTS.ACTIVITIES}?${query}`,
  );
}

/**
 * Activities API
 */
export const activitiesApi = {
  getActivities,
};

export default activitiesApi;