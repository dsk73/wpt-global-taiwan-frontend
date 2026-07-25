import type { Locale } from "@/providers";

import type { Category } from "./category";
import type { Media } from "./media";

export interface PokerExchangeArticle {
  id: number;
  documentId: string;

  Title: string;
  Slug: string;
  Summary: string;
  Content: string;

  Featured: boolean;
  PublishDate: string;
  ReadingTime: number;
  DisplayOrder: number;
  Active: boolean;

  Tags?: string[] | null;

  Thumbnail?: Media | null;
  BannerImage?: Media | null;
  Gallery?: Media[] | null;

  category?: Category | null;
  SEO?: unknown | null;

  locale: Locale;
  localizations?: PokerExchangeArticle[];

  createdAt: string;
  updatedAt: string;
  publishedAt: string;
}

export interface PokerExchangeListResponse {
  data: PokerExchangeArticle[];
}

export interface PokerExchangeResponse {
  data: PokerExchangeArticle;
}