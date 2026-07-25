import type { Media } from "./media";

export interface AboutPage {
  id: number;
  documentId: string;

  Title: string;
  BannerImage?: Media | null;

  Content: string;
  Mission: string;
  Vision: string;
  CoreValues: string;

  SEO?: {
    MetaTitle?: string;
    MetaDescription?: string;
    CanonicalURL?: string;
    OGImage?: Media | null;
    Robots?: string;
    Keywords?: string;
  } | null;

  locale: string;

  createdAt: string;
  updatedAt: string;
  publishedAt: string;
}