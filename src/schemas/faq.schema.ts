// src/schemas/faq.schema.ts

import { z } from "zod";

export const faqCategorySchema = z.enum([
  "my-account",
  "wpt-global",
  "kyc",
  "deposits",
  "withdrawals",
  "account-security",
  "promotions",
]);

export const faqSchema = z.object({
  id: z.number(),
  documentId: z.string(),

  Question: z.string(),

  Answer: z.string(),

  Category: faqCategorySchema,

  DisplayOrder: z.number(),

  Active: z.boolean(),

  locale: z.string(),

  createdAt: z.string(),
  updatedAt: z.string(),
  publishedAt: z.string(),
});

export const faqListSchema = z.array(faqSchema);

export type FAQSchema = z.infer<typeof faqSchema>;
export type FAQListSchema = z.infer<typeof faqListSchema>;
export type FAQCategorySchema = z.infer<typeof faqCategorySchema>;
