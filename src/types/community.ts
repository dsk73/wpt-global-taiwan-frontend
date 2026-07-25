// src/types/community.ts

import type { Locale } from "@/providers";
import type { Media } from "@/types/media";

export interface Category {
  id: number;
  documentId?: string;
  Name: string;
  Slug: string;
  Color?: string | null;
}

export interface SEO {
  MetaTitle?: string | null;
  MetaDescription?: string | null;
  Keywords?: string[] | null;
  CanonicalURL?: string | null;
  Robots?: string | null;
  SocialImage?: Media | null;
}

export type CommunityStatus =
  | "Upcoming"
  | "Live"
  | "Completed";

export interface Community {
  id: number;
  documentId: string;

  Title: string;
  Slug: string;

  Summary: string;
  Content: string;

  Thumbnail?: Media | null;
  BannerImage?: Media | null;

  Gallery?: Media[];

  Featured?: boolean;

  PublishedDate?: string | null;

  ReadingTime?: number | null;

  Author?: string | null;

  Tags?: string[] | null;

  ActivityStatus?: CommunityStatus | null;

  Category?: Category | null;

  SEO?: SEO | null;

  locale: Locale;

  createdAt: string;
  updatedAt: string;
  publishedAt: string;

  localizations?: Community[];
}