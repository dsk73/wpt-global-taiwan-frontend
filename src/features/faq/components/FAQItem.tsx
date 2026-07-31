"use client";

import { useState } from "react";

import clsx from "clsx";
import { ChevronDown } from "lucide-react";
import ReactMarkdown from "react-markdown";

import type { FAQ } from "@/types";

interface FAQItemProps {
  faq: FAQ;
  defaultOpen?: boolean;
}

export default function FAQItem({ faq, defaultOpen = false }: FAQItemProps) {
  const [open, setOpen] = useState(defaultOpen);

  return (
    <div className="overflow-hidden rounded-2xl border border-white/10 bg-white/5 backdrop-blur-sm transition-all duration-300">
      <button
        type="button"
        onClick={() => setOpen((prev) => !prev)}
        className="flex w-full items-center justify-between gap-4 px-6 py-5 text-left transition hover:bg-white/5"
      >
        <h3 className="text-base font-semibold text-white md:text-lg">
          {faq.Question}
        </h3>

        <ChevronDown
          className={clsx(
            "h-5 w-5 shrink-0 text-white transition-transform duration-300",
            open && "rotate-180",
          )}
        />
      </button>

      <div
        className={clsx(
          "grid transition-all duration-300 ease-in-out",
          open ? "grid-rows-[1fr]" : "grid-rows-[0fr]",
        )}
      >
        <div className="overflow-hidden">
          <div className="border-t border-white/10 px-6 py-5">
            <ReactMarkdown
              components={{
                p: ({ children }) => (
                  <p className="leading-7 text-white/70">{children}</p>
                ),

                a: ({ href, children }) => (
                  <a
                    href={href}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="
      inline-flex
      items-center
      gap-1
      font-semibold
      italic
      text-sky-400
      underline
      underline-offset-4
      decoration-sky-400
      transition-all
      duration-200
      hover:text-sky-300
      hover:decoration-sky-300
    "
                  >
                    {children}
                  </a>
                ),

                strong: ({ children }) => (
                  <strong className="font-semibold text-white">
                    {children}
                  </strong>
                ),

                ul: ({ children }) => (
                  <ul className="ml-6 list-disc space-y-2 text-white/70">
                    {children}
                  </ul>
                ),

                ol: ({ children }) => (
                  <ol className="ml-6 list-decimal space-y-2 text-white/70">
                    {children}
                  </ol>
                ),

                li: ({ children }) => <li>{children}</li>,
              }}
            >
              {faq.Answer}
            </ReactMarkdown>

            {faq.category && (
              <div className="mt-5">
                <span
                  className="inline-flex items-center rounded-full px-3 py-1 text-xs font-semibold text-white"
                  style={{
                    backgroundColor: faq.category.Color,
                  }}
                >
                  {faq.category.Name}
                </span>
              </div>
            )}
          </div>
        </div>
      </div>
    </div>
  );
}
