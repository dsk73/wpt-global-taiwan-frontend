// src/features/about/components/AboutHero.tsx

import Image from "next/image";

import { getMediaURL } from "@/config";

import type { AboutPage } from "@/types";

interface AboutHeroProps {
  about: AboutPage;
}

export function AboutHero({ about }: AboutHeroProps) {
  return (
    <section className="relative overflow-hidden">
      <div className="relative h-56 w-full sm:h-72 lg:h-107.5">
        {about.HeroBannerImage ? (
          <Image
            src={getMediaURL(about.HeroBannerImage.url)}
            alt={about.HeroBannerImage.alternativeText ?? about.HeroTitle}
            fill
            priority
            sizes="100vw"
            className="object-cover object-center"
          />
        ) : (
          <div className="h-full w-full bg-neutral-900" />
        )}

        {/* Overlay */}
        <div className="absolute inset-0 bg-black/65" />

        {/* Bottom Fade */}
        <div className="absolute inset-x-0 bottom-0 h-40 bg-linear-to-t from-[#07090F] via-[#07090F]/60 to-transparent" />

        {/* Content */}
        <div className="absolute inset-0 flex items-center justify-center px-6">
          <div className="mx-auto max-w-4xl text-center">
            <h1 className="text-4xl font-bold tracking-tight text-white drop-shadow-xl sm:text-5xl lg:text-6xl">
              {about.HeroTitle}
            </h1>

            {about.HeroSubtitle && (
              <p className="mx-auto mt-6 max-w-3xl text-lg leading-8 text-white/80 sm:text-xl">
                {about.HeroSubtitle}
              </p>
            )}
          </div>
        </div>
      </div>
    </section>
  );
}
