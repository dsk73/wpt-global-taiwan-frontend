import Image from "next/image";

import { getMediaUrl } from "@/lib/media";

import type { TeamExclusiveBenefitsPage } from "@/types/team-exclusive-benefits";

interface TeamExclusiveBenefitsCTAProps {
  page: TeamExclusiveBenefitsPage;
}

/* ---------------------------------------
 * Team Exclusive Benefits CTA
 * ------------------------------------- */

export function TeamExclusiveBenefitsCTA({
  page,
}: TeamExclusiveBenefitsCTAProps) {
  const registerUrl = page.RegisterButtonURL?.trim() || null;
  const lineUrl = page.LineButtonURL?.trim() || null;

  const hasRegisterButton =
    Boolean(page.RegisterButtonLabel?.trim()) && Boolean(registerUrl);

  const hasLineButton =
    Boolean(page.LineButtonLabel?.trim()) && Boolean(lineUrl);

  const ctaImage = page.CTAImage ? getMediaUrl(page.CTAImage.url) : null;

  /*
   * Do not render an empty CTA section.
   */
  if (!page.CTAHeading?.trim() && !hasRegisterButton && !hasLineButton) {
    return null;
  }

  return (
    <section
      aria-labelledby="team-exclusive-benefits-cta-title"
      className="relative w-full overflow-hidden bg-[#070B15] py-5 sm:py-6 lg:py-8"
    >
      <div className="relative mx-auto w-full max-w-[1600px] overflow-hidden border border-white/10 bg-[#081225]">
        {/* ---------------------------------------
         * Desktop CTA Background Image
         *
         * Image is intentionally hidden on
         * smaller screens so mobile/tablet
         * uses the solid background instead.
         * ------------------------------------- */}

        {ctaImage && (
          <div className="absolute inset-0 hidden lg:block">
            <Image
              src={ctaImage}
              alt={
                page.CTAImage?.alternativeText ||
                page.CTAHeading ||
                "Team Exclusive Benefits"
              }
              fill
              sizes="100vw"
              className="object-cover object-center"
            />

            {/* Very light overlay */}
            <div aria-hidden="true" className="absolute inset-0 bg-black/10" />

            {/* Subtle readability layer */}
            <div
              aria-hidden="true"
              className="absolute inset-0 bg-gradient-to-r from-[#020611]/15 via-transparent to-[#020611]/15"
            />
          </div>
        )}

        {/* ---------------------------------------
         * Mobile / Tablet Background
         * ------------------------------------- */}

        <div
          aria-hidden="true"
          className="absolute inset-0 bg-gradient-to-r from-[#081225] via-[#0D1930] to-[#081225] lg:hidden"
        />

        {/* ---------------------------------------
         * Subtle Desktop Bottom Fade
         * ------------------------------------- */}

        <div
          aria-hidden="true"
          className="pointer-events-none absolute inset-x-0 bottom-0 hidden h-12 bg-gradient-to-t from-[#050912]/30 to-transparent lg:block"
        />

        {/* ---------------------------------------
         * CTA Content
         * ------------------------------------- */}

        <div className="relative flex min-h-[220px] flex-col items-center justify-center px-4 py-8 text-center sm:min-h-[240px] sm:px-8 sm:py-9 lg:min-h-[260px] lg:px-12 lg:py-10">
          {/* CTA Heading */}

          {page.CTAHeading?.trim() && (
            <h2
              id="team-exclusive-benefits-cta-title"
              className="max-w-4xl text-2xl font-bold leading-tight tracking-tight text-white sm:text-3xl lg:text-4xl"
            >
              {page.CTAHeading}
            </h2>
          )}

          {/* ---------------------------------------
           * CTA Buttons
           * ------------------------------------- */}

          {(hasRegisterButton || hasLineButton) && (
            <div className="mt-5 flex w-full flex-row items-center justify-center gap-2 sm:mt-6 sm:w-auto sm:gap-5">
              {/* ---------------------------------------
               * Register Button
               * ------------------------------------- */}

              {hasRegisterButton && registerUrl && (
                <a
                  href={registerUrl}
                  className="inline-flex min-h-11 flex-1 items-center justify-center rounded-2xl bg-[#1769FF] px-4 py-2.5 text-xs font-bold text-white shadow-lg shadow-blue-900/30 transition-all duration-200 hover:bg-[#2D78FF] hover:shadow-xl hover:shadow-blue-900/40 focus:outline-none focus:ring-2 focus:ring-blue-400 focus:ring-offset-2 focus:ring-offset-[#081225] sm:min-h-12 sm:w-[260px] sm:flex-none sm:px-8 sm:py-3 sm:text-base"
                >
                  {page.RegisterButtonLabel}
                </a>
              )}

              {/* ---------------------------------------
               * Official LINE Button
               * ------------------------------------- */}

              {hasLineButton && lineUrl && (
                <a
                  href={lineUrl}
                  target={page.LineButtonOpenInNewTab ? "_blank" : undefined}
                  rel={
                    page.LineButtonOpenInNewTab
                      ? "noopener noreferrer"
                      : undefined
                  }
                  className="inline-flex min-h-11 flex-1 items-center justify-center gap-2 rounded-2xl border border-[#19D3E6] bg-black/20 px-3 py-2.5 text-xs font-bold text-white backdrop-blur-sm transition-all duration-200 hover:bg-[#19D3E6]/10 hover:shadow-lg hover:shadow-cyan-500/10 focus:outline-none focus:ring-2 focus:ring-[#19D3E6] focus:ring-offset-2 focus:ring-offset-[#081225] sm:min-h-12 sm:w-[280px] sm:flex-none sm:px-7 sm:py-3 sm:text-base"
                >
                  {/* LINE badge */}

                  <span
                    aria-hidden="true"
                    className="flex h-6 w-6 shrink-0 items-center justify-center rounded-full bg-white text-[7px] font-black tracking-tight text-[#111827] sm:h-7 sm:w-7 sm:text-[9px]"
                  >
                    LINE
                  </span>

                  <span className="whitespace-nowrap">
                    {page.LineButtonLabel}
                  </span>
                </a>
              )}
            </div>
          )}
        </div>
      </div>
    </section>
  );
}
