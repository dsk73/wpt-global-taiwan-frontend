"use client";

import Image from "next/image";
import Link from "next/link";

import { CalendarDays, Clock3, ArrowRight } from "lucide-react";

import { getMediaUrl } from "@/lib/media";
import { routes } from "@/lib/routes";

import type { Locale } from "@/providers";
import type { TeachingCenterArticle } from "@/types/teaching-center";

interface FeaturedTeachingCenterProps {
  article: TeachingCenterArticle;
  locale: Locale;
}

export default function FeaturedTeachingCenter({
  article,
  locale,
}: FeaturedTeachingCenterProps) {
  return (
    <section className="overflow-hidden rounded-4xl border border-white/10 bg-white/5 backdrop-blur-sm">
      <div className="grid items-center lg:grid-cols-2">
        <Link
          href={routes.teachingCenterPost(locale, article.Slug)}
          className="group relative block aspect-16/10 overflow-hidden"
        >
          <Image
            src={
              getMediaUrl(article.BannerImage?.url ?? article.Thumbnail?.url) ||
              "/images/placeholder.jpg"
            }
            alt={article.Title}
            fill
            sizes="(max-width:1024px)100vw,50vw"
            className="object-cover transition-transform duration-700 group-hover:scale-105"
          />
        </Link>

        <div className="flex flex-col p-8 lg:p-12">
          {article.category && (
            <span
              className="mb-6 w-fit rounded-full px-4 py-2 text-xs font-semibold uppercase tracking-wider text-black"
              style={{
                backgroundColor: article.category.Color,
              }}
            >
              {article.category.Name}
            </span>
          )}

          <div className="mb-5 flex flex-wrap items-center gap-5 text-sm text-white/60">
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
            <h2 className="text-4xl font-bold leading-tight text-white transition-colors duration-300 hover:text-(--primary)">
              {article.Title}
            </h2>
          </Link>

          <p className="mt-6 max-w-2xl text-lg leading-8 text-white/70">
            {article.Summary}
          </p>

          {article.Tags?.length ? (
            <div className="mt-8 flex flex-wrap gap-3">
              {article.Tags.map((tag) => (
                <span
                  key={tag}
                  className="rounded-full border border-white/10 bg-white/5 px-4 py-2 text-sm text-white/70"
                >
                  {tag}
                </span>
              ))}
            </div>
          ) : null}

          <Link
            href={routes.teachingCenterPost(locale, article.Slug)}
            className="mt-10 inline-flex w-fit items-center gap-2 rounded-full bg-(--primary) px-6 py-3 font-semibold text-black transition-all duration-300 hover:gap-3"
          >
            Read Article
            <ArrowRight size={18} />
          </Link>
        </div>
      </div>
    </section>
  );
}
