import type { Media } from "@/types/media";

/**
 * ============================================================
 * Payment Method
 * ============================================================
 *
 * Raw Payment Method model returned by Strapi.
 *
 * This file contains ONLY types.
 * No helpers.
 * No business logic.
 * ============================================================
 */

export interface PaymentMethod {
  id: number;
  documentId: string;

  Name: string;
  Description: string;

  ProcessingTime: string;

  SupportedCurrencies: string[];

  MinimumDeposit: number;
  MaximumDeposit: number;

  DisplayOrder: number;

  Active: boolean;

  Logo: Media;

  locale: string;

  createdAt: string;
  updatedAt: string;
  publishedAt: string;

  localizations?: PaymentMethod[];
}

/**
 * Alias used throughout the application.
 */
export type Payment = PaymentMethod;

export default PaymentMethod;