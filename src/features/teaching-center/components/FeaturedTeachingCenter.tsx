"use client";

import Image from "next/image";
import Link from "next/link";

import { ArrowRight } from "lucide-react";

import { getMediaUrl } from "@/lib/media";
import { routes } from "@/lib/routes";

import type { Locale } from "@/providers";
import type { TeachingGuide } from "@/types/teaching-guide";

interface FeaturedTeachingCenterProps {
  guide: TeachingGuide;
  locale: Locale;
}

export default function FeaturedTeachingCenter({
  guide,
  locale,
}: FeaturedTeachingCenterProps) {
  return (
    <section className="overflow-hidden rounded-4xl border border-white/10 bg-white/5 backdrop-blur-sm">
      <div className="grid items-center lg:grid-cols-2">
        <Link
          href={routes.teachingCenterPost(locale, guide.Slug)}
          className="group relative block aspect-16/10 overflow-hidden"
        >
          <Image
            src={
              getMediaUrl(guide.BannerImage?.url ?? guide.Thumbnail?.url) ||
              "/images/placeholder.jpg"
            }
            alt={guide.Title}
            fill
            sizes="(max-width:1024px)100vw,50vw"
            className="object-cover transition-transform duration-700 group-hover:scale-105"
          />
        </Link>

        <div className="flex flex-col p-8 lg:p-12">
          <span className="mb-6 w-fit rounded-full bg-(--primary) px-4 py-2 text-xs font-semibold uppercase tracking-wider text-black">
            {guide.GuideType}
          </span>

          <Link href={routes.teachingCenterPost(locale, guide.Slug)}>
            <h2 className="text-4xl font-bold leading-tight text-white transition-colors duration-300 hover:text-(--primary)">
              {guide.Title}
            </h2>
          </Link>

          <p className="mt-6 max-w-2xl text-lg leading-8 text-white/70">
            {guide.Summary}
          </p>

          <Link
            href={routes.teachingCenterPost(locale, guide.Slug)}
            className="mt-10 inline-flex w-fit items-center gap-2 rounded-full bg-(--primary) px-6 py-3 font-semibold text-black transition-all duration-300 hover:gap-3"
          >
            Learn Guide
            <ArrowRight size={18} />
          </Link>
        </div>
      </div>
    </section>
  );
}
