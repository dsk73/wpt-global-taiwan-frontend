"use client";

import { useState } from "react";

import clsx from "clsx";
import { ChevronDown } from "lucide-react";

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
            <p className="leading-7 text-white/70">{faq.Answer}</p>

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
