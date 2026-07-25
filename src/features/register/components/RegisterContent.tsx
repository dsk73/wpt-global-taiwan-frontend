"use client";

import { motion } from "framer-motion";
import ReactMarkdown from "react-markdown";
import remarkGfm from "remark-gfm";

import type { RegisterPage } from "@/types/register";

interface RegisterContentProps {
  register: RegisterPage;
}

export default function RegisterContent({ register }: RegisterContentProps) {
  if (!register.Content?.trim()) {
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

            prose-a:text-[#8EB8FF]
            hover:prose-a:text-[#A8C8FF]

            prose-strong:text-white

            prose-ul:text-white/80
            prose-ol:text-white/80

            prose-li:marker:text-[#8EB8FF]

            prose-blockquote:border-l-[#8EB8FF]
            prose-blockquote:text-white/70

            prose-img:rounded-2xl
            prose-img:shadow-xl

            prose-code:text-[#8EB8FF]

            prose-pre:border
            prose-pre:border-white/10
            prose-pre:bg-white/5
          "
        >
          <ReactMarkdown remarkPlugins={[remarkGfm]}>
            {register.Content}
          </ReactMarkdown>
        </motion.div>
      </div>
    </section>
  );
}
