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
 * Teaching Guide Step
 * ------------------------------------- */

export const teachingGuideStepSchema = z.object({
  id: z.number(),
  StepNumber: z.number(),
  Content: z.string(),
  Image: mediaSchema,
  DisplayOrder: z.number(),
});

/* ---------------------------------------
 * Teaching Guide Section
 * ------------------------------------- */

export const teachingGuideSectionSchema = z.object({
  id: z.number(),
  Title: z.string(),
  Columns: z.number(),
  DisplayOrder: z.number(),
  Steps: z.array(teachingGuideStepSchema),
});

/* ---------------------------------------
 * CTA Button
 * ------------------------------------- */

export const teachingGuideCTASchema = z.object({
  id: z.number().optional(),
  Label: z.string(),
  URL: z.string(),
  OpenInNewTab: z.boolean(),
});

/* ---------------------------------------
 * Teaching Guide
 * ------------------------------------- */

export const teachingGuideSchema = z.object({
  id: z.number(),
  documentId: z.string(),

  Title: z.string(),
  Slug: z.string(),

  /**
   * Dedicated thumbnail used on the
   * Teaching Center guide card.
   */
  Thumbnail: mediaSchema,

  /**
   * Guide sections containing
   * instructional steps.
   */
  Sections: z.array(teachingGuideSectionSchema),

  /**
   * Optional single CTA displayed
   * at the bottom of the guide.
   */
  CTA: teachingGuideCTASchema.nullable().optional(),

  locale: z.string(),
});

/* ---------------------------------------
 * Teaching Center Page
 * ------------------------------------- */

export const teachingCenterPageSchema = z.object({
  id: z.number(),
  documentId: z.string(),

  HeroTitle: z.string(),

  GuideSectionTitle: z.string(),
  GuideSectionDescription: z.string(),

  SEO: seoSchema.nullable(),

  locale: z.string(),
});

/* ---------------------------------------
 * API Schemas
 * ------------------------------------- */

export const teachingGuideListSchema = z.array(teachingGuideSchema);

/* ---------------------------------------
 * Inferred Types
 * ------------------------------------- */

export type TeachingGuideSchema = z.infer<typeof teachingGuideSchema>;

export type TeachingCenterPageSchema = z.infer<typeof teachingCenterPageSchema>;

export type TeachingGuideStepSchema = z.infer<typeof teachingGuideStepSchema>;

export type TeachingGuideSectionSchema = z.infer<
  typeof teachingGuideSectionSchema
>;

export type TeachingGuideCTASchema = z.infer<typeof teachingGuideCTASchema>;
