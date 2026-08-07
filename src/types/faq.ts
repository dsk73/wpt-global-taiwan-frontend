// src/types/faq.ts

export type FAQCategory =
  | "my-account"
  | "wpt-global"
  | "kyc"
  | "deposits"
  | "withdrawals"
  | "account-security"
  | "promotions";

export interface FAQ {
  id: number;
  documentId: string;

  Question: string;
  Answer: string;

  Category: FAQCategory;

  DisplayOrder: number;
  Active: boolean;

  locale: string;

  localizations?: FAQ[];

  createdAt: string;
  updatedAt: string;
  publishedAt: string;
}

export type GroupedFAQs = Record<FAQCategory, FAQ[]>;
