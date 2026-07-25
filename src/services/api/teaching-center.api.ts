// src/services/api/teaching-center.api.ts

import { fetcher } from "@/lib/fetcher";

import type { Locale } from "@/providers";
import type { TeachingCenterArticle } from "@/types/teaching-center";

const ENDPOINT = "/teaching-center-articles";

export async function getTeachingCenterArticles(
  locale: Locale,
): Promise<TeachingCenterArticle[]> {
  return fetcher.getCollection<TeachingCenterArticle>(
    `${ENDPOINT}?locale=${locale}&sort[0]=DisplayOrder:asc&sort[1]=PublishDate:desc&populate=*`,
  );
}

export async function getTeachingCenterArticle(
  slug: string,
  locale: Locale,
): Promise<TeachingCenterArticle[]> {
  return fetcher.getCollection<TeachingCenterArticle>(
    `${ENDPOINT}?locale=${locale}&filters[Slug][$eq]=${encodeURIComponent(
      slug,
    )}&populate=*`,
  );
}