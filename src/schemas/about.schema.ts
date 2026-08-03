// src/schemas/about.schema.ts

import { z } from "zod";

const mediaSchema = z
  .object({
    id: z.number(),
    documentId: z.string().optional(),
    name: z.string().optional(),
    alternativeText: z.string().nullable().optional(),
    caption: z.string().nullable().optional(),
    width: z.number().optional(),
    height: z.number().optional(),
    formats: z.any().optional(),
    hash: z.string().optional(),
    ext: z.string().optional(),
    mime: z.string().optional(),
    size: z.number().optional(),
    url: z.string(),
    previewUrl: z.string().nullable().optional(),
    provider: z.string().optional(),
  })
  .nullable()
  .optional();

const coreValueSchema = z.object({
  id: z.number(),
  Title: z.string(),
  Description: z.string(),
});

const seoSchema = z
  .object({
    MetaTitle: z.string().optional(),
    MetaDescription: z.string().optional(),
    CanonicalURL: z.string().optional(),
    OGImage: mediaSchema,
    Robots: z.string().optional(),
    Keywords: z.string().optional(),
  })
  .nullable()
  .optional();

export const aboutPageSchema = z.object({
  id: z.number(),
  documentId: z.string(),

  Title: z.string(),

  BannerImage: mediaSchema,

  IntroductionLogo: mediaSchema,

  IntroductionContent: z.string(),

  GlobalImage: mediaSchema,

  MissionTitle: z.string(),
  MissionContent: z.string(),
  MissionImage: mediaSchema,

  VisionTitle: z.string(),
  VisionContent: z.string(),
  VisionImage: mediaSchema,

  CoreValuesTitle: z.string(),

  CoreValues: z.array(coreValueSchema),

  SEO: seoSchema,

  locale: z.string(),

  createdAt: z.string(),
  updatedAt: z.string(),
  publishedAt: z.string(),
});

export type AboutPageSchema = z.infer<typeof aboutPageSchema>;
