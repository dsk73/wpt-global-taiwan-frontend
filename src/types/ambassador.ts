import type { Media } from "@/types/media";

/**
 * ============================================================
 * Brand Ambassador
 * ============================================================
 *
 * Raw Brand Ambassador model returned by Strapi.
 *
 * This file should ONLY contain types.
 * No helpers.
 * No business logic.
 * ============================================================
 */

export interface Ambassador {
  id: number;
  documentId: string;

  Name: string;
  Position: string;
  Description: string;

  DisplayOrder: number;
  Active: boolean;

  Photo: Media;

  locale: string;

  createdAt: string;
  updatedAt: string;
  publishedAt: string;

  localizations?: Ambassador[];
}

/**
 * Alias used throughout the application.
 */
export type BrandAmbassador = Ambassador;

export default Ambassador;