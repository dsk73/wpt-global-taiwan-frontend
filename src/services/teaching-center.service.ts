import { getTeachingGuide, getTeachingGuides } from "./api/teaching-center.api";

import { teachingGuideSchema } from "@/schemas/teaching-center.schema";

import type { Locale } from "@/providers";
import type { TeachingGuide } from "@/types/teaching-guide";

/**
 * Get all active teaching guides
 */
export async function fetchTeachingGuides(
  locale: Locale,
): Promise<TeachingGuide[]> {
  const guides = await getTeachingGuides(locale);

  return guides
    .map((guide) => teachingGuideSchema.parse(guide))
    .filter((guide) => guide.Active);
}

/**
 * Get a single teaching guide by slug
 */
export async function fetchTeachingGuide(
  slug: string,
  locale: Locale,
): Promise<TeachingGuide | null> {
  const guides = await getTeachingGuide(slug, locale);

  if (guides.length === 0) {
    return null;
  }

  return teachingGuideSchema.parse(guides[0]);
}
