"use client";

import { motion } from "framer-motion";

import type { Locale } from "@/providers";
import type { Activity } from "@/types/activity";

import { useActivities } from "../hooks/useActivities";
import ActivityGrid from "./ActivityGrid";
import FeaturedActivity from "./FeaturedActivity";

interface ActivitiesProps {
  activities: Activity[];
  locale: Locale;
  className?: string;
}

const EYEBROWS: Record<Locale, string> = {
  "zh-Hant-TW": "最新活動與優惠",
  en: "LATEST ACTIVITIES",
  "ms-MY": "AKTIVITI TERKINI",
};

const TITLES: Record<Locale, string> = {
  "zh-Hant-TW": "最新活動與優惠",
  en: "Latest Activities & Promotions",
  "ms-MY": "Aktiviti & Promosi Terkini",
};

const SUBTITLES: Record<Locale, string> = {
  "zh-Hant-TW": "掌握 WPT Global Taiwan 最新錦標賽、活動、促銷以及官方公告。",
  en: "Stay up to date with the latest WPT Global Taiwan tournaments, promotions and official announcements.",
  "ms-MY":
    "Ikuti perkembangan terkini mengenai kejohanan, promosi dan pengumuman rasmi WPT Global Taiwan.",
};

const LATEST_TITLE: Record<Locale, string> = {
  "zh-Hant-TW": "更多活動",
  en: "More Activities",
  "ms-MY": "Lagi Aktiviti",
};

export default function Activities({
  activities,
  locale,
  className = "",
}: ActivitiesProps) {
  const { featuredActivity, latestActivities } = useActivities(activities);

  if (!activities.length) {
    return null;
  }

  return (
    <section
      id="activities"
      className={`relative overflow-hidden py-24 lg:py-32 ${className}`}
    >
      {/* Background Glow */}
      <div className="pointer-events-none absolute inset-0 overflow-hidden">
        <div className="absolute left-1/2 top-20 h-72 w-72 -translate-x-1/2 rounded-full bg-blue-500/10 blur-3xl" />
      </div>

      <div className="relative mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
        {/* Header */}
        <motion.div
          initial={{ opacity: 0, x: -30 }}
          whileInView={{ opacity: 1, x: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.5 }}
          className="mb-8"
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

        {/* Featured Activity */}
        {featuredActivity && (
          <FeaturedActivity activity={featuredActivity} locale={locale} />
        )}

        {/* Latest Activities */}
        {latestActivities.length > 0 && (
          <motion.div
            initial={{ opacity: 0, y: 24 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.45 }}
            className="mt-14"
          >
            <h3 className="mb-8 text-3xl font-bold text-white">
              {LATEST_TITLE[locale]}
            </h3>

            <ActivityGrid activities={latestActivities} locale={locale} />
          </motion.div>
        )}
      </div>
    </section>
  );
}
