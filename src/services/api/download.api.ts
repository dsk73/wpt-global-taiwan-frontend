import { fetcher } from "@/lib/fetcher";

import type { Locale } from "@/providers";
import type { DownloadPage } from "@/types/download";

const ENDPOINT = "/download-page";

export async function getDownloadPage(locale: Locale): Promise<DownloadPage> {
  return fetcher.getSingle<DownloadPage>(
    `${ENDPOINT}?locale=${locale}&populate=*`,
  );
}
