"use client";

import { motion } from "framer-motion";
import ReactMarkdown from "react-markdown";
import remarkGfm from "remark-gfm";

import type { DownloadPage } from "@/types/download";

interface DownloadContentProps {
  download: DownloadPage;
}

export default function DownloadContent({ download }: DownloadContentProps) {
  if (!download.Description?.trim()) {
    return null;
  }

  return (
    <section className="py-16 md:py-20">
      <div className="container mx-auto max-w-5xl px-4">
        <motion.div
          initial={{ opacity: 0, y: 24 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.45 }}
          className="
            prose
            prose-lg
            dark:prose-invert
            max-w-none

            prose-headings:text-white
            prose-headings:font-bold

            prose-p:text-white/80
            prose-p:leading-8

            prose-a:text-[#60A5FA]
            hover:prose-a:text-[#93C5FD]

            prose-strong:text-white

            prose-ul:text-white/80
            prose-ol:text-white/80

            prose-li:marker:text-[#3B82F6]

            prose-blockquote:border-l-[#3B82F6]
            prose-blockquote:text-white/70

            prose-img:rounded-2xl
            prose-img:shadow-xl

            prose-code:text-[#60A5FA]

            prose-pre:border
            prose-pre:border-white/10
            prose-pre:bg-white/5
          "
        >
          <ReactMarkdown remarkPlugins={[remarkGfm]}>
            {download.Description}
          </ReactMarkdown>
        </motion.div>
      </div>
    </section>
  );
}
