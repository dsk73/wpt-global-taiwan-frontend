import type { Media } from "./media";

/**
 * ============================================================
 * Activity Types
 * ============================================================
 *
 * Used by:
 * - Activities Listing Page
 * - Homepage Activities Section
 * - Featured Activity
 * - Activity Detail Page
 * - Related Activities
 * ============================================================
 */

export interface ActivitySEO {
  id: number;

  MetaTitle: string;
  MetaDescription: string;

  CanonicalURL: string;

  Robots?: string | null;

  Keywords?: string[] | null;
}

export interface ActivityCategory {
  id: number;
  documentId: string;

  Name: string;
  Slug: string;

  Description?: string | null;

  DisplayOrder?: number;

  locale: string;
}

export interface ActivityAuthor {
  id: number;
  documentId: string;

  Name: string;

  Avatar?: Media | null;
}

export interface Activity {
  id: number;
  documentId: string;

  Title: string;

  Slug: string;

  Summary: string;

  Content: string;

  Featured: boolean;

  Active: boolean;

  PublishDate: string;

  ReadingTime: number;

  DisplayOrder: number;

  Tags: string[];

  Thumbnail?: Media | null;

  BannerImage?: Media | null;

  Gallery?: Media[] | null;

  category?: ActivityCategory | null;

  Author?: ActivityAuthor | null;

  SEO?: ActivitySEO | null;

  locale: string;

  localizations?: Activity[];

  createdAt: string;

  updatedAt: string;

  publishedAt: string;
}

export interface ActivitiesPagination {
  page: number;

  pageSize: number;

  pageCount: number;

  total: number;
}

export interface ActivitiesResponse {
  data: Activity[];

  meta?: {
    pagination: ActivitiesPagination;
  };
}

export interface ActivityResponse {
  data: Activity;

  meta?: Record<string, never>;
}