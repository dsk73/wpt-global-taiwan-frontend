// src/services/about.service.ts

import { getAboutPage } from "./api/about.api";

import type { Locale } from "@/providers";
import type { AboutPage } from "@/types/about";

export async function fetchAboutPage(locale: Locale): Promise<AboutPage> {
  const aboutPage = await getAboutPage(locale);

  return {
    ...aboutPage,

    Features: (aboutPage.Features ?? [])
      .filter((feature) => feature.Active)
      .sort((a, b) => a.DisplayOrder - b.DisplayOrder),
  };
}
