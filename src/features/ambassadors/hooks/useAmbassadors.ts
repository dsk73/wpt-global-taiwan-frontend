"use client";

import { useCallback, useEffect, useState } from "react";
import useEmblaCarousel from "embla-carousel-react";
import Autoplay from "embla-carousel-autoplay";

/**
 * ============================================================
 * Brand Ambassadors Carousel Hook
 * ============================================================
 *
 * Handles:
 * - Embla initialization
 * - Current slide
 * - Navigation
 * - Autoplay
 * - Looping
 * - Slide indicators
 *
 * No UI logic should live here.
 * ============================================================
 */

export function useAmbassadors() {
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
    emblaRef,
    emblaApi,

    selectedIndex,
    scrollSnaps,

    scrollPrev,
    scrollNext,
    scrollTo,
  };
}

export default useAmbassadors;