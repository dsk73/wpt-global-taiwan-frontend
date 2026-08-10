import { fetcher } from "@/lib/fetcher";
import { buildQuery } from "@/lib/query-builder";

import type { Locale } from "@/providers";
import type { TeachingGuide } from "@/types/teaching-guide";

const ENDPOINT = "/teaching-guides";

/* ---------------------------------------
 * Get all Teaching Guides
 * ------------------------------------- */

export async function getTeachingGuides(
  locale: Locale,
): Promise<TeachingGuide[]> {
  const query = buildQuery({
    locale,

    populate: {
      Thumbnail: true,

      Sections: {
        populate: {
          Steps: {
            populate: {
              Image: true,
            },
          },
        },
      },

      CTA: true,

      localizations: true,
    },
  });

  return fetcher.getCollection(`${ENDPOINT}?${query}`);
}

/* ---------------------------------------
 * Get Teaching Guide by Slug
 * ------------------------------------- */

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

      Sections: {
        populate: {
          Steps: {
            populate: {
              Image: true,
            },
          },
        },
      },

      CTA: true,

      localizations: true,
    },
  });

  return fetcher.getCollection(`${ENDPOINT}?${query}`);
}
