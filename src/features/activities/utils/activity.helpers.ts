import type { Activity } from "@/types/activity";

/**
 * ============================================================
 * Activity Helpers
 * ============================================================
 *
 * Pure utility functions for Activities.
 *
 * Responsibilities:
 * - Date formatting
 * - Reading time formatting
 * - Featured activity selection
 * - Activity sorting
 * - Summary truncation
 *
 * No React code.
 * No API calls.
 * ============================================================
 */

/**
 * Returns the featured activity.
 */
export function getFeaturedActivity(
  activities: Activity[],
): Activity | null {
  return (
    activities.find((activity) => activity.Featured) ??
    null
  );
}

/**
 * Returns all non-featured activities.
 */
export function getLatestActivities(
  activities: Activity[],
): Activity[] {
  return activities.filter(
    (activity) => !activity.Featured,
  );
}

/**
 * Sort by DisplayOrder.
 */
export function sortActivities(
  activities: Activity[],
): Activity[] {
  return [...activities].sort(
    (a, b) => a.DisplayOrder - b.DisplayOrder,
  );
}

/**
 * Format publish date.
 *
 * Example:
 * Jul 16, 2026
 */
export function formatPublishDate(
  date: string,
  locale = "en",
): string {
  return new Intl.DateTimeFormat(locale, {
    day: "numeric",
    month: "short",
    year: "numeric",
  }).format(new Date(date));
}

/**
 * Format reading time.
 *
 * Example:
 * 5 min read
 */
export function formatReadingTime(
  minutes: number,
): string {
  return `${minutes} min read`;
}

/**
 * Truncate summary.
 */
export function truncateSummary(
  text: string,
  maxLength = 120,
): string {
  if (text.length <= maxLength) {
    return text;
  }

  return `${text.slice(0, maxLength).trimEnd()}...`;
}