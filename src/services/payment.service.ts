import { paymentApi } from "@/services/api/payment.api";

import { getMediaUrl } from "@/lib/media";

import type { Locale } from "@/providers";
import type { PaymentMethod } from "@/types/payment";

/**
 * ============================================================
 * Payment Service
 * ============================================================
 *
 * Responsibilities:
 * - Fetch data from API
 * - Remove inactive payment methods
 * - Sort by DisplayOrder
 * - Normalize media URLs
 * - Return UI-ready data
 *
 * Components should never contain business logic.
 * ============================================================
 */

/**
 * Normalize logo URL.
 */
function normalizePayment(payment: PaymentMethod): PaymentMethod {
  return {
    ...payment,
    Logo: {
      ...payment.Logo,
      url: getMediaUrl(payment.Logo?.url),
    },
  };
}

/**
 * Get active payment methods.
 */
export async function getPaymentMethods(
  locale: Locale,
): Promise<PaymentMethod[]> {
  const payments = await paymentApi.getPaymentMethods(locale);

  return payments
    .filter((payment) => payment.Active)
    .sort((a, b) => a.DisplayOrder - b.DisplayOrder)
    .map(normalizePayment);
}

/**
 * Payment Service
 */
export const paymentService = {
  getPaymentMethods,
};

export default paymentService;