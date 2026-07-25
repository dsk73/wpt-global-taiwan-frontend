"use client";

import Image from "next/image";
import Link from "next/link";

import { CalendarDays, Clock, ArrowRight } from "lucide-react";

import { routes } from "@/lib/routes";
import { getMediaUrl } from "@/lib/media";

import type { Locale } from "@/providers";
import type { PokerExchangeArticle } from "@/types/poker-exchange";

interface PokerExchangeCardProps {
  article: PokerExchangeArticle;
  locale: Locale;
}

export default function PokerExchangeCard({
  article,
  locale,
}: PokerExchangeCardProps) {
  return (
    <article className="group overflow-hidden rounded-3xl border border-white/10 bg-slate-900 transition-all duration-300 hover:-translate-y-1 hover:border-(--primary)/50 hover:shadow-xl hover:shadow-(--primary)/10">
      <Link href={routes.pokerExchangePost(locale, article.Slug)}>
        <div className="relative aspect-16/10 overflow-hidden">
          <Image
            src={
              getMediaUrl(article.Thumbnail?.url) || "/images/placeholder.jpg"
            }
            alt={article.Title}
            fill
            sizes="(max-width:768px) 100vw, (max-width:1200px) 50vw, 33vw"
            className="object-cover transition duration-500 group-hover:scale-105"
          />

          {article.category && (
            <span
              className="absolute left-4 top-4 rounded-full px-3 py-1 text-xs font-semibold text-white"
              style={{
                backgroundColor: article.category.Color,
              }}
            >
              {article.category.Name}
            </span>
          )}
        </div>
      </Link>

      <div className="space-y-4 p-6">
        <div className="flex flex-wrap items-center gap-4 text-sm text-slate-400">
          <span className="flex items-center gap-1">
            <CalendarDays size={16} />
            {article.PublishDate}
          </span>

          <span className="flex items-center gap-1">
            <Clock size={16} />
            {article.ReadingTime} min
          </span>
        </div>

        <Link
          href={routes.pokerExchangePost(locale, article.Slug)}
          className="block"
        >
          <h3 className="line-clamp-2 text-xl font-semibold transition group-hover:text-(--primary)">
            {article.Title}
          </h3>
        </Link>

        <p className="line-clamp-3 text-sm leading-7 text-slate-300">
          {article.Summary}
        </p>

        <Link
          href={routes.pokerExchangePost(locale, article.Slug)}
          className="inline-flex items-center gap-2 text-sm font-semibold text-(--primary) transition hover:gap-3"
        >
          Read More
          <ArrowRight size={16} />
        </Link>
      </div>
    </article>
  );
}
