//src/features/community/components/CommunityCard.tsx

"use client";
import type { Locale } from "@/providers";

import Image from "next/image";
import Link from "next/link";
import { motion } from "framer-motion";

import type { Community } from "@/types/community";

import { routes } from "@/lib/routes";

import {
  DEFAULT_ANIMATION_DURATION,
  DEFAULT_BANNER_IMAGE,
} from "@/features/content-detail";

import {
  formatPublishDate,
  formatReadingTime,
  getHeroImage,
} from "@/features/content-detail";

interface CommunityCardProps {
  community: Community;
  locale: Locale;
}

export default function CommunityCard({
  community,
  locale,
}: CommunityCardProps) {
  const heroImage = getHeroImage(community.BannerImage, community.Thumbnail);

  return (
    <motion.article
      initial={{ opacity: 0, y: 24 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true }}
      transition={{
        duration: DEFAULT_ANIMATION_DURATION,
      }}
      className="group overflow-hidden rounded-2xl border border-white/10 bg-white/5 backdrop-blur-sm transition-all duration-300 hover:border-[#D2B48C]/40 hover:bg-white/8 hover:shadow-xl hover:shadow-black/20"
    >
      <Link href={routes.communityPost(locale, community.Slug)}>
        {/* Image */}
        <div className="relative aspect-video overflow-hidden">
          <Image
            src={heroImage?.url ?? DEFAULT_BANNER_IMAGE}
            alt={community.Title}
            fill
            sizes="(max-width:768px)100vw,(max-width:1200px)50vw,33vw"
            className="object-cover transition-transform duration-700 group-hover:scale-105"
          />

          {community.Featured && (
            <span className="absolute left-4 top-4 rounded-full bg-[#D2B48C] px-3 py-1 text-xs font-semibold text-black">
              Featured
            </span>
          )}
        </div>

        {/* Content */}
        <div className="space-y-4 p-6">
          {/* Meta */}
          <div className="flex items-center justify-between text-xs text-neutral-400">
            <span>{formatPublishDate(community.PublishedDate, locale)}</span>

            <span>{formatReadingTime(community.ReadingTime)}</span>
          </div>

          {/* Title */}
          <h3 className="line-clamp-2 text-xl font-semibold text-white transition-colors duration-300 group-hover:text-[#D2B48C]">
            {community.Title}
          </h3>

          {/* Summary */}
          <p className="line-clamp-3 text-sm leading-7 text-neutral-300">
            {community.Summary ?? "Read more about this community update."}
          </p>

          {/* Footer */}
          <div className="flex items-center justify-between pt-2">
            {community.Category && (
              <span className="rounded-full border border-[#D2B48C]/40 px-3 py-1 text-xs text-[#D2B48C]">
                {community.Category.Name}
              </span>
            )}

            <span className="text-sm font-medium text-[#D2B48C] transition-transform duration-300 group-hover:translate-x-1">
              Read More →
            </span>
          </div>
        </div>
      </Link>
    </motion.article>
  );
}
