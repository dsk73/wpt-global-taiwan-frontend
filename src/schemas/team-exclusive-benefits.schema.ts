import { z } from "zod";

/* ---------------------------------------
 * Shared Media Schema
 * ------------------------------------- */

const mediaSchema = z
  .object({
    id: z.number(),
    documentId: z.string().optional(),
    url: z.string(),
    alternativeText: z.string().nullable().optional(),
    width: z.number().nullable().optional(),
    height: z.number().nullable().optional(),
    mime: z.string().nullable().optional(),
  })
  .nullable()
  .optional();

/* ---------------------------------------
 * Team Exclusive Benefits Page
 * Single Type
 * ------------------------------------- */

export const teamExclusiveBenefitsPageSchema = z.object({
  id: z.number(),

  documentId: z.string(),

  /*
   * Hero content
   */
  Title: z.string(),

  Subtitle: z.string(),

  HeroImage: mediaSchema,

  /*
   * Hero benefit highlights
   */
  HeroBenefit1: z.string(),

  HeroBenefit2: z.string(),

  HeroBenefit3: z.string(),

  HeroBenefit4: z.string(),

  /*
   * Bottom CTA
   */
  CTAImage: mediaSchema,

  CTAHeading: z.string(),

  /*
   * Registration CTA
   */
  RegisterButtonURL: z.string().nullable(),

  RegisterButtonLabel: z.string(),

  /*
   * Official LINE CTA
   */
  LineButtonURL: z.string().nullable(),

  LineButtonLabel: z.string(),

  LineButtonOpenInNewTab: z.boolean(),

  /*
   * Locale is intentionally not required.
   *
   * Strapi's Single Type response in this project
   * does not currently return locale.
   */
});

/* ---------------------------------------
 * Team Exclusive Benefit
 * Collection Type
 * ------------------------------------- */

export const teamExclusiveBenefitSchema = z.object({
  id: z.number(),

  documentId: z.string().optional(),

  /*
   * Step information
   */
  StepNumber: z.number(),

  Title: z.string(),

  Subtitle: z.string().nullable().optional(),

  /*
   * Main benefit content
   */
  Content: z.string(),

  /*
   * Redemption information
   */
  RedemptionTitle: z.string(),

  RedemptionContent: z.string(),

  /*
   * Benefit artwork
   */
  Image: mediaSchema,

  /*
   * Display order
   */
  DisplayOrder: z.number(),

  /*
   * Locale is intentionally not required because
   * the current Strapi collection response may omit it.
   */
});

/* ---------------------------------------
 * API Schemas
 * ------------------------------------- */

export const teamExclusiveBenefitsListSchema = z.array(
  teamExclusiveBenefitSchema,
);

/* ---------------------------------------
 * Inferred Types
 * ------------------------------------- */

export type TeamExclusiveBenefitsPageSchema = z.infer<
  typeof teamExclusiveBenefitsPageSchema
>;

export type TeamExclusiveBenefitSchema = z.infer<
  typeof teamExclusiveBenefitSchema
>;
