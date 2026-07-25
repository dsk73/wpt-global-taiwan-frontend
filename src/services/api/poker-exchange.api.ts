import { fetcher } from "@/lib/fetcher";

import type { Locale } from "@/providers";
import type { PokerExchangeArticle } from "@/types/poker-exchange";

const ENDPOINT = "/poker-exchange-articles";

export async function getPokerExchangeArticles(
  locale: Locale,
): Promise<PokerExchangeArticle[]> {
  return fetcher.getCollection<PokerExchangeArticle>(
    `${ENDPOINT}?locale=${locale}&sort[0]=DisplayOrder:asc&sort[1]=PublishDate:desc&populate=*`,
  );
}

export async function getPokerExchangeArticle(
  slug: string,
  locale: Locale,
): Promise<PokerExchangeArticle[]> {
  return fetcher.getCollection<PokerExchangeArticle>(
    `${ENDPOINT}?locale=${locale}&filters[Slug][$eq]=${encodeURIComponent(
      slug,
    )}&populate=*`,
  );
}