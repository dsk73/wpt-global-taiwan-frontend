"use client";

import { motion } from "framer-motion";

import type { Locale } from "@/providers";

interface FAQHeaderProps {
  locale: Locale;
}

const EYEBROWS: Record<Locale, string> = {
  "zh-Hant-TW": "FREQUENTLY ASKED QUESTIONS",
  en: "FREQUENTLY ASKED QUESTIONS",
  "ms-MY": "SOALAN LAZIM",
};

const TITLES: Record<Locale, string> = {
  "zh-Hant-TW": "常見問題",
  en: "Frequently Asked Questions",
  "ms-MY": "Soalan Lazim",
};

const SUBTITLES: Record<Locale, string> = {
  "zh-Hant-TW":
    "快速找到有關 WPT Global Taiwan、付款方式、下載、促銷活動、教學中心等常見問題。",
  en: "Find answers to the most common questions about WPT Global Taiwan, payments, downloads, promotions, teaching center and more.",
  "ms-MY":
    "Cari jawapan kepada soalan lazim mengenai WPT Global Taiwan, pembayaran, muat turun, promosi dan banyak lagi.",
};

export default function FAQHeader({ locale }: FAQHeaderProps) {
  return (
    <motion.div
      initial={{ opacity: 0, x: -30 }}
      whileInView={{ opacity: 1, x: 0 }}
      viewport={{ once: true }}
      transition={{ duration: 0.5 }}
      className="mx-auto mb-12 max-w-7xl px-4 sm:px-6 lg:px-8"
    >
      <p className="mb-3 text-sm font-semibold uppercase tracking-[0.35em] text-[#8EB8FF]">
        {EYEBROWS[locale]}
      </p>

      <h2 className="text-4xl font-bold text-white md:text-5xl">
        {TITLES[locale]}
      </h2>

      <p className="mt-4 max-w-2xl text-lg leading-8 text-white/70">
        {SUBTITLES[locale]}
      </p>
    </motion.div>
  );
}
