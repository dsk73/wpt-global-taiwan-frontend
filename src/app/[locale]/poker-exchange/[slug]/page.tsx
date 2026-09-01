// src/app/[locale]/poker-exchange/[slug]/page.tsx

import type { Metadata } from "next";
import Image from "next/image";
import { notFound } from "next/navigation";
import { CalendarDays, Clock } from "lucide-react";

import PokerExchangeCard from "@/features/poker-exchange/components/PokerExchangeCard";

import { getMediaUrl } from "@/lib/media";

import {
  buildCanonical,
  buildLanguageAlternates,
  buildSEOImageUrl,
  createMetadata,
  getOpenGraphLocale,
} from "@/lib/metadata";

import {
  getPokerExchangeArticleBySlug,
  getRelatedPokerExchangeArticles,
} from "@/services";

import type { Locale } from "@/providers";

import { isValidLocale } from "@/config/languages";

/* ============================================================
   Props
============================================================ */

interface PokerExchangeDetailPageProps {
  params: Promise<{
    locale: Locale;
    slug: string;
  }>;
}

/* ============================================================
   Metadata
============================================================ */

export async function generateMetadata({
  params,
}: PokerExchangeDetailPageProps): Promise<Metadata> {
  const { locale, slug } = await params;

  if (!isValidLocale(locale)) {
    notFound();
  }

  const article = await getPokerExchangeArticleBySlug(slug, locale);

  if (!article) {
    return {
      title: "Article Not Found",
      robots: {
        index: false,
        follow: false,
      },
    };
  }

  const title = article.SEO?.MetaTitle ?? article.Title;

  const description = article.SEO?.MetaDescription ?? article.Summary ?? "";

  const image = buildSEOImageUrl(
    article.SEO?.OGImage?.url ??
      article.BannerImage?.url ??
      article.Thumbnail?.url,
  );

  const canonical =
    article.SEO?.CanonicalURL ??
    buildCanonical(locale, `/poker-exchange/${article.Slug}`);

  const languages = buildLanguageAlternates(`/poker-exchange/${article.Slug}`);

  return createMetadata({
    title,

    description,

    keywords: article.SEO?.Keywords ?? undefined,

    robots: article.SEO?.Robots ?? undefined,

    canonical,

    image,

    locale: getOpenGraphLocale(locale),

    type: "article",

    alternates: {
      canonical,
      languages,
    },
  });
}

/* ============================================================
   PAGE
============================================================ */

export default async function PokerExchangeDetailPage({
  params,
}: PokerExchangeDetailPageProps) {
  const { locale, slug } = await params;

  if (!isValidLocale(locale)) {
    notFound();
  }

  const article = await getPokerExchangeArticleBySlug(slug, locale);

  if (!article) {
    notFound();
  }

  const relatedArticles = await getRelatedPokerExchangeArticles(
    article,
    locale,
  );

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
              <PokerExchangeCard
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
