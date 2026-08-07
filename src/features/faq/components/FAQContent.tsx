"use client";

import FAQAccordion from "./FAQAccordion";

import type { FAQCategory, GroupedFAQs } from "@/types";

interface FAQContentProps {
  selectedCategory: FAQCategory;
  groupedFAQs: GroupedFAQs;
  locale: string;
}

const CATEGORY_LABELS: Record<FAQCategory, Record<string, string>> = {
  "my-account": {
    "zh-Hant-TW": "我的帳戶",
    en: "My Account",
    "ms-MY": "Akaun Saya",
  },

  "wpt-global": {
    "zh-Hant-TW": "WPT Global",
    en: "WPT Global",
    "ms-MY": "WPT Global",
  },

  kyc: {
    "zh-Hant-TW": "KYC",
    en: "KYC",
    "ms-MY": "KYC",
  },

  deposits: {
    "zh-Hant-TW": "存款",
    en: "Deposits",
    "ms-MY": "Deposit",
  },

  withdrawals: {
    "zh-Hant-TW": "提款",
    en: "Withdrawals",
    "ms-MY": "Pengeluaran",
  },

  "account-security": {
    "zh-Hant-TW": "帳戶安全",
    en: "Account Security",
    "ms-MY": "Keselamatan Akaun",
  },

  promotions: {
    "zh-Hant-TW": "優惠活動",
    en: "Promotions",
    "ms-MY": "Promosi",
  },
};

const EMPTY_MESSAGES = {
  "zh-Hant-TW": "目前沒有常見問題。",
  en: "No FAQs available.",
  "ms-MY": "Tiada FAQ tersedia.",
};

export default function FAQContent({
  selectedCategory,
  groupedFAQs,
  locale,
}: FAQContentProps) {
  const faqs = [...(groupedFAQs[selectedCategory] ?? [])];
  const emptyMessage =
    EMPTY_MESSAGES[locale as keyof typeof EMPTY_MESSAGES] ?? EMPTY_MESSAGES.en;

  return (
    <section className="rounded-3xl border border-white/10 bg-[#0D1424] p-8 md:p-10">
      <h2 className="mb-8 text-2xl font-bold text-white md:text-3xl">
        {CATEGORY_LABELS[selectedCategory][locale] ??
          CATEGORY_LABELS[selectedCategory].en}
      </h2>

      <FAQAccordion faqs={faqs} emptyMessage={emptyMessage} />
    </section>
  );
}
