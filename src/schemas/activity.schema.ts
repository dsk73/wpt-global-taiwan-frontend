import { z } from "zod";

import {
  heroImageSchema,
  paginationSchema,
} from "./hero.schema";

/**
 * ============================================================
 * Activity SEO Schema
 * ============================================================
 */

export const activitySEOSchema = z.object({
  id: z.number(),

  MetaTitle: z.string().nullable(),
  MetaDescription: z.string().nullable(),

  CanonicalURL: z.string().nullable(),

  Robots: z.string().nullable(),

  Keywords: z.string().nullable(),
});

/**
 * ============================================================
 * Activity Category Schema
 * ============================================================
 */

export const activityCategorySchema = z.object({
  id: z.number(),
  documentId: z.string(),

  Name: z.string(),
  Slug: z.string(),
});

/**
 * ============================================================
 * Activity Schema
 * ============================================================
 */

export const activitySchema: z.ZodTypeAny = z.lazy(() =>
  z.object({
    id: z.number(),
    documentId: z.string(),

    Title: z.string(),
    Slug: z.string(),

    Summary: z.string(),
    Content: z.string(),

    Featured: z.boolean(),
    Active: z.boolean(),

    PublishDate: z.string(),

    ReadingTime: z.number(),

    DisplayOrder: z.number(),

    Tags: z.array(z.string()),

    Thumbnail: heroImageSchema.nullable(),

    BannerImage: heroImageSchema.nullable(),

    Gallery: z.array(heroImageSchema),

    SEO: activitySEOSchema.nullable(),

    category: activityCategorySchema.nullable(),

    locale: z.string(),

    localizations: z.array(activitySchema).default([]),

    createdAt: z.string(),
    updatedAt: z.string(),
    publishedAt: z.string(),
  }),
);

/**
 * ============================================================
 * Activity Meta Schema
 * ============================================================
 */

export const activityMetaSchema = z.object({
  pagination: paginationSchema.optional(),
});

/**
 * ============================================================
 * Activities Response Schema
 * ============================================================
 */

export const activitiesResponseSchema = z.object({
  data: z.array(activitySchema),
  meta: activityMetaSchema.optional(),
});

/**
 * ============================================================
 * Single Activity Response Schema
 * ============================================================
 */

export const activityResponseSchema = z.object({
  data: activitySchema,
});

/**
 * ============================================================
 * Export Types
 * ============================================================
 */

export type ActivityDTO = z.infer<typeof activitySchema>;

export type ActivitiesResponseDTO = z.infer<
  typeof activitiesResponseSchema
>;

export type ActivityResponseDTO = z.infer<
  typeof activityResponseSchema
>;