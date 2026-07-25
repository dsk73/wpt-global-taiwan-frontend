import {
  getActivities,
  getActivityBySlug,
} from "./api/activities.api";

import { getMediaUrl } from "@/lib/media";

import type { Locale } from "@/providers";
import type { Activity } from "@/types/activity";

/**
 * ============================================================
 * Activities Service
 * ============================================================
 *
 * Responsibilities:
 * - Fetch activities
 * - Filter inactive records
 * - Sort by display order
 * - Normalize media URLs
 * - Split featured/latest activities
 *
 * Components should receive UI-ready data only.
 * ============================================================
 */

function normalizeMedia(activity: Activity): Activity {
  return {
    ...activity,

    Thumbnail: activity.Thumbnail
      ? {
          ...activity.Thumbnail,
          url: getMediaUrl(activity.Thumbnail.url),
        }
      : null,

    BannerImage: activity.BannerImage
      ? {
          ...activity.BannerImage,
          url: getMediaUrl(activity.BannerImage.url),
        }
      : null,

    Gallery:
      activity.Gallery?.map((image) => ({
        ...image,
        url: getMediaUrl(image.url),
      })) ?? [],
  };
}

/**
 * Get homepage activities.
 */
export async function getHomepageActivities(
  locale: Locale,
) {
  const activities = await getActivities(locale);

  const normalized = activities
    .filter((activity) => activity.Active)
    .sort(
      (a, b) => a.DisplayOrder - b.DisplayOrder,
    )
    .map(normalizeMedia);

  const featured =
    normalized.find((activity) => activity.Featured) ??
    null;

  const latest = normalized.filter(
    (activity) =>
      activity.documentId !== featured?.documentId,
  );

  return {
    featured,
    activities: latest,
  };
}

/**
 * Get all activities.
 */
export async function getAllActivities(
  locale: Locale,
): Promise<Activity[]> {
  const activities = await getActivities(locale);

  return activities
    .filter((activity) => activity.Active)
    .sort(
      (a, b) => a.DisplayOrder - b.DisplayOrder,
    )
    .map(normalizeMedia);
}

/**
 * Get activity by slug.
 */
export async function getActivity(
  locale: Locale,
  slug: string,
): Promise<Activity | null> {
  const activity = await getActivityBySlug(locale, slug);

  if (!activity || !activity.Active) {
    return null;
  }

  return normalizeMedia(activity);
}

/**
 * Get related activities.
 *
 * Excludes the current activity and returns
 * a limited number of activities.
 */
export async function getRelatedActivities(
  locale: Locale,
  currentDocumentId: string,
  limit = 3,
): Promise<Activity[]> {
  const activities = await getAllActivities(locale);

  return activities
    .filter(
      (activity) =>
        activity.documentId !== currentDocumentId,
    )
    .slice(0, limit);
}
/**
 * Get activity slugs.
 */
export async function getActivitySlugs(
  locale: Locale,
): Promise<string[]> {
  const activities =
    await getAllActivities(locale);

  return activities.map(
    (activity) => activity.Slug,
  );
}

/**
 * Activities Service
 */
export const activitiesService = {
  getHomepageActivities,
  getAllActivities,
  getActivity,
  getRelatedActivities,
  getActivitySlugs,
};
export default activitiesService;