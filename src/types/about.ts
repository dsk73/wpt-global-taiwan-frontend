// src/types/about.ts

import type { Media } from "./media";

export interface AboutFeature {
  id: number;
  Title: string;
  Description: string;
  Image?: Media | null;
  DisplayOrder: number;
  Active: boolean;
}

export interface AboutSEO {
  MetaTitle?: string;
  MetaDescription?: string;
  CanonicalURL?: string;
  OGImage?: Media | null;
  Robots?: string;
  Keywords?: string;
}

export interface AboutPage {
  id: number;
  documentId: string;

  // Hero
  HeroTitle: string;
  HeroSubtitle: string;
  HeroBannerImage?: Media | null;

  // About Section
  AboutTitle: string;
  AboutLogo?: Media | null;
  AboutContent: string;

  // Intro Section
  SectionTitle: string;
  SectionContent: string;
  SectionImage?: Media | null;

  // Features
  Features: AboutFeature[];

  // SEO
  SEO?: AboutSEO | null;

  // Localization
  locale: string;

  // Timestamps
  createdAt: string;
  updatedAt: string;
  publishedAt: string;
}
