"use client";

import { motion } from "framer-motion";

import { cn } from "@/lib/utils";
import type { Locale } from "@/providers";

interface FooterBottomProps {
  locale: Locale;
  className?: string;
}

const COPYRIGHT: Record<Locale, string> = {
  "zh-Hant-TW": "© 2026 WPT Global Taiwan. 版權所有。",
  en: "© 2026 WPT Global Taiwan. All Rights Reserved.",
  "ms-MY": "© 2026 WPT Global Taiwan. Hak Cipta Terpelihara.",
};

const VERSION_LABEL: Record<Locale, string> = {
  "zh-Hant-TW": "版本",
  en: "Version",
  "ms-MY": "Versi",
};

export default function FooterBottom({ locale, className }: FooterBottomProps) {
  return (
    <motion.div
      initial={{ opacity: 0 }}
      whileInView={{ opacity: 1 }}
      viewport={{ once: true }}
      transition={{ duration: 0.5 }}
      className={cn("mt-16 border-t border-white/10 pt-8", className)}
    >
      <div className="flex flex-col items-center justify-between gap-4 text-center md:flex-row md:text-left">
        {/* Copyright */}
        <p className="text-sm text-white/50">{COPYRIGHT[locale]}</p>

        {/* Version */}
        <div className="flex items-center gap-2 text-sm text-white/40">
          <span>{VERSION_LABEL[locale]}</span>

          <span className="rounded-full border border-blue-500/30 bg-blue-500/10 px-3 py-1 font-medium text-blue-400">
            v1.0.0
          </span>
        </div>
      </div>
    </motion.div>
  );
}
