// src/types/community-page.ts

import type { Media } from "./media";

export interface CommunitySocialLink {
  id: number;
  Platform: string;
  Label: string;
  Icon: Media | null;
  URL: string;
  DisplayOrder: number;
  Active: boolean;
}

export interface CommunityPage {
  id: number;
  documentId: string;

  HeroTitle: string;
  HeroDescription: string;

  // LINE
  LINEID: string;
  LINEButtonText: string;
  LINEButtonURL: string;
  LINEImage: Media | null;

  BottomDescription: string;

  SocialLink: CommunitySocialLink[];

  locale: string;

  createdAt: string;
  updatedAt: string;
  publishedAt: string;
}
