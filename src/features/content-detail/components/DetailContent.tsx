//src/features/content-detail/components/DetailContent.tsx

"use client";

import { motion } from "framer-motion";
import ReactMarkdown from "react-markdown";
import remarkGfm from "remark-gfm";

import { cn } from "@/lib/utils";

import type { DetailContentData } from "../types";

import { DEFAULT_ANIMATION_DURATION } from "../constants";
import { normalizeContent } from "../helpers";

interface DetailContentProps {
  data: DetailContentData;
  className?: string;
}

export default function DetailContent({ data, className }: DetailContentProps) {
  const content = normalizeContent(data.content);

  if (!content) {
    return null;
  }

  return (
    <motion.section
      initial={{ opacity: 0, y: 24 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true }}
      transition={{
        duration: DEFAULT_ANIMATION_DURATION,
      }}
      className={cn(
        "rounded-3xl border border-white/10 bg-white/3 p-8 backdrop-blur-sm md:p-12",
        className,
      )}
    >
      <article
        className={cn(
          "prose prose-invert max-w-none",

          /* Headings */
          "prose-headings:font-bold",
          "prose-headings:text-white",
          "prose-h1:mb-8 prose-h1:text-5xl",
          "prose-h2:mt-12 prose-h2:mb-6 prose-h2:text-4xl",
          "prose-h3:mt-10 prose-h3:mb-5 prose-h3:text-3xl",
          "prose-h4:mt-8 prose-h4:mb-4 prose-h4:text-2xl",

          /* Paragraphs */
          "prose-p:leading-8",
          "prose-p:text-white/80",

          /* Lists */
          "prose-ul:my-6",
          "prose-ol:my-6",
          "prose-li:text-white/80",
          "prose-li:marker:text-blue-400",

          /* Links */
          "prose-a:text-blue-400",
          "prose-a:no-underline",
          "hover:prose-a:text-blue-300",

          /* Strong */
          "prose-strong:text-white",

          /* Blockquote */
          "prose-blockquote:border-l-4",
          "prose-blockquote:border-blue-500",
          "prose-blockquote:bg-white/5",
          "prose-blockquote:py-3",
          "prose-blockquote:pl-6",
          "prose-blockquote:text-white/80",

          /* Code */
          "prose-code:rounded",
          "prose-code:bg-white/10",
          "prose-code:px-2",
          "prose-code:py-1",
          "prose-code:text-blue-300",
          "prose-code:before:content-none",
          "prose-code:after:content-none",

          /* Pre */
          "prose-pre:rounded-2xl",
          "prose-pre:border",
          "prose-pre:border-white/10",
          "prose-pre:bg-[#0F172A]",

          /* Tables */
          "prose-table:w-full",
          "prose-table:border-collapse",
          "prose-th:border",
          "prose-th:border-white/10",
          "prose-th:bg-white/5",
          "prose-th:px-4",
          "prose-th:py-3",
          "prose-th:text-white",
          "prose-td:border",
          "prose-td:border-white/10",
          "prose-td:px-4",
          "prose-td:py-3",

          /* Images */
          "prose-img:rounded-2xl",
          "prose-img:shadow-2xl",

          /* Horizontal Rule */
          "prose-hr:border-white/10",
        )}
      >
        <ReactMarkdown remarkPlugins={[remarkGfm]}>{content}</ReactMarkdown>
      </article>
    </motion.section>
  );
}
