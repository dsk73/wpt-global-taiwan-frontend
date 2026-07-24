"use client";

import Image from "next/image";
import Link from "next/link";
import { motion } from "framer-motion";
import { ArrowRight, CalendarDays, Clock3 } from "lucide-react";

import { cn } from "@/lib/utils";
import type { Locale } from "@/providers";
import type { Activity } from "@/types/activity";

import {
  formatPublishDate,
  formatReadingTime,
} from "../utils/activity.helpers";

interface FeaturedActivityProps {
  activity: Activity;
  locale: Locale;
  className?: string;
}

const READ_MORE: Record<Locale, string> = {
  "zh-Hant-TW": "閱讀更多",
  en: "Read More",
  "ms-MY": "Baca Lagi",
};

export default function FeaturedActivity({
  activity,
  locale,
  className = "",
}: FeaturedActivityProps) {
  return (
    <motion.article
      initial={{ opacity: 0, y: 40 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true }}
      transition={{ duration: 0.6 }}
      className={cn(
        "group overflow-hidden rounded-3xl border border-white/10 bg-white/3 backdrop-blur-sm transition-all duration-300 hover:border-blue-500/50 hover:shadow-[0_20px_60px_rgba(212,175,55,0.15)]",
        className,
      )}
    >
      <Link href={`/activities/${activity.Slug}`}>
        <div className="grid lg:grid-cols-2">
          {/* Banner Image */}
          <div className="relative aspect-16/10 overflow-hidden lg:aspect-auto lg:min-h-125">
            <Image
              src={
                activity.BannerImage?.url ??
                activity.Thumbnail?.url ??
                "/images/placeholder.jpg"
              }
              alt={activity.BannerImage?.alternativeText ?? activity.Title}
              fill
              priority
              sizes="(max-width:1024px)100vw,50vw"
              className="object-cover transition-transform duration-700 group-hover:scale-105"
            />

            <div className="absolute inset-0 bg-linear-to-t from-black/60 via-black/10 to-transparent" />

            {activity.Tags.length > 0 && (
              <div className="absolute left-6 top-6 rounded-full bg-blue-500 px-4 py-2 text-sm font-semibold uppercase tracking-wide text-black">
                {activity.Tags[0]}
              </div>
            )}
          </div>

          {/* Content */}
          <div className="flex flex-col justify-center p-8 md:p-12">
            <div className="mb-6 flex flex-wrap items-center gap-6 text-sm text-white/60">
              <div className="flex items-center gap-2">
                <CalendarDays size={18} />
                {formatPublishDate(activity.PublishDate, locale)}
              </div>

              <div className="flex items-center gap-2">
                <Clock3 size={18} />
                {formatReadingTime(activity.ReadingTime)}
              </div>
            </div>

            <h2 className="text-3xl font-bold leading-tight text-white transition-colors duration-300 group-hover:text-blue-400 md:text-5xl">
              {activity.Title}
            </h2>

            <p className="mt-6 max-w-2xl text-lg leading-8 text-white/70">
              {activity.Summary}
            </p>

            <div className="mt-10 inline-flex items-center gap-3 font-semibold text-blue-400 transition-all duration-300 group-hover:gap-4">
              <span>{READ_MORE[locale]}</span>

              <ArrowRight
                size={20}
                className="transition-transform duration-300 group-hover:translate-x-1"
              />
            </div>
          </div>
        </div>
      </Link>
    </motion.article>
  );
}
