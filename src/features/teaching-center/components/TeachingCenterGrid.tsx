"use client";

import TeachingCenterCard from "./TeachingCenterCard";

import type { Locale } from "@/providers";
import type { TeachingCenterArticle } from "@/types/teaching-center";

interface TeachingCenterGridProps {
  articles: TeachingCenterArticle[];
  locale: Locale;
}

export default function TeachingCenterGrid({
  articles,
  locale,
}: TeachingCenterGridProps) {
  if (!articles.length) {
    return null;
  }

  return (
    <section className="py-16">
      <div className="grid gap-8 md:grid-cols-2 xl:grid-cols-3">
        {articles.map((article) => (
          <TeachingCenterCard
            key={article.documentId}
            article={article}
            locale={locale}
          />
        ))}
      </div>
    </section>
  );
}
