import FAQItem from "./FAQItem";

import type { FAQ } from "@/types";

interface FAQAccordionProps {
  faqs: FAQ[];
}

export default function FAQAccordion({ faqs }: FAQAccordionProps) {
  if (faqs.length === 0) {
    return (
      <div className="rounded-2xl border border-dashed border-white/10 bg-white/5 py-12 text-center">
        <p className="text-white/60">No FAQs available.</p>
      </div>
    );
  }

  return (
    <div className="space-y-4">
      {faqs.map((faq) => (
        <FAQItem key={faq.documentId} faq={faq} />
      ))}
    </div>
  );
}
