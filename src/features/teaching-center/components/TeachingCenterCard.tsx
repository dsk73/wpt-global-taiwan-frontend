"use client";

import Image from "next/image";
import Link from "next/link";

import { CalendarDays, Clock3, ArrowRight } from "lucide-react";

import { getMediaUrl } from "@/lib/media";
import { routes } from "@/lib/routes";

import type { Locale } from "@/providers";
import type { TeachingCenterArticle } from "@/types/teaching-center";

interface TeachingCenterCardProps {
  article: TeachingCenterArticle;
  locale: Locale;
}

export default function TeachingCenterCard({
  article,
  locale,
}: TeachingCenterCardProps) {
  return (
    <article className="group overflow-hidden rounded-3xl border border-white/10 bg-white/3 backdrop-blur-sm transition-all duration-300 hover:-translate-y-1 hover:border-white/20">
      <Link
        href={routes.teachingCenterPost(locale, article.Slug)}
        className="relative block aspect-16/10 overflow-hidden"
      >
        <Image
          src={
            getMediaUrl(article.Thumbnail?.url ?? article.BannerImage?.url) ||
            "/images/placeholder.jpg"
          }
          alt={article.Title}
          fill
          sizes="(max-width:768px)100vw,(max-width:1280px)50vw,33vw"
          className="object-cover transition-transform duration-700 group-hover:scale-105"
        />

        {article.category && (
          <span
            className="absolute left-5 top-5 rounded-full px-3 py-1 text-xs font-semibold uppercase tracking-wider text-black"
            style={{
              backgroundColor: article.category.Color,
            }}
          >
            {article.category.Name}
          </span>
        )}
      </Link>

      <div className="flex flex-col p-6">
        <div className="mb-4 flex flex-wrap items-center gap-4 text-sm text-white/60">
          <span className="flex items-center gap-2">
            <CalendarDays size={16} />
            {article.PublishDate}
          </span>

          <span className="flex items-center gap-2">
            <Clock3 size={16} />
            {article.ReadingTime} min read
          </span>
        </div>

        <Link href={routes.teachingCenterPost(locale, article.Slug)}>
          <h3 className="line-clamp-2 text-2xl font-bold leading-snug text-white transition-colors duration-300 group-hover:text-(--primary)">
            {article.Title}
          </h3>
        </Link>

        <p className="mt-4 line-clamp-3 leading-7 text-white/70">
          {article.Summary}
        </p>

        {article.Tags?.length ? (
          <div className="mt-5 flex flex-wrap gap-2">
            {article.Tags.map((tag) => (
              <span
                key={tag}
                className="rounded-full border border-white/10 bg-white/5 px-3 py-1 text-xs text-white/70"
              >
                {tag}
              </span>
            ))}
          </div>
        ) : null}

        <Link
          href={routes.teachingCenterPost(locale, article.Slug)}
          className="mt-8 inline-flex w-fit items-center gap-2 font-semibold text-(--primary) transition-all duration-300 hover:gap-3"
        >
          Read Article
          <ArrowRight size={18} />
        </Link>
      </div>
    </article>
  );
}
