import type { Activity } from "./activity";

/**
 * ============================================================
 * Shared Category
 * ============================================================
 *
 * Used across:
 * - Activities
 * - Teaching Center
 * - Poker Exchange
 * - FAQ
 * ============================================================
 */

export interface Category {
  id: number;

  documentId: string;

  Name: string;

  Slug: string;

  Color: string;

  DisplayOrder: number;

  activities?: Activity[];

  faqs?: unknown[];

  locale: string;

  localizations?: Category[];

  createdAt: string;

  updatedAt: string;

  publishedAt: string;
}

export interface CategoriesPagination {
  page: number;

  pageSize: number;

  pageCount: number;

  total: number;
}

export interface CategoriesResponse {
  data: Category[];

  meta: {
    pagination: CategoriesPagination;
  };
}

export interface CategoryResponse {
  data: Category;
}