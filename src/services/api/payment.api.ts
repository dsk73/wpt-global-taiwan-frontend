import { buildQuery } from "@/lib/query-builder";
import { DEFAULT_SORT, ENDPOINTS } from "@/lib/endpoints";
import fetcher from "@/lib/fetcher";

import type { Locale } from "@/providers";
import type { PaymentMethod } from "@/types/payment";

/**
 * ============================================================
 * Payment Methods API
 * ============================================================
 *
 * Responsibilities:
 * - Build Strapi query
 * - Fetch Payment Methods
 * - Return raw Strapi response
 *
 * This layer should NEVER:
 * - Filter data
 * - Sort manually
 * - Normalize media URLs
 * - Transform DTOs
 *
 * Those belong to payment.service.ts
 * ============================================================
 */

/**
 * Fetch all payment methods for a locale.
 */
export async function getPaymentMethods(
  locale: Locale,
): Promise<PaymentMethod[]> {
  const query = buildQuery({
    locale,
    populate: "*",
    sort: DEFAULT_SORT,
  });

  return fetcher.getCollection<PaymentMethod>(
    `${ENDPOINTS.PAYMENT_METHODS}?${query}`,
  );
}

/**
 * Payment API
 */
export const paymentApi = {
  getPaymentMethods,
};

export default paymentApi;