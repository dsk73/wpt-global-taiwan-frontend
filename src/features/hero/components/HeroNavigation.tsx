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
        "absolute top-0 left-0 right-0 z-20",
        "h-[100vw]",
        "pointer-events-none",

        // ====================================================
        // MOBILE
        // ====================================================
        // Keep arrows near the upper/start portion of the
        // square Hero image instead of vertically centering
        // them over the Hero text.
        "flex items-start justify-between px-3 pt-20",

        // ====================================================
        // TABLET / DESKTOP
        // ====================================================
        // Restore the original positioning and appearance.
        "md:inset-y-0 md:h-auto md:items-center md:px-8 md:pt-0",

        className,
      ]
        .filter(Boolean)
        .join(" ")}
    >
      {/* Previous Slide */}

      <Button
        variant="secondary"
        size="icon"
        onClick={onPrevious}
        aria-label="Previous Slide"
        className={[
          "pointer-events-auto rounded-full backdrop-blur-md",

          // Mobile: subtle/faded appearance
          "bg-white/10 text-white/75 opacity-60",
          "border border-white/10",
          "hover:bg-white/15 hover:opacity-80",

          // Desktop: preserve existing appearance
          "md:opacity-100",
          "md:bg-secondary",
          "md:text-secondary-foreground",
          "md:border-transparent",
        ].join(" ")}
      >
        <ChevronLeft className="h-5 w-5" />
      </Button>

      {/* Next Slide */}

      <Button
        variant="secondary"
        size="icon"
        onClick={onNext}
        aria-label="Next Slide"
        className={[
          "pointer-events-auto rounded-full backdrop-blur-md",

          // Mobile: subtle/faded appearance
          "bg-white/10 text-white/75 opacity-60",
          "border border-white/10",
          "hover:bg-white/15 hover:opacity-80",

          // Desktop: preserve existing appearance
          "md:opacity-100",
          "md:bg-secondary",
          "md:text-secondary-foreground",
          "md:border-transparent",
        ].join(" ")}
      >
        <ChevronRight className="h-5 w-5" />
      </Button>
    </div>
  );
}
