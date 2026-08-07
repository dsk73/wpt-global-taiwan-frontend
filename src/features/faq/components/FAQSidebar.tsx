// src/features/faq/components/FAQSidebar.tsx

"use client";

import clsx from "clsx";

import type { FAQCategory } from "@/types";

interface FAQSidebarProps {
  selectedCategory: FAQCategory;
  onCategoryChange: (category: FAQCategory) => void;
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

const CATEGORY_ORDER: FAQCategory[] = [
  "my-account",
  "wpt-global",
  "kyc",
  "deposits",
  "withdrawals",
  "account-security",
  "promotions",
];

export default function FAQSidebar({
  selectedCategory,
  onCategoryChange,
  locale,
}: FAQSidebarProps) {
  return (
    <aside className="sticky top-28 rounded-3xl border border-white/10 bg-[#0D1424] p-3">
      <nav className="space-y-2" aria-label="FAQ Categories">
        {CATEGORY_ORDER.map((category) => {
          const active = selectedCategory === category;

          return (
            <button
              key={category}
              type="button"
              aria-current={active ? "page" : undefined}
              aria-pressed={active}
              onClick={() => onCategoryChange(category)}
              className={clsx(
                "flex w-full items-center rounded-2xl px-5 py-3.5 text-left text-sm font-medium transition-all duration-200 md:py-4 md:text-base",
                "focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-(--primary) focus-visible:ring-offset-2 focus-visible:ring-offset-[#0D1424]",
                active
                  ? "bg-linear-to-r from-blue-600 to-cyan-500 text-white shadow-lg shadow-blue-500/20"
                  : "text-white/70 hover:bg-white/5 hover:text-white",
              )}
            >
              {CATEGORY_LABELS[category][locale] ??
                CATEGORY_LABELS[category].en}
            </button>
          );
        })}
      </nav>
    </aside>
  );
}
