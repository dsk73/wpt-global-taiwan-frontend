"use client";

import PokerExchangeCard from "./PokerExchangeCard";

import type { Locale } from "@/providers";
import type { PokerExchangeArticle } from "@/types/poker-exchange";

interface PokerExchangeGridProps {
  articles: PokerExchangeArticle[];
  locale: Locale;
}

export default function PokerExchangeGrid({
  articles,
  locale,
}: PokerExchangeGridProps) {
  if (articles.length === 0) {
    return (
      <div className="rounded-3xl border border-dashed border-white/10 py-20 text-center">
        <h2 className="text-2xl font-semibold text-white">
          No Poker Exchange Articles Found
        </h2>

        <p className="mt-3 text-slate-400">
          Please check back later for new articles.
        </p>
      </div>
    );
  }

  return (
    <div className="grid gap-8 md:grid-cols-2 xl:grid-cols-3">
      {articles.map((article) => (
        <PokerExchangeCard
          key={article.documentId}
          article={article}
          locale={locale}
        />
      ))}
    </div>
  );
}
