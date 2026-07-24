"use client";

import { cn } from "@/lib/utils";
import type { HeroSlide as HeroSlideType } from "@/types/hero";

import HeroCarousel from "./HeroCarousel";

interface HeroProps {
  slides: HeroSlideType[];
  className?: string;
}

export default function Hero({ slides, className }: HeroProps) {
  if (!slides.length) {
    return null;
  }

  return (
    <section className={cn("relative", className)}>
      <HeroCarousel slides={slides} />
    </section>
  );
}
