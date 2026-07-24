"use client";

import { ChevronLeft, ChevronRight } from "lucide-react";

import type { Locale } from "@/providers";
import { cn } from "@/lib/utils";
import type { BrandAmbassador } from "@/types/ambassador";

import useAmbassadors from "../hooks/useAmbassadors";
import AmbassadorCard from "./AmbassadorCard";

interface AmbassadorsProps {
  ambassadors: BrandAmbassador[];
  locale: Locale;
  className?: string;
}

export default function Ambassadors({
  ambassadors,
  locale,
  className,
}: AmbassadorsProps) {
  const {
    emblaRef,
    scrollPrev,
    scrollNext,
    scrollTo,
    selectedIndex,
    scrollSnaps,
  } = useAmbassadors();

  if (!ambassadors.length) {
    return null;
  }

  const title =
    locale === "zh-Hant-TW"
      ? "品牌大使"
      : locale === "ms-MY"
        ? "Duta Jenama"
        : "Brand Ambassadors";

  return (
    <section
      className={cn("relative overflow-hidden py-14 lg:py-20", className)}
    >
      <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
        {/* Header */}

        <div className="mb-10">
          <p className="mb-2 text-sm font-semibold uppercase tracking-[0.3em] text-cyan-400">
            WPT Global
          </p>

          <h2 className="text-3xl font-bold text-white md:text-4xl">{title}</h2>
        </div>

        {/* Carousel */}

        <div className="relative">
          {/* Left Navigation */}

          {scrollSnaps.length > 1 && (
            <button
              onClick={scrollPrev}
              className="
                absolute
                left-0
                top-1/2
                z-20
                hidden
                -translate-x-6
                -translate-y-1/2
                rounded-full
                border
                border-white/10
                bg-black/70
                p-3
                text-white
                backdrop-blur-md
                transition-all
                duration-300
                hover:border-cyan-400
                hover:bg-cyan-500/20
                lg:flex
              "
            >
              <ChevronLeft size={22} />
            </button>
          )}

          {/* Right Navigation */}

          {scrollSnaps.length > 1 && (
            <button
              onClick={scrollNext}
              className="
                absolute
                right-0
                top-1/2
                z-20
                hidden
                translate-x-6
                -translate-y-1/2
                rounded-full
                border
                border-white/10
                bg-black/70
                p-3
                text-white
                backdrop-blur-md
                transition-all
                duration-300
                hover:border-cyan-400
                hover:bg-cyan-500/20
                lg:flex
              "
            >
              <ChevronRight size={22} />
            </button>
          )}

          {/* Embla */}

          <div ref={emblaRef} className="overflow-hidden">
            <div className="-ml-4 flex">
              {ambassadors.map((ambassador) => (
                <div
                  key={ambassador.documentId}
                  className="
                    min-w-0
                    flex-[0_0_50%]
                    pl-4
                    md:flex-[0_0_33.3333%]
                    xl:flex-[0_0_25%]
                  "
                >
                  <AmbassadorCard ambassador={ambassador} />
                </div>
              ))}
            </div>
          </div>
        </div>

        {/* Indicators */}

        {scrollSnaps.length > 1 && (
          <div className="mt-8 flex justify-center gap-3">
            {scrollSnaps.map((_, index) => (
              <button
                key={index}
                onClick={() => scrollTo(index)}
                className={cn(
                  "h-2 rounded-full transition-all duration-300",
                  selectedIndex === index
                    ? "w-8 bg-cyan-400"
                    : "w-2 bg-white/30 hover:bg-white/50",
                )}
              />
            ))}
          </div>
        )}
      </div>
    </section>
  );
}
