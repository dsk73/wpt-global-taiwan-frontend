"use client";

import Link from "next/link";

import { Button } from "@/components/ui";
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
  if (!hasPrimaryButton(slide) && !hasSecondaryButton(slide)) {
    return null;
  }

  return (
    <div
      className={["flex flex-row gap-3", "w-full", "*:flex-1", className]
        .filter(Boolean)
        .join(" ")}
    >
      {hasPrimaryButton(slide) && (
        <Button asChild variant="primary" size="lg" className="w-full">
          <Link
            href={slide.PrimaryButtonURL!}
            target={getLinkTarget(slide.PrimaryButtonURL!)}
            rel={getLinkRel(slide.PrimaryButtonURL!)}
          >
            {slide.PrimaryButtonText}
          </Link>
        </Button>
      )}

      {hasSecondaryButton(slide) && (
        <Button asChild variant="secondary" size="lg" className="w-full">
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
