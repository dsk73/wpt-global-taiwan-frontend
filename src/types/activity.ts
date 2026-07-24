import type { Media } from "./media";

/**
 * ============================================================
 * Activity Types
 * ============================================================
 *
 * Represents an Activity/News/Event from Strapi.
 *
 * Used by:
 * - Activities Section
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
  Gallery?: Media[];

  SEO?: ActivitySEO | null;

  category?: ActivityCategory | null;

  locale: string;

  localizations?: Activity[];

  createdAt: string;
  updatedAt: string;
  publishedAt: string;
}

export interface ActivitiesResponse {
  data: Activity[];
}

export interface ActivityResponse {
  data: Activity;
}