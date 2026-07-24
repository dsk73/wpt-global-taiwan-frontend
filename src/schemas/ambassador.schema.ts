import { z } from "zod";

/**
 * ============================================================
 * Ambassador Photo Schema
 * ============================================================
 */

export const ambassadorPhotoSchema = z.object({
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
 * Brand Ambassador Schema
 * ============================================================
 */

export const ambassadorSchema = z.object({
  id: z.number(),
  documentId: z.string(),

  Name: z.string(),

  Position: z.string(),

  Description: z.string(),

  DisplayOrder: z.number(),

  Active: z.boolean(),

  Photo: ambassadorPhotoSchema,

  locale: z.string(),

  createdAt: z.string().optional(),
  updatedAt: z.string().optional(),
  publishedAt: z.string().optional(),

  localizations: z.array(z.unknown()).optional(),
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

export const ambassadorMetaSchema = z.object({
  pagination: paginationSchema.optional(),
});

/**
 * ============================================================
 * Brand Ambassador API Response Schema
 * ============================================================
 */

export const ambassadorResponseSchema = z.object({
  data: z.array(ambassadorSchema),
  meta: ambassadorMetaSchema.optional(),
});

/**
 * ============================================================
 * Export Types
 * ============================================================
 */

export type AmbassadorPhotoDTO = z.infer<typeof ambassadorPhotoSchema>;
export type AmbassadorDTO = z.infer<typeof ambassadorSchema>;
export type AmbassadorResponseDTO = z.infer<
  typeof ambassadorResponseSchema
>;