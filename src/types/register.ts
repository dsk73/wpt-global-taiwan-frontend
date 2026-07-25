import type { Media } from "./media";

export interface RegisterStep {
  id: number;

  Title: string;
  Description: string;

  Icon?: Media | null;
}

export interface RegisterSEO {
  MetaTitle?: string;
  MetaDescription?: string;
  CanonicalURL?: string;

  OGImage?: Media | null;

  Robots?: string;
  Keywords?: string;
}

export interface RegisterPage {
  id: number;
  documentId: string;

  Title: string;
  BannerImage?: Media | null;

  Content: string;

  StepsBadge: string;
  StepsTitle: string;
  StepsDescription: string;

  Steps: RegisterStep[];

  SEO?: RegisterSEO | null;

  locale: string;

  createdAt: string;
  updatedAt: string;
  publishedAt: string;
}
