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

const aboutFeatureSchema = z.object({
  id: z.number(),
  Title: z.string(),
  Description: z.string(),
  Image: mediaSchema,
  ButtonText: z.string().nullable().optional(),
  ButtonURL: z.string().nullable().optional(),
  DisplayOrder: z.number(),
  Active: z.boolean(),
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

  // Hero
  HeroTitle: z.string(),
  HeroSubtitle: z.string(),
  HeroBannerImage: mediaSchema,

  // About Section
  AboutTitle: z.string(),
  AboutLogo: mediaSchema,
  AboutContent: z.string(),

  // Intro Section
  SectionTitle: z.string(),
  SectionContent: z.string(),
  SectionImage: mediaSchema,

  // Features
  Features: z.array(aboutFeatureSchema),

  // SEO
  SEO: seoSchema,

  // Localization
  locale: z.string(),

  // Timestamps
  createdAt: z.string(),
  updatedAt: z.string(),
  publishedAt: z.string(),
});

export type AboutPageSchema = z.infer<typeof aboutPageSchema>;
