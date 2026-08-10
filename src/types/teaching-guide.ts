import type { Media } from "./media";

/* ---------------------------------------
 * SEO
 * ------------------------------------- */

export interface SEO {
  MetaTitle: string;
  MetaDescription: string;
  CanonicalURL: string;
  Keywords: string;
  Robots: string;
  OGImage?: Media | null;
}

/* ---------------------------------------
 * Teaching Guide Step
 * ------------------------------------- */

export interface TeachingGuideStep {
  id: number;
  StepNumber: number;
  Content: string;
  Image?: Media | null;
  DisplayOrder: number;
}

/* ---------------------------------------
 * Teaching Guide Section
 * ------------------------------------- */

export interface TeachingGuideSection {
  id: number;
  Title: string;

  /**
   * Number of columns to display for this section.
   *
   * Examples:
   * 3 = Computer section
   * 4 = Mobile section
   */
  Columns: number;

  DisplayOrder: number;
  Steps: TeachingGuideStep[];
}

/* ---------------------------------------
 * CTA Button
 * ------------------------------------- */

export interface TeachingGuideCTA {
  id?: number;
  Label: string;
  URL: string;
  OpenInNewTab: boolean;
}

/* ---------------------------------------
 * Teaching Guide
 * ------------------------------------- */

export interface TeachingGuide {
  id: number;
  documentId: string;

  Title: string;
  Slug: string;

  /**
   * Dedicated thumbnail used for the
   * Teaching Center guide card.
   */
  Thumbnail?: Media | null;

  /**
   * Guide sections containing the
   * individual instructional steps.
   */
  Sections: TeachingGuideSection[];

  /**
   * Optional single CTA displayed at
   * the bottom of the guide detail page.
   */
  CTA?: TeachingGuideCTA | null;

  locale: string;
}

/* ---------------------------------------
 * Teaching Center Page
 * ------------------------------------- */

export interface TeachingCenterPage {
  id: number;
  documentId: string;

  HeroTitle: string;

  GuideSectionTitle: string;
  GuideSectionDescription: string;

  SEO?: SEO | null;

  locale: string;
}

/* ---------------------------------------
 * API Responses
 * ------------------------------------- */

export interface TeachingGuideResponse {
  data: TeachingGuide[];
}

export interface TeachingGuideSingleResponse {
  data: TeachingGuide;
}

export interface TeachingCenterPageResponse {
  data: TeachingCenterPage;
}
