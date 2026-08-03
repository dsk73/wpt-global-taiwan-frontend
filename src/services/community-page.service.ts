//src/services/community-page.service.ts

import { getCommunityPage as fetchCommunityPage } from "@/services/api/community-page.api";

import type { Locale } from "@/providers";
import type {
  CommunityPage,
  CommunitySocialLink,
} from "@/types/community-page";

/**
 * ============================================================
 * Community Page Service
 * ============================================================
 *
 * Business layer between the UI and API.
 *
 * Responsibilities:
 * - Fetch Community Page
 * - Apply business rules
 * - Filter inactive social links
 * - Sort social links
 * - Return safe data to the UI
 *
 * React components should ONLY consume this service.
 * ============================================================
 */

/**
 * Get Community Page.
 */
export async function getCommunityPage(
  locale: Locale,
): Promise<CommunityPage | null> {
  try {
    const page = await fetchCommunityPage(locale);

    const socialLinks: CommunitySocialLink[] = (page.SocialLink ?? [])
      .filter((link) => link.Active)
      .sort(
        (a, b) =>
          (a.DisplayOrder ?? Number.MAX_SAFE_INTEGER) -
          (b.DisplayOrder ?? Number.MAX_SAFE_INTEGER),
      );

    return {
      ...page,
      SocialLink: socialLinks,
    };
  } catch (error) {
    console.error(
      "[Community Page Service] Failed to fetch Community Page.",
      error,
    );

    return null;
  }
}

/**
 * Community Page Service
 */
export const communityPageService = {
  getCommunityPage,
};

export default communityPageService;
