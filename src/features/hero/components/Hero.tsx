"use client";

import { cn } from "@/lib/utils";

import type {
  HeroPromotionCard,
  HeroSlide as HeroSlideType,
} from "@/types/hero";

import HeroCarousel from "./HeroCarousel";

interface HeroProps {
  slides: HeroSlideType[];
  promotionCard: HeroPromotionCard | null;
  className?: string;
}

export default function Hero({ slides, promotionCard, className }: HeroProps) {
  if (!slides.length) {
    return null;
  }

  return (
    <section className={cn("relative", className)}>
      <HeroCarousel slides={slides} promotionCard={promotionCard} />
    </section>
  );
}
