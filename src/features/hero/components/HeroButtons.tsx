"use client";

import Link from "next/link";

import { Button } from "@/components/ui";
import { cn } from "@/lib/utils";
import type { HeroSlide } from "@/types/hero";

import {
  getLinkRel,
  getLinkTarget,
  hasPrimaryButton,
} from "../utils/hero.helpers";

interface HeroButtonsProps {
  slide: HeroSlide;
  className?: string;
}

export default function HeroButtons({ slide, className }: HeroButtonsProps) {
  const showPrimary = hasPrimaryButton(slide);

  if (!showPrimary) {
    return null;
  }

  return (
    <div className={cn("flex", className)}>
      <Button asChild variant="primary" size="lg" className="min-w-45">
        <Link
          href={slide.PrimaryButtonURL!}
          target={getLinkTarget(slide.PrimaryButtonURL!)}
          rel={getLinkRel(slide.PrimaryButtonURL!)}
        >
          {slide.PrimaryButtonText}
        </Link>
      </Button>
    </div>
  );
}
