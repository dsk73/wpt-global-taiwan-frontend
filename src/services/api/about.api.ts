import { fetcher } from "@/lib/fetcher";

import type { Locale } from "@/providers";
import type { AboutPage } from "@/types/about";

const ENDPOINT = "/about-page";

export async function getAboutPage(
  locale: Locale,
): Promise<AboutPage> {
  return fetcher.getSingle<AboutPage>(
    `${ENDPOINT}?locale=${locale}&populate=*`,
  );
}