import Image from "next/image";
import { Gift, Coins, Trophy, Users } from "lucide-react";

import { getMediaUrl } from "@/lib/media";

import type { TeamExclusiveBenefitsPage } from "@/types/team-exclusive-benefits";

interface TeamExclusiveBenefitsHeroProps {
  page: TeamExclusiveBenefitsPage;
}

/* ---------------------------------------
 * Team Exclusive Benefits Hero
 * ------------------------------------- */

export function TeamExclusiveBenefitsHero({
  page,
}: TeamExclusiveBenefitsHeroProps) {
  const heroImage = page.HeroImage ? getMediaUrl(page.HeroImage.url) : null;

  const heroBenefits = [
    {
      label: page.HeroBenefit1,
      icon: Gift,
    },
    {
      label: page.HeroBenefit2,
      icon: Coins,
    },
    {
      label: page.HeroBenefit3,
      icon: Trophy,
    },
    {
      label: page.HeroBenefit4,
      icon: Users,
    },
  ].filter((item) => Boolean(item.label));

  return (
    <section
      aria-labelledby="team-exclusive-benefits-title"
      className="relative w-full overflow-hidden bg-[#050912]"
    >
      {/* ---------------------------------------
       * Desktop Hero Background Image
       *
       * Image is shown only on large screens.
       * Mobile / tablet use the dark background
       * below instead.
       * ------------------------------------- */}

      {heroImage && (
        <div className="absolute inset-0 hidden lg:block">
          <Image
            src={heroImage}
            alt={
              page.HeroImage?.alternativeText ||
              page.Title ||
              "Team Exclusive Benefits"
            }
            fill
            priority
            sizes="100vw"
            className="object-cover object-center"
          />

          {/* Desktop readability overlay */}
          <div
            aria-hidden="true"
            className="absolute inset-0 bg-gradient-to-r from-[#050912]/65 via-[#050912]/30 to-[#050912]/10"
          />

          {/* Desktop bottom fade */}
          <div
            aria-hidden="true"
            className="absolute inset-x-0 bottom-0 h-2/3 bg-gradient-to-t from-[#070B15]/85 via-[#070B15]/20 to-transparent"
          />
        </div>
      )}

      {/* ---------------------------------------
       * Mobile / Tablet Background
       *
       * Kept close to the dark navy/black
       * portion of the desktop artwork.
       * ------------------------------------- */}

      <div
        aria-hidden="true"
        className="absolute inset-0 bg-gradient-to-br from-[#03070E] via-[#060D18] to-[#0A101B] lg:hidden"
      />

      {/* Very subtle center glow */}
      <div
        aria-hidden="true"
        className="pointer-events-none absolute left-1/2 top-1/2 h-[280px] w-[600px] -translate-x-1/2 -translate-y-1/2 rounded-full bg-[#18243A]/20 blur-[120px] lg:hidden"
      />

      {/* Mobile / tablet bottom fade */}
      <div
        aria-hidden="true"
        className="absolute inset-x-0 bottom-0 h-1/2 bg-gradient-to-t from-[#050912] via-[#050912]/30 to-transparent lg:hidden"
      />

      {/* ---------------------------------------
       * Hero Content
       * ------------------------------------- */}

      <div className="relative mx-auto flex min-h-[430px] w-full max-w-[1600px] flex-col justify-center px-5 pb-28 pt-14 sm:min-h-[460px] sm:px-8 sm:pb-28 sm:pt-16 md:px-10 lg:min-h-[490px] lg:px-16 lg:pb-30 lg:pt-20 xl:px-20">
        {/* ---------------------------------------
         * Small Label
         * ------------------------------------- */}

        <div className="mb-3 inline-flex w-fit items-center gap-2 rounded-full border border-[#D4AF37]/35 bg-black/30 px-3 py-1.5 backdrop-blur-sm sm:px-4 sm:py-2">
          <span
            aria-hidden="true"
            className="h-1.5 w-1.5 shrink-0 rounded-full bg-[#D4AF37]"
          />

          <span className="text-[11px] font-semibold tracking-[0.1em] text-[#D4AF37] sm:text-xs md:text-sm">
            {page.Title}
          </span>
        </div>

        {/* ---------------------------------------
         * H1
         * ------------------------------------- */}

        <h1
          id="team-exclusive-benefits-title"
          className="max-w-3xl text-[2rem] font-black leading-[1.08] tracking-tight text-white sm:text-[2.5rem] md:text-5xl lg:text-6xl"
        >
          {page.Title}
        </h1>

        {/* ---------------------------------------
         * Subtitle
         * ------------------------------------- */}

        {page.Subtitle && (
          <p className="mt-2 max-w-2xl text-sm font-medium leading-6 text-white/75 sm:text-base sm:leading-7 md:text-lg lg:text-xl">
            {page.Subtitle}
          </p>
        )}

        {/* ---------------------------------------
         * Hero Benefit Highlights
         * ------------------------------------- */}

        {heroBenefits.length > 0 && (
          <div className="absolute bottom-5 left-5 right-5 grid grid-cols-2 gap-2 sm:bottom-7 sm:left-8 sm:right-8 sm:grid-cols-4 sm:gap-2.5 md:left-10 md:right-10 lg:bottom-8 lg:left-16 lg:right-auto lg:flex lg:gap-2.5 xl:left-20">
            {heroBenefits.map(({ label, icon: Icon }, index) => (
              <div
                key={`${label}-${index}`}
                className="flex min-h-[54px] w-full items-center gap-2 rounded-xl border border-white/10 bg-[#070B15]/80 px-2.5 py-2 backdrop-blur-md transition-colors duration-200 hover:border-[#D4AF37]/30 sm:min-h-[58px] sm:gap-2.5 sm:px-3 md:w-auto md:min-w-[145px] lg:w-[145px] lg:px-3.5 xl:w-[150px]"
              >
                {/* Icon */}
                <span
                  aria-hidden="true"
                  className="flex h-7 w-7 shrink-0 items-center justify-center rounded-lg bg-[#D4AF37]/10 text-[#D4AF37] sm:h-8 sm:w-8"
                >
                  <Icon
                    size={15}
                    strokeWidth={2}
                    className="sm:h-[17px] sm:w-[17px]"
                  />
                </span>

                {/* Text */}
                <span className="min-w-0 text-[11px] font-semibold leading-4 text-white sm:text-xs md:text-sm">
                  {label}
                </span>
              </div>
            ))}
          </div>
        )}
      </div>

      {/* ---------------------------------------
       * Bottom Divider
       * ------------------------------------- */}

      <div
        aria-hidden="true"
        className="relative h-px w-full bg-gradient-to-r from-transparent via-[#D4AF37]/25 to-transparent"
      />
    </section>
  );
}
