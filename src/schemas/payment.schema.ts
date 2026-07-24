import { z } from "zod";

/**
 * ============================================================
 * Payment Logo Schema
 * ============================================================
 */

export const paymentLogoSchema = z.object({
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
 * Payment Method Schema
 * ============================================================
 */

export const paymentSchema = z.object({
  id: z.number(),
  documentId: z.string(),

  Name: z.string(),

  Description: z.string(),

  ProcessingTime: z.string(),

  SupportedCurrencies: z.array(z.string()),

  MinimumDeposit: z.number(),

  MaximumDeposit: z.number(),

  DisplayOrder: z.number(),

  Active: z.boolean(),

  Logo: paymentLogoSchema,

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

export const paymentPaginationSchema = z.object({
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

export const paymentMetaSchema = z.object({
  pagination: paymentPaginationSchema.optional(),
});

/**
 * ============================================================
 * Payment API Response Schema
 * ============================================================
 */

export const paymentResponseSchema = z.object({
  data: z.array(paymentSchema),
  meta: paymentMetaSchema.optional(),
});

/**
 * ============================================================
 * Export Types
 * ============================================================
 */

export type PaymentLogoDTO = z.infer<typeof paymentLogoSchema>;
export type PaymentDTO = z.infer<typeof paymentSchema>;
export type PaymentResponseDTO = z.infer<
  typeof paymentResponseSchema
>;