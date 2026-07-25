import { getAboutPage } from "./api/about.api";

import type { Locale } from "@/providers";
import type { AboutPage } from "@/types/about";

export async function fetchAboutPage(
  locale: Locale,
): Promise<AboutPage> {
  return getAboutPage(locale);
}