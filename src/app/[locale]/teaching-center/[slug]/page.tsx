import Image from "next/image";
import { notFound } from "next/navigation";
import { CalendarDays, Clock } from "lucide-react";

import TeachingCenterCard from "@/features/teaching-center/components/TeachingCenterCard";

import { getMediaUrl } from "@/lib/media";

import {
  fetchTeachingCenterArticle,
  fetchTeachingCenterArticles,
} from "@/services";

import type { Locale } from "@/providers";

interface TeachingCenterDetailPageProps {
  params: Promise<{
    locale: Locale;
    slug: string;
  }>;
}

export default async function TeachingCenterDetailPage({
  params,
}: TeachingCenterDetailPageProps) {
  const { locale, slug } = await params;

  const article = await fetchTeachingCenterArticle(slug, locale);

  if (!article) {
    notFound();
  }

  const relatedArticles = (await fetchTeachingCenterArticles(locale))
    .filter((item) => item.documentId !== article.documentId)
    .slice(0, 3);

  return (
    <main className="container mx-auto px-4 py-16 lg:px-8">
      {article.BannerImage && (
        <div className="relative mb-10 aspect-16/7 overflow-hidden rounded-3xl">
          <Image
            src={getMediaUrl(article.BannerImage.url)}
            alt={article.Title}
            fill
            priority
            sizes="100vw"
            className="object-cover"
          />
        </div>
      )}

      <article className="mx-auto max-w-4xl">
        {article.category && (
          <span
            className="mb-5 inline-flex rounded-full px-4 py-2 text-sm font-semibold text-white"
            style={{
              backgroundColor: article.category.Color,
            }}
          >
            {article.category.Name}
          </span>
        )}

        <h1 className="mb-6 text-4xl font-bold leading-tight lg:text-5xl">
          {article.Title}
        </h1>

        <div className="mb-8 flex flex-wrap items-center gap-6 text-sm text-slate-400">
          <span className="flex items-center gap-2">
            <CalendarDays size={16} />
            {article.PublishDate}
          </span>

          <span className="flex items-center gap-2">
            <Clock size={16} />
            {article.ReadingTime} min read
          </span>
        </div>

        {article.Tags && article.Tags.length > 0 && (
          <div className="mb-8 flex flex-wrap gap-2">
            {article.Tags.map((tag) => (
              <span
                key={tag}
                className="rounded-full border border-white/10 bg-white/5 px-3 py-1 text-sm text-slate-300"
              >
                {tag}
              </span>
            ))}
          </div>
        )}

        <div
          className="prose prose-invert max-w-none prose-headings:text-white prose-p:text-slate-300 prose-li:text-slate-300"
          dangerouslySetInnerHTML={{
            __html: article.Content,
          }}
        />
      </article>

      {relatedArticles.length > 0 && (
        <section className="mt-24">
          <h2 className="mb-10 text-3xl font-bold">Related Articles</h2>

          <div className="grid gap-8 md:grid-cols-2 xl:grid-cols-3">
            {relatedArticles.map((relatedArticle) => (
              <TeachingCenterCard
                key={relatedArticle.documentId}
                article={relatedArticle}
                locale={locale}
              />
            ))}
          </div>
        </section>
      )}
    </main>
  );
}
