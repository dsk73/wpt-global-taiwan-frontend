"use client";

import { cn } from "@/lib/utils";

interface HeroIndicatorsProps {
  total: number;
  currentIndex: number;
  onSelect: (index: number) => void;
  className?: string;
}

export default function HeroIndicators({
  total,
  currentIndex,
  onSelect,
  className,
}: HeroIndicatorsProps) {
  if (total <= 1) {
    return null;
  }

  return (
    <div
      className={cn(
        "absolute bottom-8 left-1/2 z-20 flex -translate-x-1/2 items-center gap-3",
        className,
      )}
    >
      {Array.from({ length: total }).map((_, index) => {
        const isActive = index === currentIndex;

        return (
          <button
            key={index}
            type="button"
            onClick={() => onSelect(index)}
            aria-label={`Go to slide ${index + 1}`}
            aria-current={isActive ? "true" : undefined}
            className={cn(
              "cursor-pointer rounded-full transition-all duration-300",
              "focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-(--primary)",
              isActive
                ? "h-3 w-8 bg-(--primary)"
                : "h-3 w-3 bg-white/50 hover:bg-white/80",
            )}
          />
        );
      })}
    </div>
  );
}
