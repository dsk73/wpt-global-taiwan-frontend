// src/features/faq/components/FAQAccordion.tsx

import FAQItem from "./FAQItem";

import type { FAQ } from "@/types";

interface FAQAccordionProps {
  faqs: FAQ[];
  emptyMessage?: string;
}

export default function FAQAccordion({
  faqs,
  emptyMessage = "No FAQs available.",
}: FAQAccordionProps) {
  if (faqs.length === 0) {
    return (
      <div className="rounded-2xl border border-dashed border-white/10 bg-white/5 px-6 py-12 text-center">
        <p className="text-base text-white/60">{emptyMessage}</p>
      </div>
    );
  }

  return (
    <div
      className="space-y-4 md:space-y-5"
      role="list"
      aria-label="Frequently Asked Questions"
    >
      {faqs.map((faq) => (
        <FAQItem
          key={faq.id}
          faq={faq}
        />
      ))}
    </div>
  );
}