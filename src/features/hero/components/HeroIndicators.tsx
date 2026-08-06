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
    <div className={cn("flex items-center justify-center gap-3", className)}>
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
                ? "h-2.5 w-10 rounded-full bg-(--primary)"
                : "h-2.5 w-2.5 rounded-full bg-white/40 hover:bg-white/70",
            )}
          />
        );
      })}
    </div>
  );
}
