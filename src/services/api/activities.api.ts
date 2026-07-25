//src/services/api/activities.api.ts

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
 * Fetch a single activity by slug.
 */
export async function getActivityBySlug(
  locale: Locale,
  slug: string,
): Promise<Activity | null> {
  const query = buildQuery({
    locale,
    populate: "*",
    filters: {
      Slug: {
        $eq: slug,
      },
    },
  });

  const activities = await fetcher.getCollection<Activity>(
    `${ENDPOINTS.ACTIVITIES}?${query}`,
  );

  return activities[0] ?? null;
}

/**
 * Activities API
 */
export const activitiesApi = {
  getActivities,
  getActivityBySlug,
};


export default activitiesApi;