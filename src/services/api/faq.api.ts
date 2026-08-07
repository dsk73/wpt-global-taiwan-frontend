// src/services/api/faq.api.ts

import { fetcher } from "@/lib/fetcher";
import { buildQuery } from "@/lib/query-builder";

import type { Locale } from "@/providers";
import type { FAQ } from "@/types";

const ENDPOINT = "/faqs";

export async function getFAQs(locale: Locale): Promise<FAQ[]> {
  const query = buildQuery({
    locale,

    populate: [],

    sort: ["DisplayOrder:asc"],

    filters: {
      Active: {
        $eq: true,
      },
    },
  });

  return fetcher.getCollection<FAQ>(`${ENDPOINT}?${query}`);
}
