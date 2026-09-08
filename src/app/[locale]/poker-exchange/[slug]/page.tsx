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
  buildPageTitle,
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

  /* ==========================================================
     Validate Locale
  ========================================================== */

  if (!isValidLocale(locale)) {
    notFound();
  }

  /* ==========================================================
     Fetch Article
  ========================================================== */

  const article = await getPokerExchangeArticleBySlug(slug, locale);

  /* ==========================================================
     Article Not Found
  ========================================================== */

  if (!article) {
    return {
      title: "Article Not Found",
      robots: {
        index: false,
        follow: false,
      },
    };
  }

  /* ==========================================================
     SEO Title
  ========================================================== */

  const title = article.SEO?.MetaTitle?.trim() || article.Title;

  /* ==========================================================
     SEO Description
  ========================================================== */

  const description =
    article.SEO?.MetaDescription?.trim() ||
    article.Summary?.trim() ||
    article.Title;

  /* ==========================================================
     SEO Image
  ========================================================== */

  const imageSource =
    article.SEO?.OGImage?.url ||
    article.BannerImage?.url ||
    article.Thumbnail?.url;

  const image = imageSource ? buildSEOImageUrl(imageSource) : undefined;

  /* ==========================================================
     Canonical
  ========================================================== */

  const canonical = buildCanonical(locale, `/poker-exchange/${article.Slug}`);

  /* ==========================================================
     Language Alternates
  ========================================================== */

  const languages = buildLanguageAlternates(`/poker-exchange/${article.Slug}`);

  /* ==========================================================
     Robots
  ========================================================== */

  const robots = article.SEO?.Robots ?? undefined;

  /* ==========================================================
     Keywords
  ========================================================== */

  const keywords =
    article.SEO?.Keywords && article.SEO.Keywords.length > 0
      ? article.SEO.Keywords
      : article.Tags && article.Tags.length > 0
        ? article.Tags
        : undefined;

  /* ==========================================================
     Metadata
  ========================================================== */

  return createMetadata({
    title: buildPageTitle(title),

    description,

    keywords,

    robots,

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

  /* ==========================================================
     Validate Locale
  ========================================================== */

  if (!isValidLocale(locale)) {
    notFound();
  }

  /* ==========================================================
     Fetch Article
  ========================================================== */

  const article = await getPokerExchangeArticleBySlug(slug, locale);

  /* ==========================================================
     Article Not Found
  ========================================================== */

  if (!article) {
    notFound();
  }

  /* ==========================================================
     Related Articles
  ========================================================== */

  const relatedArticles = await getRelatedPokerExchangeArticles(
    article,
    locale,
  );

  /* ==========================================================
     Article Image
  ========================================================== */

  const bannerImage = article.BannerImage
    ? getMediaUrl(article.BannerImage.url)
    : null;

  /* ==========================================================
     PAGE
  ========================================================== */

  return (
    <main className="container mx-auto px-4 py-16 lg:px-8">
      {/* ======================================================
          ARTICLE BANNER
      ====================================================== */}

      {bannerImage && (
        <div
          className="
            relative
            mb-10
            aspect-16/7
            overflow-hidden
            rounded-3xl
          "
        >
          <Image
            src={bannerImage}
            alt={article.Title}
            fill
            priority
            sizes="
              (max-width: 768px) 100vw,
              (max-width: 1280px) 90vw,
              1200px
            "
            className="object-cover"
          />
        </div>
      )}

      {/* ======================================================
          ARTICLE
      ====================================================== */}

      <article className="mx-auto max-w-4xl">
        {/* ====================================================
            ARTICLE HEADER
        ==================================================== */}

        <header>
          {/* ==================================================
              CATEGORY
          ================================================== */}

          {article.category && (
            <span
              className="
                mb-5
                inline-flex
                rounded-full
                px-4
                py-2
                text-sm
                font-semibold
                text-white
              "
              style={{
                backgroundColor: article.category.Color,
              }}
            >
              {article.category.Name}
            </span>
          )}

          {/* ==================================================
              TITLE
          ================================================== */}

          <h1
            className="
              mb-6
              text-4xl
              font-bold
              leading-tight

              lg:text-5xl
            "
          >
            {article.Title}
          </h1>

          {/* ==================================================
              ARTICLE META
          ================================================== */}

          <div
            className="
              mb-8
              flex
              flex-wrap
              items-center
              gap-6
              text-sm
              text-slate-400
            "
          >
            {/* ==================================================
                PUBLISH DATE
            ================================================== */}

            {article.PublishDate && (
              <time
                className="
                  flex
                  items-center
                  gap-2
                "
                dateTime={article.PublishDate}
              >
                <CalendarDays size={16} />

                <span>{article.PublishDate}</span>
              </time>
            )}

            {/* ==================================================
                READING TIME
            ================================================== */}

            {article.ReadingTime && (
              <span
                className="
                  flex
                  items-center
                  gap-2
                "
              >
                <Clock size={16} />

                <span>{article.ReadingTime} min read</span>
              </span>
            )}
          </div>

          {/* ==================================================
              TAGS
          ================================================== */}

          {article.Tags && article.Tags.length > 0 && (
            <div
              className="
                  mb-8
                  flex
                  flex-wrap
                  gap-2
                "
            >
              {article.Tags.map((tag) => (
                <span
                  key={tag}
                  className="
                      rounded-full
                      border
                      border-white/10
                      bg-white/5
                      px-3
                      py-1
                      text-sm
                      text-slate-300
                    "
                >
                  {tag}
                </span>
              ))}
            </div>
          )}
        </header>

        {/* ====================================================
            ARTICLE CONTENT
        ==================================================== */}

        <div
          className="
            prose
            prose-invert
            max-w-none
            prose-headings:text-white
            prose-p:text-slate-300
            prose-li:text-slate-300
          "
          dangerouslySetInnerHTML={{
            __html: article.Content,
          }}
        />
      </article>

      {/* ======================================================
          RELATED ARTICLES
      ====================================================== */}

      {relatedArticles.length > 0 && (
        <section aria-labelledby="related-articles-heading" className="mt-24">
          <h2
            id="related-articles-heading"
            className="
              mb-10
              text-3xl
              font-bold
            "
          >
            Related Articles
          </h2>

          <div
            className="
              grid
              gap-8

              md:grid-cols-2

              xl:grid-cols-3
            "
          >
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
