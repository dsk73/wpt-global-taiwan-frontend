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
  const imageUrl = getMediaUrl(guide.Thumbnail?.url);

  return (
    <article className="group flex h-full flex-col overflow-hidden rounded-3xl border border-white/10 bg-white/5 transition-all duration-300 hover:border-white/20">
      {/* -------------------------------------------------------
       * Preview Image
       * ----------------------------------------------------- */}

      <Link
        href={routes.teachingCenterPost(locale, guide.Slug)}
        className="relative block aspect-video w-full overflow-hidden bg-white/5"
      >
        {imageUrl ? (
          <Image
            src={imageUrl}
            alt={guide.Thumbnail?.alternativeText || guide.Title}
            fill
            sizes="
              (max-width: 639px) 100vw,
              (max-width: 1279px) 50vw,
              33vw
            "
            className="
              object-cover
              transition-transform
              duration-500
              group-hover:scale-105
            "
          />
        ) : (
          <div className="flex h-full items-center justify-center">
            <span className="text-sm text-white/40">WPT Global</span>
          </div>
        )}

        {/* Image overlay */}
        <div className="absolute inset-0 bg-linear-to-t from-black/40 via-transparent to-transparent" />
      </Link>

      {/* -------------------------------------------------------
       * Card Content
       * ----------------------------------------------------- */}

      <div className="flex flex-1 flex-col p-6">
        {/* Title */}

        <Link
          href={routes.teachingCenterPost(locale, guide.Slug)}
          className="flex items-start justify-between gap-4"
        >
          <h3
            className="
              line-clamp-2
              text-2xl
              font-bold
              leading-snug
              text-white
              transition-colors
              duration-300
              group-hover:text-(--primary)
            "
          >
            {guide.Title}
          </h3>

          <ArrowRight
            size={22}
            className="
              mt-1
              shrink-0
              text-(--primary)
              transition-transform
              duration-300
              group-hover:translate-x-1
            "
          />
        </Link>

        {/* -------------------------------------------------------
         * Sections
         * ----------------------------------------------------- */}

        {guide.Sections?.length > 0 && (
          <div className="mt-5 flex flex-wrap gap-2">
            {guide.Sections.slice(0, 4).map((section) => (
              <span
                key={section.id}
                className="
                  rounded-full
                  border
                  border-white/10
                  bg-white/5
                  px-3
                  py-1
                  text-xs
                  font-medium
                  text-white/60
                "
              >
                {section.Title}
              </span>
            ))}
          </div>
        )}

        {/* -------------------------------------------------------
         * Section Count
         * ----------------------------------------------------- */}

        {guide.Sections?.length > 0 && (
          <p className="mt-5 text-sm text-white/50">
            {guide.Sections.length}{" "}
            {guide.Sections.length === 1 ? "section" : "sections"}
          </p>
        )}

        {/* -------------------------------------------------------
         * CTA
         * ----------------------------------------------------- */}

        <div className="mt-auto pt-7">
          <Link
            href={routes.teachingCenterPost(locale, guide.Slug)}
            className="
              inline-flex
              items-center
              gap-2
              font-semibold
              text-(--primary)
              transition-all
              duration-300
              group-hover:gap-3
            "
          >
            View Guide
            <ArrowRight size={18} />
          </Link>
        </div>
      </div>
    </article>
  );
}
