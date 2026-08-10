"use client";

import type { TeachingGuide } from "@/types/teaching-guide";

interface TeachingGuideHeroProps {
  guide: TeachingGuide;
}

export default function TeachingGuideHero({ guide }: TeachingGuideHeroProps) {
  return (
    <section className="relative overflow-hidden">
      {/* -------------------------------------------------------
       * Background
       * ----------------------------------------------------- */}

      <div
        className="
          absolute
          left-1/2
          top-0
          h-80
          w-160
          -translate-x-1/2
          rounded-full
          bg-(--primary)/10
          blur-3xl
        "
      />

      {/* -------------------------------------------------------
       * Content
       * ----------------------------------------------------- */}

      <div className="relative mx-auto max-w-7xl px-4 py-20 sm:px-6 md:py-24 lg:px-8 lg:py-28">
        <div className="max-w-4xl">
          <h1
            className="
              text-4xl
              font-bold
              leading-tight
              tracking-tight
              text-white
              md:text-5xl
              lg:text-6xl
            "
          >
            {guide.Title}
          </h1>
        </div>
      </div>
    </section>
  );
}
