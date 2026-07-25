import type { ReactNode } from "react";

import type { Locale } from "@/providers";
import type { Media } from "@/types/media";

export interface BreadcrumbItem {
  label: string;
  href?: string;
}

export interface DetailHeroData {
  title: string;
  summary?: string | null;

  bannerImage?: Media | null;
  thumbnail?: Media | null;

  publishDate?: string | null;
  readingTime?: number | null;

  tags?: string[] | null;

  locale: Locale;

  breadcrumbs: BreadcrumbItem[];

  showMeta?: boolean;
  showTag?: boolean;

  tagClassName?: string;

  placeholderImage?: string;
}

export interface DetailContentData {
  content?: string | null;
}

export interface DetailGalleryData {
  images?: Media[];
}

/**
 * Data used by the RelatedContent section wrapper.
 */
export interface RelatedContentData {
  title?: string;
  subtitle?: string;
  children: ReactNode;
}

/**
 * Single related article/community card.
 */
export interface RelatedContentItem {
  id: number;
  documentId: string;

  title: string;
  slug: string;

  summary?: string | null;

  thumbnail?: Media | null;
  bannerImage?: Media | null;

  publishDate?: string | null;
  readingTime?: number | null;

  locale: Locale;
}