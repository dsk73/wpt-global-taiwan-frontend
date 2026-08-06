"use client";

import Link from "next/link";

import { Button } from "@/components/ui";
import { cn } from "@/lib/utils";
import type { HeroSlide } from "@/types/hero";

import {
  getLinkRel,
  getLinkTarget,
  hasPrimaryButton,
  hasSecondaryButton,
} from "../utils/hero.helpers";

interface HeroButtonsProps {
  slide: HeroSlide;
  className?: string;
}

export default function HeroButtons({ slide, className }: HeroButtonsProps) {
  const showPrimary = hasPrimaryButton(slide);
  const showSecondary = hasSecondaryButton(slide);

  if (!showPrimary && !showSecondary) {
    return null;
  }

  return (
    <div className={cn("flex flex-col gap-4 sm:flex-row", className)}>
      {showPrimary && (
        <Button asChild variant="primary" size="lg" className="min-w-45">
          <Link
            href={slide.PrimaryButtonURL!}
            target={getLinkTarget(slide.PrimaryButtonURL!)}
            rel={getLinkRel(slide.PrimaryButtonURL!)}
          >
            {slide.PrimaryButtonText}
          </Link>
        </Button>
      )}

      {showSecondary && (
        <Button asChild variant="secondary" size="lg" className="min-w-45">
          <Link
            href={slide.SecondaryButtonURL!}
            target={getLinkTarget(slide.SecondaryButtonURL!)}
            rel={getLinkRel(slide.SecondaryButtonURL!)}
          >
            {slide.SecondaryButtonText}
          </Link>
        </Button>
      )}
    </div>
  );
}
