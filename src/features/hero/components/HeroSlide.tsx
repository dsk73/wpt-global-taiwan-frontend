// src/features/hero/components/HeroSlide.tsx

"use client";

import Image from "next/image";

import { getMediaUrl } from "@/lib/media";
import { cn } from "@/lib/utils";

import HeroButtons from "./HeroButtons";
import HeroPromotionCard from "./HeroPromotionCard";

import {
  getHeroDescription,
  getHeroImageAlt,
  getHeroTitle,
} from "../utils/hero.helpers";

import type {
  HeroPromotionCard as HeroPromotionCardType,
  HeroSlide as HeroSlideType,
} from "@/types/hero";

interface HeroSlideProps {
  slide: HeroSlideType;
  promotionCard: HeroPromotionCardType | null;
  className?: string;
}

export default function HeroSlide({
  slide,
  promotionCard,
  className,
}: HeroSlideProps) {
  return (
    <section
      className={cn(
        "relative w-full overflow-hidden",
        "h-auto",
        "md:h-140",
        "lg:h-147.5",
        "xl:h-155",
        className,
      )}
    >
      {/* ======================================================
          MOBILE
          ====================================================== */}

      <div className="block md:hidden">
        {/* ====================================================
            MOBILE HERO IMAGE + CONTENT
            ==================================================== */}

        <div className="relative aspect-square w-full overflow-hidden">
          {/* Mobile Image */}

          {slide.MobileImage ? (
            <Image
              src={getMediaUrl(slide.MobileImage.url)}
              alt={getHeroImageAlt(slide)}
              fill
              priority
              sizes="100vw"
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

          {/* Dark Overlay */}

          <div className="absolute inset-0 bg-black/45" />

          {/* Bottom Gradient */}

          <div className="absolute inset-0 bg-linear-to-t from-black via-black/45 to-transparent" />

          {/* ==================================================
              MOBILE CONTENT OVER IMAGE
              ================================================== */}

          <div className="absolute inset-x-5 bottom-7 z-10">
            {/* Subtitle */}

            {slide.Subtitle && (
              <p className="mb-3 text-sm font-semibold uppercase tracking-[0.12em] text-(--primary)">
                {slide.Subtitle}
              </p>
            )}

            {/* Title */}

            <h1 className="text-4xl font-extrabold leading-[1.08] text-white">
              {getHeroTitle(slide)}
            </h1>

            {/* Description */}

            {slide.Description && (
              <p className="mt-3 text-base leading-6 text-white/80">
                {getHeroDescription(slide)}
              </p>
            )}

            {/* Primary CTA */}

            <HeroButtons slide={slide} className="mt-5" />
          </div>
        </div>

        {/* ====================================================
            MOBILE PROMOTION CARD
            ==================================================== */}

        <div className="bg-background px-5 py-6">
          <HeroPromotionCard promotion={promotionCard} />
        </div>
      </div>

      {/* ======================================================
          DESKTOP
          ====================================================== */}

      <div className="relative hidden h-full md:block">
        {slide.DesktopImage && (
          <Image
            src={getMediaUrl(slide.DesktopImage.url)}
            alt={getHeroImageAlt(slide)}
            fill
            priority
            sizes="(max-width:768px) 100vw, (max-width:1280px) 100vw, 1440px"
            className="object-cover"
          />
        )}

        {/* ======================================================
            DARK OVERLAY
        ====================================================== */}

        <div className="absolute inset-0 bg-black/45" />

        {/* ======================================================
            LEFT GRADIENT
        ====================================================== */}

        <div className="absolute inset-0 bg-linear-to-r from-black/90 via-black/60 to-black/10" />

        {/* ======================================================
            CONTENT
        ====================================================== */}

        <div className="relative z-10 mx-auto flex h-full max-w-375 items-center px-10 lg:px-14 xl:px-20">
          <div className="grid w-full items-center gap-8 lg:grid-cols-[1.35fr_480px] xl:grid-cols-[1.45fr_500px]">
            {/* ======================================
                LEFT CONTENT
            ====================================== */}

            <div className="max-w-162.5">
              {slide.Subtitle && (
                <p className="mb-5 text-sm font-semibold uppercase tracking-[0.18em] text-(--primary)">
                  {slide.Subtitle}
                </p>
              )}

              <h1 className="text-5xl font-extrabold leading-[1.08] text-white xl:text-6xl">
                {getHeroTitle(slide)}
              </h1>

              {slide.Description && (
                <p className="mt-5 max-w-160 text-lg leading-[1.55] text-white/80">
                  {getHeroDescription(slide)}
                </p>
              )}

              <HeroButtons slide={slide} className="mt-8" />
            </div>

            {/* ======================================
                PROMOTION CARD
            ====================================== */}

            <div className="hidden justify-self-end lg:block lg:translate-x-8 xl:translate-x-12">
              <HeroPromotionCard promotion={promotionCard} />
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
