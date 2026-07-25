import { fetcher } from "@/lib/fetcher";

import type { Locale } from "@/providers";
import type { RegisterPage } from "@/types/register";

const ENDPOINT = "/register-page";

export async function getRegisterPage(
  locale: Locale,
): Promise<RegisterPage> {
  return fetcher.getSingle<RegisterPage>(
    `${ENDPOINT}?locale=${locale}&populate=*`,
  );
}