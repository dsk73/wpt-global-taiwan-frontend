//src/features/activities/hooks/useActivities.ts
"use client";

import { useMemo } from "react";

import type { Activity } from "@/types/activity";

import {
  formatPublishDate,
  formatReadingTime,
  getFeaturedActivity,
  getLatestActivities,
  sortActivities,
  truncateSummary,
} from "../utils/activity.helpers";

/**
 * ============================================================
 * Activities Hook
 * ============================================================
 *
 * UI hook for Activities.
 *
 * Responsibilities:
 * - Memoize activities
 * - Expose featured activity
 * - Expose latest activities
 * - Expose formatting helpers
 *
 * Data fetching happens in:
 * services/activities.service.ts
 * ============================================================
 */

export function useActivities(
  activities: Activity[],
) {
  const items = useMemo(
    () => sortActivities(activities),
    [activities],
  );

  const featuredActivity = useMemo(
    () => getFeaturedActivity(items),
    [items],
  );

  const latestActivities = useMemo(
    () => getLatestActivities(items),
    [items],
  );

  return {
    activities: items,

    featuredActivity,

    latestActivities,

    formatPublishDate,

    formatReadingTime,

    truncateSummary,
  };
}

export default useActivities;