import { z } from "zod";

/* ---------------------------------------
 * Shared Schemas
 * ------------------------------------- */

export const mediaSchema = z
  .object({
    id: z.number(),
    documentId: z.string().optional(),
    url: z.string(),
    alternativeText: z.string().nullable().optional(),
    width: z.number().nullable().optional(),
    height: z.number().nullable().optional(),
  })
  .nullable()
  .optional();

export const seoSchema = z.object({
  MetaTitle: z.string(),
  MetaDescription: z.string(),
  CanonicalURL: z.string(),
  Keywords: z.string(),
  Robots: z.string(),
  OGImage: mediaSchema,
});

/* ---------------------------------------
 * Guide Section
 * ------------------------------------- */

export const guideSectionSchema = z.object({
  id: z.number(),
  Title: z.string(),
  Description: z.string(),
  Image: mediaSchema,
});

/* ---------------------------------------
 * Teaching Guide
 * ------------------------------------- */

export const teachingGuideSchema = z.object({
  id: z.number(),

  documentId: z.string(),

  Title: z.string(),

  Slug: z.string(),

  Summary: z.string(),

  Content: z.string(),

  Thumbnail: mediaSchema,

  BannerImage: mediaSchema,

  DisplayOrder: z.number(),

  Active: z.boolean(),

  GuideType: z.enum([
    "Download",
    "Register",
    "Deposit",
    "Withdrawal",
    "MultiCurrency",
    "Verification",
    "Bonus",
    "Tournament",
    "Security",
    "FAQ",
    "Other",
  ]),

  GuideSections: z.array(guideSectionSchema),

  locale: z.string(),
});

/* ---------------------------------------
 * Teaching Center Page
 * ------------------------------------- */

export const teachingCenterPageSchema = z.object({
  id: z.number(),

  documentId: z.string(),

  HeroTitle: z.string(),

  HeroSubtitle: z.string(),

  GuideSectionTitle: z.string(),

  GuideSectionDescription: z.string(),

  SEO: seoSchema.nullable(),

  locale: z.string(),
});

/* ---------------------------------------
 * API Schemas
 * ------------------------------------- */

export const teachingGuideListSchema = z.array(teachingGuideSchema);

export type TeachingGuideSchema = z.infer<typeof teachingGuideSchema>;

export type TeachingCenterPageSchema = z.infer<typeof teachingCenterPageSchema>;

export type GuideSectionSchema = z.infer<typeof guideSectionSchema>;
