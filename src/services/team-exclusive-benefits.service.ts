import {
  getTeamExclusiveBenefits,
  getTeamExclusiveBenefitsPage,
} from "./api/team-exclusive-benefits.api";

import {
  teamExclusiveBenefitsListSchema,
  teamExclusiveBenefitsPageSchema,
} from "@/schemas/team-exclusive-benefits.schema";

import type { Locale } from "@/providers";

import type {
  TeamExclusiveBenefit,
  TeamExclusiveBenefitsPage,
} from "@/types/team-exclusive-benefits";

/* ---------------------------------------
 * Get Team Exclusive Benefits Page
 * Single Type
 * ------------------------------------- */

/**
 * Fetches the localized Team Exclusive Benefits
 * Single Type content from Strapi.
 *
 * The API layer handles the Strapi request and
 * media population. The schema validates the
 * returned data before it reaches the frontend.
 *
 * @param locale - Current website locale
 * @returns Validated Team Exclusive Benefits page
 *          or null when unavailable
 */
export async function fetchTeamExclusiveBenefitsPage(
  locale: Locale,
): Promise<TeamExclusiveBenefitsPage | null> {
  const page = await getTeamExclusiveBenefitsPage(locale);

  if (!page) {
    return null;
  }

  return teamExclusiveBenefitsPageSchema.parse(page);
}

/* ---------------------------------------
 * Get Team Exclusive Benefits
 * Collection Type
 * ------------------------------------- */

/**
 * Fetches all localized Team Exclusive Benefits
 * entries from Strapi.
 *
 * The API layer sorts entries by DisplayOrder.
 * The schema validates every returned benefit
 * before the data reaches the frontend.
 *
 * @param locale - Current website locale
 * @returns Validated Team Exclusive Benefits
 */
export async function fetchTeamExclusiveBenefits(
  locale: Locale,
): Promise<TeamExclusiveBenefit[]> {
  const benefits = await getTeamExclusiveBenefits(locale);

  return teamExclusiveBenefitsListSchema.parse(benefits);
}
