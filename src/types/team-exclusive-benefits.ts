import type { Media } from "./media";

/* ---------------------------------------
 * Team Exclusive Benefits Page
 * ------------------------------------- */

export interface TeamExclusiveBenefitsPage {
  id: number;

  documentId: string;

  /**
   * Main page / hero title.
   */
  Title: string;

  /**
   * Supporting text displayed below
   * the main hero title.
   */
  Subtitle: string;

  /**
   * Main hero/banner image.
   */
  HeroImage?: Media | null;

  /**
   * First hero benefit highlight.
   */
  HeroBenefit1: string;

  /**
   * Second hero benefit highlight.
   */
  HeroBenefit2: string;

  /**
   * Third hero benefit highlight.
   */
  HeroBenefit3: string;

  /**
   * Fourth hero benefit highlight.
   */
  HeroBenefit4: string;

  /**
   * Bottom CTA background image.
   */
  CTAImage?: Media | null;

  /**
   * Bottom CTA heading.
   */
  CTAHeading: string;

  /**
   * Registration CTA label.
   */
  RegisterButtonLabel: string;

  /**
   * Registration CTA destination.
   *
   * Nullable because the URL may not have
   * been configured in Strapi yet.
   */
  RegisterButtonURL: string | null;

  /**
   * Official LINE CTA label.
   */
  LineButtonLabel: string;

  /**
   * Official LINE CTA destination.
   *
   * Nullable because the URL may not have
   * been configured in Strapi yet.
   */
  LineButtonURL: string | null;

  /**
   * Whether the LINE CTA should open
   * in a new browser tab.
   */
  LineButtonOpenInNewTab: boolean;

  /**
   * Locale is optional because Strapi's
   * Single Type response does not currently
   * include it in the returned data object.
   */
  locale?: string;
}

/* ---------------------------------------
 * Team Exclusive Benefit
 * ------------------------------------- */

export interface TeamExclusiveBenefit {
  id: number;

  documentId?: string;

  /**
   * Benefit step number.
   *
   * Example:
   * 1, 2, 3, 4, 5
   */
  StepNumber: number;

  /**
   * Main benefit title.
   */
  Title: string;

  /**
   * Optional benefit subtitle.
   */
  Subtitle?: string | null;

  /**
   * Main benefit description/content.
   *
   * Supports Markdown / rich text content.
   */
  Content: string;

  /**
   * Redemption section title.
   *
   * Example:
   * 領取方式
   */
  RedemptionTitle: string;

  /**
   * Redemption instructions/content.
   */
  RedemptionContent: string;

  /**
   * Benefit image.
   */
  Image?: Media | null;

  /**
   * Frontend display order.
   */
  DisplayOrder: number;

  /**
   * Locale may not be included in the
   * Strapi response.
   */
  locale?: string;
}

/* ---------------------------------------
 * API Responses
 * ------------------------------------- */

export interface TeamExclusiveBenefitsPageResponse {
  data: TeamExclusiveBenefitsPage;
}

export interface TeamExclusiveBenefitsResponse {
  data: TeamExclusiveBenefit[];
}
