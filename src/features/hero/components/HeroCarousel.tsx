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
      {/* ======================================================
          HERO CAROUSEL
      ====================================================== */}

      <div ref={emblaRef} className="overflow-hidden">
        <div className="flex">
          {slides.map((slide) => (
            <div key={slide.documentId} className="min-w-0 flex-[0_0_100%]">
              <HeroSlide slide={slide} promotionCard={promotionCard} />
            </div>
          ))}
        </div>
      </div>

      {/* ======================================================
          CAROUSEL NAVIGATION
      ====================================================== */}

      {slides.length > 1 && (
        <>
          <HeroNavigation onPrevious={scrollPrev} onNext={scrollNext} />

          {/* ==================================================
              MOBILE HERO INDICATORS

              On mobile, HeroSlide contains both:
              - Square Hero
              - Promotion Card

              Therefore the indicators must remain in normal
              document flow so they appear AFTER the promotion
              card instead of overlapping it.

              Hidden on md+ because desktop keeps the original
              absolute positioning below.
          ================================================== */}

          <div className="relative z-30 flex justify-center py-4 md:hidden">
            <HeroIndicators
              total={scrollSnaps.length}
              currentIndex={selectedIndex}
              onSelect={scrollTo}
            />
          </div>

          {/* ==================================================
              DESKTOP / TABLET HERO INDICATORS

              Keep the original desktop positioning unchanged.
          ================================================== */}

          <div className="absolute bottom-7 left-1/2 z-30 hidden -translate-x-1/2 md:block">
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
