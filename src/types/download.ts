import type { Media } from "./media";

export interface DownloadSEO {
  MetaTitle?: string;
  MetaDescription?: string;
  CanonicalURL?: string;

  OGImage?: Media | null;

  Robots?: string;
  Keywords?: string;
}

export interface DownloadPage {
  id: number;
  documentId: string;

  Title: string;

  BannerImage?: Media | null;

  WindowsURL?: string;
  MacURL?: string;
  AndroidURL?: string;
  IOSURL?: string;
  APKURL?: string;

  Description: string;

  SEO?: DownloadSEO | null;

  locale: string;

  createdAt: string;
  updatedAt: string;
  publishedAt: string;
}
