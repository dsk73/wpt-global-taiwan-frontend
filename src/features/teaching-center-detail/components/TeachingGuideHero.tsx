"use client";

import Image from "next/image";

import { getMediaUrl } from "@/lib/media";

import type { TeachingGuide } from "@/types/teaching-guide";

interface TeachingGuideHeroProps {
  guide: TeachingGuide;
}

export default function TeachingGuideHero({ guide }: TeachingGuideHeroProps) {
  return (
    <section className="relative overflow-hidden">
      <div className="relative h-80 md:h-105 lg:h-130">
        <Image
          src={
            getMediaUrl(guide.BannerImage?.url ?? guide.Thumbnail?.url) ||
            "/images/placeholder.jpg"
          }
          alt={guide.Title}
          fill
          priority
          sizes="100vw"
          className="object-cover"
        />

        <div className="absolute inset-0 bg-linear-to-t from-[#070B15] via-[#070B15]/70 to-black/20" />

        <div className="absolute inset-0 flex items-end">
          <div className="mx-auto w-full max-w-7xl px-4 pb-12 sm:px-6 lg:px-8">
            <span className="inline-flex rounded-full bg-(--primary) px-4 py-2 text-xs font-semibold uppercase tracking-wider text-black">
              {guide.GuideType}
            </span>

            <h1 className="mt-6 max-w-4xl text-4xl font-bold leading-tight text-white md:text-5xl lg:text-6xl">
              {guide.Title}
            </h1>

            {guide.Summary && (
              <p className="mt-6 max-w-3xl text-lg leading-8 text-white/80">
                {guide.Summary}
              </p>
            )}
          </div>
        </div>
      </div>
    </section>
  );
}
