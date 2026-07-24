"use client";

import { ChevronLeft, ChevronRight } from "lucide-react";

import { Button } from "@/components/ui";

interface HeroNavigationProps {
  onPrevious: () => void;
  onNext: () => void;
  className?: string;
}

export default function HeroNavigation({
  onPrevious,
  onNext,
  className,
}: HeroNavigationProps) {
  return (
    <div
      className={[
        "absolute inset-y-0 left-0 right-0 z-20",
        "pointer-events-none",
        "flex items-center justify-between px-4 md:px-8",
        className,
      ]
        .filter(Boolean)
        .join(" ")}
    >
      <Button
        variant="secondary"
        size="icon"
        onClick={onPrevious}
        aria-label="Previous Slide"
        className="pointer-events-auto rounded-full backdrop-blur-md"
      >
        <ChevronLeft className="h-5 w-5" />
      </Button>

      <Button
        variant="secondary"
        size="icon"
        onClick={onNext}
        aria-label="Next Slide"
        className="pointer-events-auto rounded-full backdrop-blur-md"
      >
        <ChevronRight className="h-5 w-5" />
      </Button>
    </div>
  );
}
