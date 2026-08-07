// src/services/api/about.api.ts

import { fetcher } from "@/lib/fetcher";
import { buildQuery } from "@/lib/query-builder";

import type { Locale } from "@/providers";
import type { AboutPage } from "@/types";

const ENDPOINT = "/about-page";

export async function getAboutPage(locale: Locale): Promise<AboutPage> {
  const query = buildQuery({
    locale,

    populate: {
      HeroBannerImage: true,
      AboutLogo: true,
      SectionImage: true,

      Features: {
        populate: "*",
      },

      SEO: {
        populate: {
          OGImage: true,
        },
      },
    },
  });

  return fetcher.getSingle<AboutPage>(`${ENDPOINT}?${query}`);
}
