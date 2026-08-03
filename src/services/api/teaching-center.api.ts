import { fetcher } from "@/lib/fetcher";
import { buildQuery } from "@/lib/query-builder";

import type { Locale } from "@/providers";
import type { TeachingGuide } from "@/types/teaching-guide";

const ENDPOINT = "/teaching-guides";

export async function getTeachingGuides(
  locale: Locale,
): Promise<TeachingGuide[]> {
  const query = buildQuery({
    locale,
    sort: ["DisplayOrder:asc"],
    populate: {
      Thumbnail: true,
      BannerImage: true,
      GuideSections: {
        populate: "*",
      },
      localizations: true,
    },
  });

  return fetcher.getCollection<TeachingGuide>(`${ENDPOINT}?${query}`);
}

export async function getTeachingGuide(
  slug: string,
  locale: Locale,
): Promise<TeachingGuide[]> {
  const query = buildQuery({
    locale,
    filters: {
      Slug: {
        $eq: slug,
      },
    },
    populate: {
      Thumbnail: true,
      BannerImage: true,
      GuideSections: {
        populate: "*",
      },
      localizations: true,
    },
  });

  return fetcher.getCollection<TeachingGuide>(`${ENDPOINT}?${query}`);
}
