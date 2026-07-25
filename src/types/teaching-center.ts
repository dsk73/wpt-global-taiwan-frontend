// src/types/teaching-center.ts

import type { Category } from "./category";
import type { Media } from "./media";

export interface TeachingCenterArticle {
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

  Tags: string[];

  Thumbnail?: Media | null;
  BannerImage?: Media | null;
  Gallery?: Media[];

  SEO?: unknown;

  category?: Category | null;

  locale: string;
  localizations?: TeachingCenterArticle[];

  createdAt: string;
  updatedAt: string;
  publishedAt: string;
}