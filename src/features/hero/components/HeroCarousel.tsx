"use client";

import { cn } from "@/lib/utils";

import type {
  HeroPromotionCard as HeroPromotionCardType,
  HeroSlide as HeroSlideType,
} from "@/types/hero";

import useHeroCarousel from "../hooks/useHeroCarousel";

import HeroIndicators from "./HeroIndicators";
import HeroNavigation from "./HeroNavigation";
import HeroSlide from "./HeroSlide";

interface HeroCarouselProps {
  slides: HeroSlideType[];
  promotionCard: HeroPromotionCardType | null;
  className?: string;
}

export default function HeroCarousel({
  slides,
  promotionCard,
  className,
}: HeroCarouselProps) {
  const {
    emblaRef,
    scrollPrev,
    scrollNext,
    scrollTo,
    selectedIndex,
    scrollSnaps,
  } = useHeroCarousel();

  if (!slides.length) {
    return null;
  }

  return (
    <section className={cn("relative overflow-hidden", className)}>
      <div ref={emblaRef} className="overflow-hidden">
        <div className="flex">
          {slides.map((slide) => (
            <div key={slide.documentId} className="min-w-0 flex-[0_0_100%]">
              <HeroSlide slide={slide} promotionCard={promotionCard} />
            </div>
          ))}
        </div>
      </div>

      {/* Navigation Arrows */}

      {slides.length > 1 && (
        <>
          <HeroNavigation onPrevious={scrollPrev} onNext={scrollNext} />

          {/* Hero Indicators */}

          <div className="absolute bottom-7 left-1/2 z-30 -translate-x-1/2">
            <HeroIndicators
              total={scrollSnaps.length}
              currentIndex={selectedIndex}
              onSelect={scrollTo}
            />
          </div>
        </>
      )}
    </section>
  );
}
