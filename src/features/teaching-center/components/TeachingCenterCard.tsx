"use client";

import Image from "next/image";
import Link from "next/link";

import { ArrowRight } from "lucide-react";

import { getMediaUrl } from "@/lib/media";
import { routes } from "@/lib/routes";

import type { Locale } from "@/providers";
import type { TeachingGuide } from "@/types/teaching-guide";

interface TeachingCenterCardProps {
  guide: TeachingGuide;
  locale: Locale;
}

export default function TeachingCenterCard({
  guide,
  locale,
}: TeachingCenterCardProps) {
  return (
    <article className="group overflow-hidden rounded-3xl border border-white/10 bg-white/3 backdrop-blur-sm transition-all duration-300 hover:-translate-y-1 hover:border-(--primary)/40">
      <Link
        href={routes.teachingCenterPost(locale, guide.Slug)}
        className="relative block aspect-16/10 overflow-hidden"
      >
        <Image
          src={
            getMediaUrl(guide.Thumbnail?.url ?? guide.BannerImage?.url) ||
            "/images/placeholder.jpg"
          }
          alt={guide.Title}
          fill
          sizes="(max-width:768px)100vw,(max-width:1280px)50vw,33vw"
          className="object-cover transition-transform duration-700 group-hover:scale-105"
        />

        <span className="absolute left-5 top-5 rounded-full bg-(--primary) px-3 py-1 text-xs font-semibold uppercase tracking-wider text-black">
          {guide.GuideType}
        </span>
      </Link>

      <div className="flex flex-col p-6">
        <Link href={routes.teachingCenterPost(locale, guide.Slug)}>
          <h3 className="line-clamp-2 text-2xl font-bold leading-snug text-white transition-colors duration-300 group-hover:text-(--primary)">
            {guide.Title}
          </h3>
        </Link>

        <p className="mt-4 line-clamp-3 leading-7 text-white/70">
          {guide.Summary}
        </p>

        <Link
          href={routes.teachingCenterPost(locale, guide.Slug)}
          className="mt-8 inline-flex w-fit items-center gap-2 font-semibold text-(--primary) transition-all duration-300 hover:gap-3"
        >
          Learn Guide
          <ArrowRight size={18} />
        </Link>
      </div>
    </article>
  );
}
