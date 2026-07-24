"use client";

import Image from "next/image";
import Link from "next/link";
import { CalendarDays, Clock3, ArrowRight } from "lucide-react";
import { motion } from "framer-motion";

import { cn } from "@/lib/utils";
import type { Locale } from "@/providers";
import type { Activity } from "@/types/activity";

import {
  formatPublishDate,
  formatReadingTime,
  truncateSummary,
} from "../utils/activity.helpers";

interface ActivityCardProps {
  activity: Activity;
  locale: Locale;
  className?: string;
}

const READ_MORE: Record<Locale, string> = {
  "zh-Hant-TW": "閱讀更多",
  en: "Read More",
  "ms-MY": "Baca Lagi",
};

export default function ActivityCard({
  activity,
  locale,
  className = "",
}: ActivityCardProps) {
  return (
    <motion.article
      whileHover={{}}
      transition={{ duration: 0.25 }}
      className={cn(
        "group overflow-hidden rounded-3xl border border-white/10 bg-white/3 backdrop-blur-sm transition-all duration-300 hover:border-blue-500/50 hover:bg-white/5 hover:shadow-[0_18px_50px_rgba(37,99,235,0.18)]",
        className,
      )}
    >
      <Link href="#">
        {/* Image */}
        <div className="relative aspect-16/10 overflow-hidden">
          <Image
            src={activity.Thumbnail?.url || "/images/placeholder.jpg"}
            alt={activity.Thumbnail?.alternativeText ?? activity.Title}
            fill
            sizes="(max-width:768px)100vw,(max-width:1280px)50vw,33vw"
            className="object-cover transition-transform duration-500 group-hover:scale-105"
          />

          {activity.Tags?.length > 0 && (
            <div className="absolute left-4 top-4 rounded-full bg-blue-500 px-3 py-1 text-xs font-semibold uppercase tracking-wide text-black">
              {activity.Tags[0]}
            </div>
          )}
        </div>

        {/* Content */}
        <div className="flex h-full flex-col p-6">
          {/* Meta */}
          <div className="mb-4 flex flex-wrap items-center gap-4 text-sm text-white/60">
            <div className="flex items-center gap-1.5">
              <CalendarDays size={16} />
              {formatPublishDate(activity.PublishDate, locale)}
            </div>

            <div className="flex items-center gap-1.5">
              <Clock3 size={16} />
              {formatReadingTime(activity.ReadingTime)}
            </div>
          </div>

          {/* Title */}
          <h3 className="line-clamp-2 text-xl font-bold text-white transition-colors duration-300 group-hover:text-blue-400">
            {activity.Title}
          </h3>

          {/* Summary */}
          <p className="mt-3 line-clamp-3 flex-1 leading-7 text-white/70">
            {truncateSummary(activity.Summary, 140)}
          </p>

          {/* CTA */}
          <div className="mt-6 flex items-center gap-2 font-semibold text-blue-400 transition-all duration-300 group-hover:gap-3">
            <span>{READ_MORE[locale]}</span>

            <ArrowRight
              size={18}
              className="transition-transform duration-300 group-hover:translate-x-1"
            />
          </div>
        </div>
      </Link>
    </motion.article>
  );
}
