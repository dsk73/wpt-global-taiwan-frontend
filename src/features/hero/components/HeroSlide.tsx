"use client";

import Image from "next/image";

import { getMediaUrl } from "@/lib/media";
import { cn } from "@/lib/utils";
import type { HeroSlide as HeroSlideType } from "@/types/hero";

import HeroButtons from "./HeroButtons";
import {
  getHeroDescription,
  getHeroImageAlt,
  getHeroTitle,
} from "../utils/hero.helpers";

interface HeroSlideProps {
  slide: HeroSlideType;
  className?: string;
}

export default function HeroSlide({ slide, className }: HeroSlideProps) {
  return (
    <section
      className={cn(
        "relative w-full overflow-hidden",
        "h-auto",
        "md:h-125",
        "lg:h-140",
        "xl:h-155",
        className,
      )}
    >
      {/* ======================================================
          MOBILE LAYOUT
      ====================================================== */}

      <div className="block md:hidden">
        <div className="relative h-70 w-full">
          {slide.MobileImage ? (
            <Image
              src={getMediaUrl(slide.MobileImage.url)}
              alt={getHeroImageAlt(slide)}
              fill
              priority
              sizes="(max-width: 768px) 100vw, 0px"
              className="object-cover"
            />
          ) : (
            slide.DesktopImage && (
              <Image
                src={getMediaUrl(slide.DesktopImage.url)}
                alt={getHeroImageAlt(slide)}
                fill
                priority
                sizes="100vw"
                className="object-cover"
              />
            )
          )}

          <div className="absolute inset-0 bg-black/20" />
        </div>

        <div className="bg-background px-5 py-8">
          {slide.Subtitle && (
            <p className="mb-3 text-xs font-semibold uppercase tracking-[0.25em] text-(--primary)">
              {slide.Subtitle}
            </p>
          )}

          <h1 className="text-3xl font-extrabold leading-tight text-white">
            {getHeroTitle(slide)}
          </h1>

          {slide.Description && (
            <p className="mt-4 text-sm leading-7 text-white/80">
              {getHeroDescription(slide)}
            </p>
          )}

          <HeroButtons slide={slide} className="mt-6" />
        </div>
      </div>

      {/* ======================================================
          TABLET & DESKTOP
      ====================================================== */}

      <div className="relative hidden h-full md:block">
        {slide.DesktopImage && (
          <Image
            src={getMediaUrl(slide.DesktopImage.url)}
            alt={getHeroImageAlt(slide)}
            fill
            priority
            sizes="(max-width: 768px) 100vw, (max-width: 1280px) 100vw, 1920px"
            className="object-cover"
          />
        )}

        {/* Overlay */}
        <div className="absolute inset-0 bg-black/15" />

        {/* Gradient */}
        <div className="absolute inset-0 bg-linear-to-r from-black/70 via-black/30 to-transparent" />

        {/* Content */}
        <div className="relative z-10 mx-auto flex h-full max-w-7xl items-center px-6 lg:px-8 xl:px-10">
          <div className="max-w-md lg:max-w-xl xl:max-w-2xl">
            {slide.Subtitle && (
              <p className="mb-3 text-xs font-semibold uppercase tracking-[0.3em] text-(--primary) lg:mb-4 lg:text-sm">
                {slide.Subtitle}
              </p>
            )}

            <h1 className="text-4xl font-extrabold leading-tight text-white md:text-4xl lg:text-5xl xl:text-6xl">
              {getHeroTitle(slide)}
            </h1>

            {slide.Description && (
              <p className="mt-5 max-w-lg text-sm leading-7 text-white/85 md:text-base lg:mt-6 lg:text-lg lg:leading-8">
                {getHeroDescription(slide)}
              </p>
            )}

            <HeroButtons slide={slide} className="mt-7 lg:mt-8" />
          </div>
        </div>
      </div>
    </section>
  );
}
