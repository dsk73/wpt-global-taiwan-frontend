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
 * Guide Section
 * ------------------------------------- */

export interface GuideSection {
  id: number;
  Title: string;
  Description: string;
  Image?: Media | null;
}

/* ---------------------------------------
 * Teaching Guide
 * ------------------------------------- */

export interface TeachingGuide {
  id: number;

  documentId: string;

  Title: string;

  Slug: string;

  Summary: string;

  Content: string;

  Thumbnail?: Media | null;

  BannerImage?: Media | null;

  DisplayOrder: number;

  Active: boolean;

  GuideType:
    | "Download"
    | "Register"
    | "Deposit"
    | "Withdrawal"
    | "MultiCurrency"
    | "Verification"
    | "Bonus"
    | "Tournament"
    | "Security"
    | "FAQ"
    | "Other";

  GuideSections: GuideSection[];

  locale: string;
}

/* ---------------------------------------
 * Teaching Center Page
 * ------------------------------------- */

export interface TeachingCenterPage {
  id: number;

  documentId: string;

  HeroTitle: string;

  HeroSubtitle: string;

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
