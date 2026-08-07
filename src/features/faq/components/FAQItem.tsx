"use client";

import { useState } from "react";

import clsx from "clsx";
import { ChevronDown } from "lucide-react";
import ReactMarkdown from "react-markdown";
import remarkGfm from "remark-gfm";

import type { FAQ } from "@/types";

interface FAQItemProps {
  faq: FAQ;
  defaultOpen?: boolean;
}

export default function FAQItem({ faq, defaultOpen = false }: FAQItemProps) {
  const [open, setOpen] = useState(defaultOpen);

  const contentId = `faq-${faq.documentId}`;

  return (
    <div className="overflow-hidden rounded-2xl border border-white/10 bg-[#0D1424] transition-all duration-300">
      <button
        type="button"
        aria-expanded={open}
        aria-controls={contentId}
        onClick={() => setOpen((prev) => !prev)}
        className="flex w-full items-center justify-between gap-6 px-6 py-5 text-left transition-all duration-200 hover:bg-white/5 active:scale-[0.995] md:px-7 md:py-6"
      >
        <h3 className="text-base font-semibold leading-7 text-white md:text-lg">
          {faq.Question}
        </h3>

        <ChevronDown
          className={clsx(
            "h-6 w-6 shrink-0 text-(--primary) transition-transform duration-300",
            open && "rotate-180",
          )}
        />
      </button>

      <div
        id={contentId}
        className={clsx(
          "grid overflow-hidden transition-all duration-300 ease-in-out",
          open ? "grid-rows-[1fr]" : "grid-rows-[0fr]",
        )}
      >
        <div className="overflow-hidden">
          <div className="border-t border-white/10 px-6 py-5 md:px-7 md:py-6">
            <div
              className={clsx(
                "prose prose-invert max-w-none",

                // Paragraphs
                "prose-p:text-white/70",
                "prose-p:leading-8",

                // Headings
                "prose-headings:text-white",

                // Bold
                "prose-strong:text-white",

                // Lists
                "prose-ul:space-y-2",
                "prose-ol:space-y-2",
                "prose-li:text-white/70",

                // Links
                "prose-a:text-sky-400",
                "prose-a:no-underline",
                "hover:prose-a:underline",
                "hover:prose-a:text-sky-300",

                // Tables
                "prose-table:w-full",
                "prose-table:border-collapse",

                "prose-th:border",
                "prose-th:border-white/10",
                "prose-th:bg-white/5",
                "prose-th:px-4",
                "prose-th:py-3",

                "prose-td:border",
                "prose-td:border-white/10",
                "prose-td:px-4",
                "prose-td:py-3",

                // Images
                "prose-img:rounded-xl",

                // Code
                "prose-code:text-cyan-300",
                "prose-code:before:content-none",
                "prose-code:after:content-none",

                // Code blocks
                "prose-pre:bg-[#101827]",
                "prose-pre:border",
                "prose-pre:border-white/10",
              )}
            >
              <ReactMarkdown remarkPlugins={[remarkGfm]}>
                {faq.Answer}
              </ReactMarkdown>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
