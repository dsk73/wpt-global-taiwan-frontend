// src/schemas/community-page.schema.ts

import { z } from "zod";

/**
 * ============================================================
 * Community Icon Schema
 * ============================================================
 */

export const communityIconSchema = z.object({
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
 * Social Link Schema
 * ============================================================
 */

export const communitySocialLinkSchema = z.object({
  id: z.number(),

  // Platform is now a localized text field in Strapi
  Platform: z.string(),

  Label: z.string(),

  Icon: communityIconSchema.nullable(),

  URL: z.string(),

  DisplayOrder: z.number(),

  Active: z.boolean(),
});

/**
 * ============================================================
 * Community Page Schema
 * ============================================================
 */

export const communityPageSchema = z.object({
  id: z.number(),
  documentId: z.string(),

  HeroTitle: z.string(),

  HeroDescription: z.string(),

  // LINE
  LINEID: z.string(),

  LINEButtonText: z.string(),

  LINEButtonURL: z.string(),

  BottomDescription: z.string(),

  SocialLink: z.array(communitySocialLinkSchema),

  createdAt: z.string().optional(),
  updatedAt: z.string().optional(),
  publishedAt: z.string().optional(),

  locale: z.string().optional(),
});

/**
 * ============================================================
 * Community API Response Schema
 * ============================================================
 */

export const communityPageResponseSchema = z.object({
  data: communityPageSchema,
  meta: z.object({}).optional(),
});

/**
 * ============================================================
 * Export Types
 * ============================================================
 */

export type CommunityIconDTO = z.infer<typeof communityIconSchema>;
export type CommunitySocialLinkDTO = z.infer<typeof communitySocialLinkSchema>;
export type CommunityPageDTO = z.infer<typeof communityPageSchema>;
export type CommunityPageResponseDTO = z.infer<
  typeof communityPageResponseSchema
>;
