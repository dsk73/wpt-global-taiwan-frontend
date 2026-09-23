import { fetcher } from "@/lib/fetcher";
import { buildQuery } from "@/lib/query-builder";

import type { Locale } from "@/providers";

import type {
  TeamExclusiveBenefit,
  TeamExclusiveBenefitsPage,
} from "@/types/team-exclusive-benefits";

const PAGE_ENDPOINT = "/team-exclusive-benefits-page";
const BENEFITS_ENDPOINT = "/team-exclusive-benefits";

export async function getTeamExclusiveBenefitsPage(
  locale: Locale,
): Promise<TeamExclusiveBenefitsPage | null> {
  const query = buildQuery({
    locale,
    populate: {
      HeroImage: true,
      CTAImage: true,
    },
  });

  try {
    return await fetcher.getSingle<TeamExclusiveBenefitsPage>(
      `${PAGE_ENDPOINT}?${query}`,
    );
  } catch (error) {
    console.error("[Team Exclusive Benefits] Failed to fetch page:", error);

    return null;
  }
}

export async function getTeamExclusiveBenefits(
  locale: Locale,
): Promise<TeamExclusiveBenefit[]> {
  const query = buildQuery({
    locale,
    sort: ["DisplayOrder:asc"],
    populate: {
      Image: true,
    },
  });

  try {
    return await fetcher.getCollection<TeamExclusiveBenefit>(
      `${BENEFITS_ENDPOINT}?${query}`,
    );
  } catch (error) {
    console.error("[Team Exclusive Benefits] Failed to fetch benefits:", error);

    return [];
  }
}
