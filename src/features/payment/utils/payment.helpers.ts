import type { PaymentMethod } from "@/types/payment";

/**
 * ============================================================
 * Payment Helpers
 * ============================================================
 *
 * UI formatting helpers.
 * No API calls.
 * No business logic.
 * ============================================================
 */

/**
 * Format supported currencies.
 *
 * Example:
 * ["USDT", "USD", "TWD"]
 * ↓
 * "USDT • USD • TWD"
 */
export function formatCurrencies(
  currencies: string[] = [],
): string {
  return currencies.join(" • ");
}

/**
 * Format deposit range.
 *
 * Example:
 * 10, 5000
 * ↓
 * "$10 - $5,000"
 */
export function formatDepositRange(
  minimum: number,
  maximum: number,
): string {
  return `$${minimum.toLocaleString()} - $${maximum.toLocaleString()}`;
}

/**
 * Return processing time.
 */
export function formatProcessingTime(
  processingTime: string,
): string {
  return processingTime;
}

/**
 * Sort payment methods by display order.
 */
export function sortPayments(
  payments: PaymentMethod[],
): PaymentMethod[] {
  return [...payments].sort(
    (a, b) => a.DisplayOrder - b.DisplayOrder,
  );
}