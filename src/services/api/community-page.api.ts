// src/services/api/community-page.api.ts

import { buildQuery } from "@/lib/query-builder";
import { ENDPOINTS } from "@/lib/endpoints";
import fetcher from "@/lib/fetcher";

import type { Locale } from "@/providers";
import type { CommunityPage } from "@/types/community-page";

/**
 * ============================================================
 * Community Page API
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
 * - Filter social links
 * - Sort social links
 * - Normalize media URLs
 * - Remove inactive items
 * - Transform DTOs
 *
 * Those responsibilities belong to
 * community-page.service.ts.
 * ============================================================
 */

/**
 * Fetch Community Page for the requested locale.
 */
export async function getCommunityPage(locale: Locale): Promise<CommunityPage> {
  const query = buildQuery({
    locale,
    populate: {
      // Dedicated LINE CTA image
      LINEImage: true,

      // Social card icons
      SocialLink: {
        populate: {
          Icon: true,
        },
      },
    },
  });

  return fetcher.getSingle<CommunityPage>(
    `${ENDPOINTS.COMMUNITY_PAGE}?${query}`,
  );
}

/**
 * Community Page API
 */
export const communityPageApi = {
  getCommunityPage,
};

export default communityPageApi;
