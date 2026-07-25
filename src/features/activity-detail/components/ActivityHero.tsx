"use client";

import Image from "next/image";
import Link from "next/link";
import { motion } from "framer-motion";
import { CalendarDays, Clock3, ChevronRight } from "lucide-react";

import type { Locale } from "@/providers";
import type { Activity } from "@/types/activity";

import {
  formatPublishDate,
  formatReadingTime,
} from "@/features/activities/utils/activity.helpers";

interface ActivityHeroProps {
  activity: Activity;
  locale: Locale;
}

const HOME: Record<Locale, string> = {
  "zh-Hant-TW": "首頁",
  en: "Home",
  "ms-MY": "Laman Utama",
};

const ACTIVITIES: Record<Locale, string> = {
  "zh-Hant-TW": "活動",
  en: "Activities",
  "ms-MY": "Aktiviti",
};

export default function ActivityHero({ activity, locale }: ActivityHeroProps) {
  return (
    <section className="relative overflow-hidden">
      {/* Banner */}
      <div className="relative h-[420px] w-full md:h-[520px] lg:h-[620px]">
        <Image
          src={
            activity.BannerImage?.url ??
            activity.Thumbnail?.url ??
            "/images/placeholder.jpg"
          }
          alt={activity.Title}
          fill
          priority
          sizes="100vw"
          className="object-cover"
        />

        {/* Overlay */}
        <div className="absolute inset-0 bg-black/60" />

        <div className="absolute inset-0 bg-linear-to-t from-[#070B15] via-[#070B15]/35 to-transparent" />
      </div>

      {/* Content */}
      <div className="absolute inset-0 flex items-end">
        <div className="mx-auto w-full max-w-7xl px-4 pb-14 sm:px-6 lg:px-8">
          {/* Breadcrumb */}
          <motion.nav
            initial={{ opacity: 0, y: 16 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.45 }}
            className="mb-8 flex flex-wrap items-center gap-2 text-sm text-white/70"
          >
            <Link href={`/${locale}`} className="transition hover:text-white">
              {HOME[locale]}
            </Link>

            <ChevronRight size={16} />

            <Link
              href={`/${locale}/activities`}
              className="transition hover:text-white"
            >
              {ACTIVITIES[locale]}
            </Link>

            <ChevronRight size={16} />

            <span className="text-white">{activity.Title}</span>
          </motion.nav>

          {/* Tag */}
          {activity.Tags?.length > 0 && (
            <motion.div
              initial={{ opacity: 0, y: 18 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.05 }}
              className="mb-5 inline-flex rounded-full bg-blue-500 px-4 py-2 text-sm font-semibold uppercase tracking-wider text-black"
            >
              {activity.Tags[0]}
            </motion.div>
          )}

          {/* Title */}
          <motion.h1
            initial={{ opacity: 0, y: 22 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.1 }}
            className="max-w-5xl text-4xl font-bold leading-tight text-white md:text-6xl"
          >
            {activity.Title}
          </motion.h1>

          {/* Summary */}
          {activity.Summary && (
            <motion.p
              initial={{ opacity: 0, y: 22 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.18 }}
              className="mt-6 max-w-3xl text-lg leading-8 text-white/75"
            >
              {activity.Summary}
            </motion.p>
          )}

          {/* Meta */}
          <motion.div
            initial={{ opacity: 0, y: 22 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.25 }}
            className="mt-8 flex flex-wrap items-center gap-8 text-white/70"
          >
            <div className="flex items-center gap-2">
              <CalendarDays size={18} />

              <span>{formatPublishDate(activity.PublishDate, locale)}</span>
            </div>

            <div className="flex items-center gap-2">
              <Clock3 size={18} />

              <span>{formatReadingTime(activity.ReadingTime)}</span>
            </div>
          </motion.div>
        </div>
      </div>
    </section>
  );
}
