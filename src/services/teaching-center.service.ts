// src/services/teaching-center.service.ts

import {
  getTeachingCenterArticle,
  getTeachingCenterArticles,
} from "./api/teaching-center.api";

import type { Locale } from "@/providers";
import type { TeachingCenterArticle } from "@/types/teaching-center";

/**
 * Get all active Teaching Center articles
 */
export async function fetchTeachingCenterArticles(
  locale: Locale,
): Promise<TeachingCenterArticle[]> {
  const articles = await getTeachingCenterArticles(locale);

  return articles.filter((article) => article.Active);
}

/**
 * Get a single Teaching Center article by slug
 */
export async function fetchTeachingCenterArticle(
  slug: string,
  locale: Locale,
): Promise<TeachingCenterArticle | null> {
  const articles = await getTeachingCenterArticle(slug, locale);

  return articles.length > 0 ? articles[0] : null;
}