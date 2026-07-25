//src/features/community/components/FeaturedCommunity.tsx

"use client";

import Image from "next/image";
import Link from "next/link";
import { motion } from "framer-motion";

import type { Locale } from "@/providers";
import type { Community } from "@/types/community";

import { routes } from "@/lib/routes";

import {
  DEFAULT_ANIMATION_DURATION,
  DEFAULT_BANNER_IMAGE,
  formatPublishDate,
  formatReadingTime,
  getHeroImage,
} from "@/features/content-detail";

interface FeaturedCommunityProps {
  community: Community;
  locale: Locale;
}

export default function FeaturedCommunity({
  community,
  locale,
}: FeaturedCommunityProps) {
  const heroImage = getHeroImage(community.BannerImage, community.Thumbnail);

  return (
    <section className="pb-16">
      <motion.div
        initial={{ opacity: 0, y: 24 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{
          duration: DEFAULT_ANIMATION_DURATION,
        }}
        className="group overflow-hidden rounded-3xl border border-white/10 bg-white/5 backdrop-blur-sm"
      >
        <div className="grid lg:grid-cols-2">
          <div className="relative aspect-16/10 min-h-80 overflow-hidden">
            <Image
              src={heroImage?.url ?? DEFAULT_BANNER_IMAGE}
              alt={community.Title}
              fill
              priority
              sizes="(max-width:1024px)100vw,50vw"
              className="object-cover transition-transform duration-700 group-hover:scale-105"
            />

            <div className="absolute inset-0 bg-linear-to-t from-black/60 via-black/20 to-transparent" />
          </div>

          <div className="flex flex-col justify-center p-8 lg:p-12">
            <div className="mb-4 flex flex-wrap items-center gap-3 text-sm text-neutral-400">
              {community.Category && (
                <span className="rounded-full border border-[#D2B48C]/40 px-3 py-1 text-[#D2B48C]">
                  {community.Category.Name}
                </span>
              )}

              <span>{formatPublishDate(community.PublishedDate, locale)}</span>

              <span>{formatReadingTime(community.ReadingTime)}</span>
            </div>

            <h2 className="mb-6 text-3xl font-bold leading-tight text-white lg:text-5xl">
              {community.Title}
            </h2>

            <p className="mb-8 line-clamp-4 text-lg leading-8 text-neutral-300">
              {community.Summary ??
                "Read the latest community update from WPT Global Taiwan."}
            </p>

            <div>
              <Link
                href={routes.communityPost(locale, community.Slug)}
                className="inline-flex items-center rounded-full bg-[#D2B48C] px-6 py-3 text-sm font-semibold text-black transition-all duration-300 hover:scale-105 hover:shadow-lg hover:shadow-[#D2B48C]/30"
              >
                Read Full Story →
              </Link>
            </div>
          </div>
        </div>
      </motion.div>
    </section>
  );
}
