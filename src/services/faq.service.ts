// src/services/faq.service.ts

import { getFAQs } from "./api/faq.api";

import type { GroupedFAQs } from "@/types";
import type { Locale } from "@/providers";

function createEmptyGroups(): GroupedFAQs {
  return {
    "my-account": [],
    "wpt-global": [],
    kyc: [],
    deposits: [],
    withdrawals: [],
    "account-security": [],
    promotions: [],
  };
}

export async function fetchFAQs(locale: Locale): Promise<GroupedFAQs> {
  const faqs = await getFAQs(locale);

  const grouped = createEmptyGroups();

  faqs.forEach((faq) => {
    if (faq.Category in grouped) {
      grouped[faq.Category].push(faq);
    }
  });

  Object.values(grouped).forEach((items) =>
    items.sort((a, b) => a.DisplayOrder - b.DisplayOrder),
  );

  return grouped;
}
