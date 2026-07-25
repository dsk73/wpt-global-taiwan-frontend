import { cache } from "react";

import { getDownloadPage } from "./api/download.api";

import type { Locale } from "@/providers";
import type { DownloadPage } from "@/types/download";

/**
 * Fetch Download Page content from Strapi.
 * Cached per locale to avoid duplicate requests.
 */
export const fetchDownloadPage = cache(
  async (locale: Locale): Promise<DownloadPage> => {
    return getDownloadPage(locale);
  },
);
