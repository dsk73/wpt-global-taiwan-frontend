import { fetcher } from "@/lib/fetcher";

import type { Locale } from "@/providers";
import type { FAQ } from "@/types";

const ENDPOINT = "/faqs";

export async function getFAQs(
  locale: Locale,
): Promise<FAQ[]> {
  return fetcher.getCollection<FAQ>(
    `${ENDPOINT}?locale=${locale}&populate=category,localizations&sort=DisplayOrder:asc&filters[Active][$eq]=true`,
  );
}