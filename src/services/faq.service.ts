import { getFAQs } from "./api/faq.api";

import type { Locale } from "@/providers";
import type { FAQ } from "@/types";

export async function fetchFAQs(
  locale: Locale,
): Promise<FAQ[]> {
  return getFAQs(locale);
}