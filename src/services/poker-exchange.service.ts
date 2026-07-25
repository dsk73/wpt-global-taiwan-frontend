//src
import {
  getPokerExchangeArticle,
  getPokerExchangeArticles,
} from "@/services/api/poker-exchange.api";

import type { Locale } from "@/providers";
import type { PokerExchangeArticle } from "@/types/poker-exchange";

export async function getAllPokerExchangeArticles(
  locale: Locale,
): Promise<PokerExchangeArticle[]> {
 const articles = await getPokerExchangeArticles(locale);

return articles.filter((article) => article.Active);
}

export async function getFeaturedPokerExchangeArticles(
  locale: Locale,
): Promise<PokerExchangeArticle[]> {
  const articles = await getAllPokerExchangeArticles(locale);

  return articles.filter((article) => article.Featured);
}

export async function getPokerExchangeArticleBySlug(
  slug: string,
  locale: Locale,
): Promise<PokerExchangeArticle | null> {
  const articles = await getPokerExchangeArticle(slug, locale);

return articles[0] ?? null;
}

export async function getRelatedPokerExchangeArticles(
  article: PokerExchangeArticle,
  locale: Locale,
  limit = 3,
): Promise<PokerExchangeArticle[]> {
  const articles = await getAllPokerExchangeArticles(locale);

  return articles
    .filter((item) => item.documentId !== article.documentId)
    .slice(0, limit);
}