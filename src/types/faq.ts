import type { Category } from "./category";

export interface FAQ {
  id: number;
  documentId: string;

  Question: string;
  Answer: string;

  DisplayOrder: number;
  Active: boolean;

  locale: string;

  category?: Category | null;

  localizations?: FAQ[];

  createdAt: string;
  updatedAt: string;
  publishedAt: string;
}