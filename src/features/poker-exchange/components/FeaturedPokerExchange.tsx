"use client";

import Image from "next/image";
import Link from "next/link";
import { CalendarDays, Clock3, ArrowRight } from "lucide-react";

import { getMediaUrl } from "@/lib/media";
import { routes } from "@/lib/routes";

import type { Locale } from "@/providers";
import type { PokerExchangeArticle } from "@/types/poker-exchange";

interface FeaturedPokerExchangeProps {
  article: PokerExchangeArticle;
  locale: Locale;
}

export default function FeaturedPokerExchange({
  article,
  locale,
}: FeaturedPokerExchangeProps) {
  return (
    <article className="group overflow-hidden rounded-3xl border border-white/10 bg-white/3 backdrop-blur-sm transition-all duration-300 hover:border-white/20">
      <div className="grid overflow-hidden lg:grid-cols-2">
        {/* Image */}
        <Link
          href={routes.pokerExchangePost(locale, article.Slug)}
          className="relative aspect-16/10 overflow-hidden"
        >
          <Image
            src={
              getMediaUrl(article.BannerImage?.url ?? article.Thumbnail?.url) ||
              "/images/placeholder.jpg"
            }
            alt={article.Title}
            fill
            priority
            sizes="(max-width:1024px)100vw,50vw"
            className="object-cover transition-transform duration-700 group-hover:scale-105"
          />
        </Link>

        {/* Content */}
        <div className="flex flex-col justify-center p-8 md:p-10 lg:p-12">
          {article.category && (
            <div className="mb-5">
              <span
                className="inline-flex rounded-full px-4 py-2 text-xs font-semibold uppercase tracking-wider text-black"
                style={{
                  backgroundColor: article.category.Color,
                }}
              >
                {article.category.Name}
              </span>
            </div>
          )}

          <Link href={routes.pokerExchangePost(locale, article.Slug)}>
            <h2 className="text-3xl font-bold leading-tight text-white transition-colors duration-300 group-hover:text-(--primary) md:text-4xl">
              {article.Title}
            </h2>
          </Link>

          <p className="mt-6 line-clamp-4 text-lg leading-8 text-white/70">
            {article.Summary}
          </p>

          <div className="mt-8 flex flex-wrap items-center gap-6 text-sm text-white/60">
            <span className="flex items-center gap-2">
              <CalendarDays size={18} />
              {article.PublishDate}
            </span>

            <span className="flex items-center gap-2">
              <Clock3 size={18} />
              {article.ReadingTime} min read
            </span>
          </div>

          {article.Tags?.length ? (
            <div className="mt-8 flex flex-wrap gap-2">
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
            href={routes.pokerExchangePost(locale, article.Slug)}
            className="mt-10 inline-flex w-fit items-center gap-2 font-semibold text-(--primary) transition-all duration-300 hover:gap-3"
          >
            Read Article
            <ArrowRight size={18} />
          </Link>
        </div>
      </div>
    </article>
  );
}
