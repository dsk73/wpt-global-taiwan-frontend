import { z } from "zod";

/**
 * ============================================================
 * Hero Image Schema
 * ============================================================
 */

export const heroImageSchema = z.object({
  id: z.number(),
  documentId: z.string(),

  name: z.string(),

  alternativeText: z.string().nullable(),
  caption: z.string().nullable(),

  width: z.number(),
  height: z.number(),

  url: z.string(),

  formats: z.record(z.string(), z.unknown()).optional(),

  hash: z.string().optional(),
  ext: z.string().optional(),
  mime: z.string().optional(),
  size: z.number().optional(),

  createdAt: z.string().optional(),
  updatedAt: z.string().optional(),
});

/**
 * ============================================================
 * Hero SEO Schema
 * ============================================================
 */

export const heroSEOSchema = z.object({
  id: z.number(),

  MetaTitle: z.string().nullable(),
  MetaDescription: z.string().nullable(),

  CanonicalURL: z.string().nullable(),

  Robots: z.string().nullable(),

  Keywords: z.string().nullable(),
});

/**
 * ============================================================
 * Hero Promotion Benefit Schema
 * ============================================================
 */

export const heroPromotionBenefitSchema = z.object({
  id: z.number(),

  Title: z.string().nullable(),
  Description: z.string().nullable(),

  Icon: heroImageSchema.nullable(),
});

/**
 * ============================================================
 * Hero Promotion Card Schema
 * ============================================================
 */

export const heroPromotionCardSchema = z.object({
  id: z.number(),
  documentId: z.string(),

  CardTitle: z.string().nullable(),

  Badge: z.string().nullable(),

  ReferralCode: z.string().nullable(),

  CommunityButtonText: z.string().nullable(),
  CommunityButtonURL: z.string().nullable(),

  Benefits: z.array(heroPromotionBenefitSchema),

  createdAt: z.string().optional(),
  updatedAt: z.string().optional(),
  publishedAt: z.string().optional(),

  locale: z.string().optional(),
});

/**
 * ============================================================
 * Hero Slide Schema
 * ============================================================
 */

export const heroSlideSchema = z.object({
  id: z.number(),
  documentId: z.string(),

  Title: z.string().nullable(),
  Subtitle: z.string().nullable(),
  Description: z.string().nullable(),

  PrimaryButtonText: z.string().nullable(),
  PrimaryButtonURL: z.string().nullable(),

  DisplayOrder: z.number(),

  Active: z.boolean(),

  DesktopImage: heroImageSchema.nullable(),

  MobileImage: heroImageSchema.nullable(),

  SEO: heroSEOSchema.nullable().optional(),

  createdAt: z.string().optional(),
  updatedAt: z.string().optional(),
  publishedAt: z.string().optional(),

  locale: z.string().optional(),
});

/**
 * ============================================================
 * Pagination Schema
 * ============================================================
 */

export const paginationSchema = z.object({
  page: z.number(),
  pageSize: z.number(),
  pageCount: z.number(),
  total: z.number(),
});

/**
 * ============================================================
 * Meta Schema
 * ============================================================
 */

export const heroMetaSchema = z.object({
  pagination: paginationSchema.optional(),
});

/**
 * ============================================================
 * Hero API Response Schema
 * ============================================================
 */

export const heroResponseSchema = z.object({
  slides: z.array(heroSlideSchema),
  promotionCard: heroPromotionCardSchema.nullable(),
});

/**
 * ============================================================
 * Export Types
 * ============================================================
 */

export type HeroImageDTO = z.infer<typeof heroImageSchema>;
export type HeroSEODTO = z.infer<typeof heroSEOSchema>;

export type HeroPromotionBenefitDTO = z.infer<
  typeof heroPromotionBenefitSchema
>;

export type HeroPromotionCardDTO = z.infer<typeof heroPromotionCardSchema>;

export type HeroSlideDTO = z.infer<typeof heroSlideSchema>;

export type HeroResponseDTO = z.infer<typeof heroResponseSchema>;
