// src/types/about.ts

import type { Media } from "./media";

export interface CoreValue {
  id: number;
  Title: string;
  Description: string;
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
  Title: string;
  BannerImage?: Media | null;

  // Introduction
  IntroductionLogo?: Media | null;
  IntroductionContent: string;

  // Global Section
  GlobalImage?: Media | null;

  // Mission
  MissionTitle: string;
  MissionContent: string;
  MissionImage?: Media | null;

  // Vision
  VisionTitle: string;
  VisionContent: string;
  VisionImage?: Media | null;

  // Core Values
  CoreValuesTitle: string;
  CoreValues: CoreValue[];

  // SEO
  SEO?: AboutSEO | null;

  // Localization
  locale: string;

  // Timestamps
  createdAt: string;
  updatedAt: string;
  publishedAt: string;
}
