//src/features/content-detail/components/RelatedContent.tsx

"use client";

import { motion } from "framer-motion";

import { cn } from "@/lib/utils";

import type { RelatedContentData } from "../types";

import {
  DEFAULT_ANIMATION_DURATION,
  DEFAULT_RELATED_SECTION,
} from "../constants";

interface RelatedContentProps {
  data: RelatedContentData;
  locale: keyof typeof DEFAULT_RELATED_SECTION;
  className?: string;
}

export default function RelatedContent({
  data,
  locale,
  className,
}: RelatedContentProps) {
  const defaults = DEFAULT_RELATED_SECTION[locale];

  return (
    <section className={cn("mt-24", className)}>
      <motion.div
        initial={{ opacity: 0, y: 24 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true }}
        transition={{
          duration: DEFAULT_ANIMATION_DURATION,
        }}
        className="mb-10"
      >
        <p className="mb-3 text-sm font-semibold uppercase tracking-[0.35em] text-[#8EB8FF]">
          {defaults.eyebrow}
        </p>

        <h2 className="text-4xl font-bold text-white md:text-5xl">
          {data.title || defaults.title}
        </h2>

        {(data.subtitle || defaults.subtitle) && (
          <p className="mt-4 max-w-2xl text-lg leading-8 text-white/70">
            {data.subtitle ?? defaults.subtitle}
          </p>
        )}
      </motion.div>

      {data.children}
    </section>
  );
}
