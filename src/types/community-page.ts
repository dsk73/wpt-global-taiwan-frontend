// src/types/community-page.ts

import type { Media } from "./media";

export type CommunityPlatform =
  | "LINE"
  | "Instagram"
  | "Facebook"
  | "Telegram"
  | "Discord"
  | "YouTube"
  | "TikTok"
  | "Threads"
  | "X";

export interface CommunitySocialLink {
  id: number;
  Platform: CommunityPlatform;
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

  BottomDescription: string;

  SocialLink: CommunitySocialLink[];

  locale: string;

  createdAt: string;
  updatedAt: string;
  publishedAt: string;
}
