// src/features/faq/components/FAQPage.tsx

"use client";

import { useState } from "react";

import FAQContent from "./FAQContent";
import FAQSidebar from "./FAQSidebar";

import type { Locale } from "@/providers";
import type { FAQCategory, GroupedFAQs } from "@/types";

interface FAQPageProps {
  locale: Locale;
  groupedFAQs: GroupedFAQs;
}

export default function FAQPage({ locale, groupedFAQs }: FAQPageProps) {
  const [selectedCategory, setSelectedCategory] =
    useState<FAQCategory>("my-account");

  return (
    <section className="mx-auto max-w-7xl px-4 py-16 sm:px-6 lg:px-8">
      <div className="grid gap-8 lg:grid-cols-[280px_1fr] lg:gap-10">
        <FAQSidebar
          locale={locale}
          selectedCategory={selectedCategory}
          onCategoryChange={setSelectedCategory}
        />

        <FAQContent
          locale={locale}
          selectedCategory={selectedCategory}
          groupedFAQs={groupedFAQs}
        />
      </div>
    </section>
  );
}
