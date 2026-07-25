"use client";

import { useMemo, useState } from "react";

import FAQAccordion from "./FAQAccordion";
import FAQCategories from "./FAQCategories";

import type { Locale } from "@/providers";
import type { Category, FAQ } from "@/types";

interface FAQSectionProps {
  faqs: FAQ[];
  locale: Locale;
  showCategories?: boolean;
  showSearch?: boolean;
  limit?: number;
}

export default function FAQSection({
  faqs,
  locale,
  showCategories = false,
  showSearch = false,
  limit,
}: FAQSectionProps) {
  const [selectedCategory, setSelectedCategory] = useState("all");
  const [search, setSearch] = useState("");

  const categories = useMemo<Category[]>(() => {
    const map = new Map<string, Category>();

    faqs.forEach((faq) => {
      if (faq.category && !map.has(faq.category.documentId)) {
        map.set(faq.category.documentId, faq.category);
      }
    });

    return Array.from(map.values()).sort((a, b) =>
      a.Name.localeCompare(b.Name),
    );
  }, [faqs]);

  const filteredFAQs = useMemo(() => {
    let result = [...faqs];

    if (selectedCategory !== "all") {
      result = result.filter((faq) => faq.category?.Slug === selectedCategory);
    }

    if (search.trim()) {
      const keyword = search.toLowerCase();

      result = result.filter(
        (faq) =>
          faq.Question.toLowerCase().includes(keyword) ||
          faq.Answer.toLowerCase().includes(keyword),
      );
    }

    if (limit) {
      result = result.slice(0, limit);
    }

    return result;
  }, [faqs, selectedCategory, search, limit]);

  return (
    <section id="faq" className="relative overflow-hidden">
      <div className="pointer-events-none absolute inset-0 overflow-hidden">
        <div className="absolute left-1/2 top-20 h-72 w-72 -translate-x-1/2 rounded-full bg-blue-500/10 blur-3xl" />
      </div>

      <div className="relative mx-auto max-w-5xl px-4">
        {showSearch && (
          <div className="mb-8">
            <input
              type="text"
              placeholder={
                locale === "zh-Hant-TW"
                  ? "搜尋常見問題..."
                  : locale === "ms-MY"
                    ? "Cari Soalan Lazim..."
                    : "Search FAQs..."
              }
              value={search}
              onChange={(e) => setSearch(e.target.value)}
              className="w-full rounded-xl border border-white/10 bg-white/5 px-5 py-3 text-white outline-none placeholder:text-white/40 focus:border-(--primary)"
            />
          </div>
        )}

        {showCategories && categories.length > 0 && (
          <FAQCategories
            categories={categories}
            selectedCategory={selectedCategory}
            onCategoryChange={setSelectedCategory}
          />
        )}

        <FAQAccordion faqs={filteredFAQs} />
      </div>
    </section>
  );
}
