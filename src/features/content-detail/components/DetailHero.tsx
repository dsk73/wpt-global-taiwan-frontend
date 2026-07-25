"use client";

import Image from "next/image";
import Link from "next/link";
import { motion } from "framer-motion";
import { CalendarDays, Clock3, ChevronRight } from "lucide-react";

import { cn } from "@/lib/utils";

import type { DetailHeroData } from "../types";

import {
  DEFAULT_ANIMATION_DURATION,
  DEFAULT_BANNER_IMAGE,
  HERO_GRADIENT_CLASSES,
  HERO_OVERLAY_CLASSES,
} from "../constants";

import {
  formatPublishDate,
  formatReadingTime,
  getHeroImage,
  getPrimaryTag,
} from "../helpers";

interface DetailHeroProps {
  data: DetailHeroData;
  className?: string;
}

export default function DetailHero({ data, className }: DetailHeroProps) {
  const heroImage = getHeroImage(data.bannerImage, data.thumbnail);

  const primaryTag = getPrimaryTag(data.tags);

  const image = heroImage?.url ?? data.placeholderImage ?? DEFAULT_BANNER_IMAGE;

  return (
    <section className={cn("relative overflow-hidden", className)}>
      {/* Banner */}
      <div className="relative h-[420px] w-full md:h-[520px] lg:h-[620px]">
        <Image
          src={image}
          alt={data.title}
          fill
          priority
          sizes="100vw"
          className="object-cover"
        />

        <div className={HERO_OVERLAY_CLASSES} />
        <div className={HERO_GRADIENT_CLASSES} />
      </div>

      {/* Content */}
      <div className="absolute inset-0 flex items-end">
        <div className="mx-auto w-full max-w-7xl px-4 pb-14 sm:px-6 lg:px-8">
          {/* Breadcrumb */}
          {data.breadcrumbs.length > 0 && (
            <motion.nav
              initial={{ opacity: 0, y: 16 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{
                duration: DEFAULT_ANIMATION_DURATION,
              }}
              className="mb-8 flex flex-wrap items-center gap-2 text-sm text-white/70"
            >
              {data.breadcrumbs.map((item, index) => (
                <div
                  key={`${item.label}-${index}`}
                  className="flex items-center gap-2"
                >
                  {item.href ? (
                    <Link
                      href={item.href}
                      className="transition hover:text-white"
                    >
                      {item.label}
                    </Link>
                  ) : (
                    <span className="text-white">{item.label}</span>
                  )}

                  {index !== data.breadcrumbs.length - 1 && (
                    <ChevronRight size={16} />
                  )}
                </div>
              ))}
            </motion.nav>
          )}

          {/* Tag */}
          {data.showTag !== false && primaryTag && (
            <motion.div
              initial={{ opacity: 0, y: 18 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{
                delay: 0.05,
                duration: DEFAULT_ANIMATION_DURATION,
              }}
              className={cn(
                "mb-5 inline-flex rounded-full px-4 py-2 text-sm font-semibold uppercase tracking-wider",
                data.tagClassName ?? "bg-blue-500 text-black",
              )}
            >
              {primaryTag}
            </motion.div>
          )}

          {/* Title */}
          <motion.h1
            initial={{ opacity: 0, y: 22 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{
              delay: 0.1,
              duration: DEFAULT_ANIMATION_DURATION,
            }}
            className="max-w-5xl text-4xl font-bold leading-tight text-white md:text-6xl"
          >
            {data.title}
          </motion.h1>

          {/* Summary */}
          {data.summary && (
            <motion.p
              initial={{ opacity: 0, y: 22 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{
                delay: 0.18,
                duration: DEFAULT_ANIMATION_DURATION,
              }}
              className="mt-6 max-w-3xl text-lg leading-8 text-white/75"
            >
              {data.summary}
            </motion.p>
          )}

          {/* Meta */}
          {data.showMeta !== false && (
            <motion.div
              initial={{ opacity: 0, y: 22 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{
                delay: 0.25,
                duration: DEFAULT_ANIMATION_DURATION,
              }}
              className="mt-8 flex flex-wrap items-center gap-8 text-white/70"
            >
              {data.publishDate && (
                <div className="flex items-center gap-2">
                  <CalendarDays size={18} />

                  <span>
                    {formatPublishDate(data.publishDate, data.locale)}
                  </span>
                </div>
              )}

              {data.readingTime ? (
                <div className="flex items-center gap-2">
                  <Clock3 size={18} />

                  <span>{formatReadingTime(data.readingTime)}</span>
                </div>
              ) : null}
            </motion.div>
          )}
        </div>
      </div>
    </section>
  );
}
