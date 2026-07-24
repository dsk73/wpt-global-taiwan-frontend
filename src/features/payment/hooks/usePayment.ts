"use client";

import { useCallback, useEffect, useMemo, useState } from "react";
import useEmblaCarousel from "embla-carousel-react";
import Autoplay from "embla-carousel-autoplay";

import type { PaymentMethod } from "@/types/payment";

import {
  formatCurrencies,
  formatDepositRange,
  formatProcessingTime,
} from "../utils/payment.helpers";

/**
 * ============================================================
 * Payment Hook
 * ============================================================
 *
 * Handles:
 * - Payment data
 * - Embla initialization
 * - Autoplay
 * - Looping
 * - Navigation
 * - Indicators
 * - Formatting helpers
 *
 * ============================================================
 */

export function usePayment(payments: PaymentMethod[]) {
  const items = useMemo(() => payments, [payments]);

  const autoplay = Autoplay({
    delay: 5000,
    stopOnInteraction: false,
    stopOnMouseEnter: true,
  });

  const [emblaRef, emblaApi] = useEmblaCarousel(
    {
      loop: true,
      align: "start",
      skipSnaps: false,
      dragFree: false,
    },
    [autoplay],
  );

  const [selectedIndex, setSelectedIndex] = useState(0);
  const [scrollSnaps, setScrollSnaps] = useState<number[]>([]);

  const scrollPrev = useCallback(() => {
    emblaApi?.scrollPrev();
  }, [emblaApi]);

  const scrollNext = useCallback(() => {
    emblaApi?.scrollNext();
  }, [emblaApi]);

  const scrollTo = useCallback(
    (index: number) => {
      emblaApi?.scrollTo(index);
    },
    [emblaApi],
  );

  useEffect(() => {
    if (!emblaApi) return;

    const updateCarousel = () => {
      setSelectedIndex(emblaApi.selectedScrollSnap());
      setScrollSnaps(emblaApi.scrollSnapList());
    };

    updateCarousel();

    emblaApi.on("select", updateCarousel);
    emblaApi.on("reInit", updateCarousel);

    return () => {
      emblaApi.off("select", updateCarousel);
      emblaApi.off("reInit", updateCarousel);
    };
  }, [emblaApi]);

  return {
    payments: items,

    emblaRef,
    emblaApi,

    selectedIndex,
    scrollSnaps,

    scrollPrev,
    scrollNext,
    scrollTo,

    formatCurrencies,
    formatDepositRange,
    formatProcessingTime,
  };
}

export default usePayment;