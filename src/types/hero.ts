/**
 * ============================================================
 * Hero Types (Strapi DTO)
 * ============================================================
 *
 * These interfaces represent the raw response returned by
 * Strapi. Do NOT modify property names here.
 *
 * Any transformation into frontend-friendly models should
 * happen inside hero.service.ts.
 * ============================================================
 */

import type { Locale } from "@/providers";

/* ============================================================
 * Media
 * ============================================================ */

export interface HeroImage {
  id: number;
  documentId: string;

  name: string;

  alternativeText: string | null;
  caption: string | null;

  width: number;
  height: number;

  url: string;

  formats?: Record<string, unknown>;

  hash?: string;
  ext?: string;
  mime?: string;
  size?: number;

  createdAt?: string;
  updatedAt?: string;
}

/* ============================================================
 * SEO
 * ============================================================ */

export interface HeroSEO {
  id: number;

  MetaTitle: string | null;
  MetaDescription: string | null;

  CanonicalURL: string | null;

  Robots: string | null;

  Keywords: string | null;
}

/* ============================================================
 * Hero Promotion Card
 * ============================================================ */

export interface HeroPromotionBenefit {
  id: number;

  Title: string | null;
  Description: string | null;

  Icon: HeroImage | null;
}

export interface HeroPromotionCard {
  id: number;
  documentId: string;

  CardTitle: string | null;
  Badge: string | null;

  ReferralCode: string | null;
  ReferralURL: string | null;

  ShowCountdown: boolean;
  CountdownText: string | null;

  Benefits: HeroPromotionBenefit[];

  createdAt?: string;
  updatedAt?: string;
  publishedAt?: string;

  locale?: Locale;
}

/* ============================================================
 * Hero Slide (Raw Strapi Response)
 * ============================================================ */

export interface HeroSlide {
  id: number;
  documentId: string;

  Title: string | null;
  Subtitle: string | null;
  Description: string | null;

  PrimaryButtonText: string | null;
  PrimaryButtonURL: string | null;

  DisplayOrder: number;
  Active: boolean;

  DesktopImage: HeroImage | null;
  MobileImage: HeroImage | null;

  SEO?: HeroSEO | null;

  createdAt?: string;
  updatedAt?: string;
  publishedAt?: string;

  locale?: Locale;
}

/* ============================================================
 * Pagination
 * ============================================================ */

export interface Pagination {
  page: number;
  pageSize: number;
  pageCount: number;
  total: number;
}

/* ============================================================
 * API Meta
 * ============================================================ */

export interface HeroMeta {
  pagination?: Pagination;
}

/* ============================================================
 * Hero API Response
 * ============================================================ */

export interface HeroApiResponse {
  slides: HeroSlide[];
  promotionCard: HeroPromotionCard | null;
}
