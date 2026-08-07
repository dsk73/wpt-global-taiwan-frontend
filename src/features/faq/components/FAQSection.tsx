"use client";

import { useState } from "react";

import FAQContent from "./FAQContent";
import FAQSidebar from "./FAQSidebar";

import type { Locale } from "@/providers";
import type { FAQCategory, GroupedFAQs } from "@/types";

interface FAQSectionProps {
  groupedFAQs: GroupedFAQs;
  locale: Locale;
}

export default function FAQSection({ groupedFAQs, locale }: FAQSectionProps) {
  const [selectedCategory, setSelectedCategory] =
    useState<FAQCategory>("my-account");

  return (
    <section className="relative overflow-hidden py-8 lg:py-10">
      {/* Background Glow */}
      <div className="pointer-events-none absolute inset-0 overflow-hidden">
        <div className="absolute left-1/2 top-24 h-80 w-80 -translate-x-1/2 rounded-full bg-blue-500/10 blur-3xl" />
      </div>

      <div className="relative mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
        <div className="grid gap-8 lg:grid-cols-[280px_1fr]">
          {/* Left Sidebar */}

          <div className="lg:sticky lg:top-28 lg:self-start">
            <FAQSidebar
              locale={locale}
              selectedCategory={selectedCategory}
              onCategoryChange={setSelectedCategory}
            />
          </div>

          {/* Right FAQ Content */}

          <FAQContent
            locale={locale}
            selectedCategory={selectedCategory}
            groupedFAQs={groupedFAQs}
          />
        </div>
      </div>
    </section>
  );
}
