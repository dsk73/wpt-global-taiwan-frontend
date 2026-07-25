"use client";

import { motion } from "framer-motion";

import type { Locale } from "@/providers";
import type { Activity } from "@/types/activity";

import ActivityGrid from "@/features/activities/components/ActivityGrid";

interface RelatedActivitiesProps {
  activities: Activity[];
  locale: Locale;
}

const TITLE: Record<Locale, string> = {
  "zh-Hant-TW": "相關活動",
  en: "Related Activities",
  "ms-MY": "Aktiviti Berkaitan",
};

const SUBTITLE: Record<Locale, string> = {
  "zh-Hant-TW": "您可能也會感興趣",
  en: "You may also like these activities",
  "ms-MY": "Anda mungkin juga berminat",
};

export default function RelatedActivities({
  activities,
  locale,
}: RelatedActivitiesProps) {
  if (!activities.length) {
    return null;
  }

  return (
    <section className="mt-24">
      <motion.div
        initial={{ opacity: 0, y: 24 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true }}
        transition={{ duration: 0.45 }}
        className="mb-10"
      >
        <p className="mb-3 text-sm font-semibold uppercase tracking-[0.35em] text-[#8EB8FF]">
          WPT GLOBAL
        </p>

        <h2 className="text-4xl font-bold text-white md:text-5xl">
          {TITLE[locale]}
        </h2>

        <p className="mt-4 max-w-2xl text-lg leading-8 text-white/70">
          {SUBTITLE[locale]}
        </p>
      </motion.div>

      <ActivityGrid activities={activities} locale={locale} />
    </section>
  );
}
