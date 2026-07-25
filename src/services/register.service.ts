import { cache } from "react";

import { getRegisterPage } from "./api/register.api";

import type { Locale } from "@/providers";
import type { RegisterPage } from "@/types/register";

/**
 * Fetch Register Page content from Strapi.
 * Cached per locale to avoid duplicate requests.
 */
export const fetchRegisterPage = cache(
  async (locale: Locale): Promise<RegisterPage> => {
    return getRegisterPage(locale);
  },
);