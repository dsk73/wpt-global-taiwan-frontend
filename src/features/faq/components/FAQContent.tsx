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

  const categoryLabel =
    CATEGORY_LABELS[selectedCategory]?.[locale] ??
    CATEGORY_LABELS[selectedCategory]?.en ??
    selectedCategory;

  return (
    <section className="rounded-3xl border border-white/10 bg-white/3 p-6 md:p-8 lg:p-10">
      {/* Category Title */}

      <h2 className="text-3xl font-bold tracking-tight text-white md:text-4xl">
        {categoryLabel}
      </h2>

      {/* Space between category title and FAQ list */}

      <div className="mt-8 md:mt-10">
        <FAQAccordion faqs={faqs} emptyMessage={emptyMessage} />
      </div>
    </section>
  );
}
