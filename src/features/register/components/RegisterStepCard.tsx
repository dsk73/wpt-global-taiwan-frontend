"use client";

import Image from "next/image";
import { motion } from "framer-motion";
import { CheckCircle2 } from "lucide-react";
import ReactMarkdown from "react-markdown";
import remarkGfm from "remark-gfm";

import { getMediaURL } from "@/config/api";

import type { RegisterStep } from "@/types/register";

interface RegisterStepCardProps {
  step: RegisterStep;
  index: number;
}

export default function RegisterStepCard({
  step,
  index,
}: RegisterStepCardProps) {
  const iconUrl = step.Icon?.url ? getMediaURL(step.Icon.url) : null;

  return (
    <motion.article
      initial={{ opacity: 0, y: 28 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true }}
      transition={{
        duration: 0.45,
        delay: index * 0.08,
      }}
      className="
        group
        relative
        h-full
        rounded-3xl
        border
        border-white/10
        bg-white/5
        p-6
        backdrop-blur-sm
        transition-all
        duration-300
        hover:-translate-y-1
        hover:border-[#3B82F6]/40
        hover:bg-white/8
      "
    >
      {/* Step Number */}
      <div className="absolute top-6 right-6 text-5xl font-black text-white/5 transition-colors duration-300 group-hover:text-[#3B82F6]/10">
        {(index + 1).toString().padStart(2, "0")}
      </div>

      {/* Icon */}
      <div className="relative mb-6 flex h-16 w-16 items-center justify-center overflow-hidden rounded-2xl bg-white/10">
        {iconUrl ? (
          <Image
            src={iconUrl}
            alt={step.Title}
            fill
            sizes="64px"
            className="object-contain p-3"
          />
        ) : (
          <CheckCircle2 className="h-8 w-8 text-[#3B82F6]" />
        )}
      </div>

      {/* Title */}
      <h3 className="mb-4 text-xl font-semibold text-white">{step.Title}</h3>

      {/* Description */}
      <div
        className="
          prose
          prose-sm
          dark:prose-invert
          max-w-none

          prose-p:text-white/70
          prose-p:leading-7

          prose-headings:text-white
          prose-headings:font-semibold

          prose-strong:text-white

          prose-a:text-[#60A5FA]
          hover:prose-a:text-[#93C5FD]

          prose-ul:text-white/70
          prose-ol:text-white/70

          prose-li:marker:text-[#3B82F6]

          prose-code:text-[#60A5FA]
        "
      >
        <ReactMarkdown remarkPlugins={[remarkGfm]}>
          {step.Description}
        </ReactMarkdown>
      </div>
    </motion.article>
  );
}
