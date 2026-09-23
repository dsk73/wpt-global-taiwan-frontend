import Image from "next/image";
import { marked } from "marked";

import { getMediaUrl } from "@/lib/media";

import type { TeamExclusiveBenefit } from "@/types/team-exclusive-benefits";

interface TeamExclusiveBenefitCardProps {
  benefit: TeamExclusiveBenefit;
}

/* ---------------------------------------
 * Markdown Renderer
 * ------------------------------------- */

function renderMarkdown(content: string): string {
  return marked.parse(content, {
    async: false,
  }) as string;
}

/* ---------------------------------------
 * Team Exclusive Benefit Card
 * ------------------------------------- */

export function TeamExclusiveBenefitCard({
  benefit,
}: TeamExclusiveBenefitCardProps) {
  const imageUrl = benefit.Image ? getMediaUrl(benefit.Image.url) : null;

  const stepNumber = String(benefit.StepNumber).padStart(2, "0");

  const contentHtml = benefit.Content?.trim()
    ? renderMarkdown(benefit.Content)
    : "";

  const redemptionContentHtml = benefit.RedemptionContent?.trim()
    ? renderMarkdown(benefit.RedemptionContent)
    : "";

  return (
    <article
      aria-labelledby={`team-exclusive-benefit-${benefit.StepNumber}`}
      className="relative overflow-hidden rounded-[2rem] border border-white/10 bg-[#0A101D] shadow-xl"
    >
      {/* ---------------------------------------
       * Decorative Step Number
       * ------------------------------------- */}

      <div
        aria-hidden="true"
        className="pointer-events-none absolute -right-5 -top-8 z-0 select-none text-[150px] font-black leading-none text-white/[0.025] sm:text-[190px] lg:text-[220px]"
      >
        {stepNumber}
      </div>

      {/* ---------------------------------------
       * Main Layout
       * ------------------------------------- */}

      <div className="relative z-10 grid lg:grid-cols-[0.9fr_1.35fr_0.8fr]">
        {/* ---------------------------------------
         * Benefit Image
         * ------------------------------------- */}

        {imageUrl ? (
          <div className="relative min-h-[240px] overflow-hidden sm:min-h-[280px] lg:min-h-[390px]">
            <Image
              src={imageUrl}
              alt={
                benefit.Image?.alternativeText ||
                benefit.Title ||
                `Step ${benefit.StepNumber}`
              }
              fill
              sizes="(max-width: 1023px) 100vw, 30vw"
              className="object-cover object-center"
            />

            {/* Image Overlay */}

            <div
              aria-hidden="true"
              className="pointer-events-none absolute inset-0 bg-gradient-to-t from-[#070B15]/70 via-transparent to-transparent lg:bg-gradient-to-r lg:from-transparent lg:via-transparent lg:to-[#0A101D]/20"
            />

            {/* Step Number */}

            <div className="absolute left-5 top-5 flex h-11 w-11 items-center justify-center rounded-full border border-[#D4AF37]/40 bg-[#070B15]/75 text-sm font-bold text-[#D4AF37] backdrop-blur-md sm:h-12 sm:w-12">
              {stepNumber}
            </div>
          </div>
        ) : (
          <div className="flex min-h-[180px] items-center justify-center bg-gradient-to-br from-[#111827] to-[#080C15] sm:min-h-[220px] lg:min-h-[390px]">
            <span
              aria-hidden="true"
              className="text-7xl font-black text-white/[0.05]"
            >
              {stepNumber}
            </span>
          </div>
        )}

        {/* ---------------------------------------
         * Main Benefit Content
         * ------------------------------------- */}

        <div className="flex flex-col justify-center border-t border-white/10 p-6 sm:p-8 lg:border-l lg:border-t-0 lg:p-10 xl:p-12">
          {/* Step Label */}

          <div className="mb-4 flex items-center gap-3">
            <span aria-hidden="true" className="h-px w-8 bg-[#D4AF37]" />

            <span className="text-xs font-bold uppercase tracking-[0.18em] text-[#D4AF37]">
              {stepNumber}
            </span>
          </div>

          {/* Title */}

          <h2
            id={`team-exclusive-benefit-${benefit.StepNumber}`}
            className="text-2xl font-bold leading-tight tracking-tight text-white sm:text-3xl lg:text-[2rem]"
          >
            {benefit.Title}
          </h2>

          {/* Subtitle */}

          {benefit.Subtitle?.trim() && (
            <p className="mt-3 text-base font-semibold leading-7 text-[#D4AF37] sm:text-lg">
              {benefit.Subtitle}
            </p>
          )}

          {/* Main Content */}

          {contentHtml && (
            <div
              className="
                mt-5
                text-sm
                leading-7
                text-white/70
                sm:text-base

                [&_a]:text-[#D4AF37]
                [&_a]:underline
                [&_a]:underline-offset-4

                [&_blockquote]:my-5
                [&_blockquote]:border-l-2
                [&_blockquote]:border-[#D4AF37]/50
                [&_blockquote]:pl-4

                [&_code]:rounded
                [&_code]:bg-white/10
                [&_code]:px-1.5
                [&_code]:py-0.5

                [&_em]:text-white/80

                [&_h1]:mb-4
                [&_h1]:text-2xl
                [&_h1]:font-bold
                [&_h1]:text-white

                [&_h2]:mb-4
                [&_h2]:text-xl
                [&_h2]:font-bold
                [&_h2]:text-white

                [&_h3]:mb-3
                [&_h3]:text-lg
                [&_h3]:font-bold
                [&_h3]:text-white

                [&_li]:ml-5
                [&_li]:list-disc

                [&_ol]:my-4
                [&_ol]:space-y-2
                [&_ol]:pl-5

                [&_p]:mb-4
                [&_p:last-child]:mb-0

                [&_strong]:font-semibold
                [&_strong]:text-white

                [&_ul]:my-4
                [&_ul]:space-y-2
                [&_ul]:pl-5
              "
              dangerouslySetInnerHTML={{
                __html: contentHtml,
              }}
            />
          )}
        </div>

        {/* ---------------------------------------
         * Redemption / Claim Section
         * ------------------------------------- */}

        {(benefit.RedemptionTitle?.trim() ||
          benefit.RedemptionContent?.trim()) && (
          <div className="relative flex flex-col justify-center border-t border-white/10 bg-[#D4AF37]/[0.035] p-6 sm:p-8 lg:border-l lg:border-t-0 lg:p-8 xl:p-10">
            {/* Gold Accent */}

            <div
              aria-hidden="true"
              className="mb-5 h-1 w-10 rounded-full bg-[#D4AF37]"
            />

            {/* Redemption Title */}

            {benefit.RedemptionTitle?.trim() && (
              <h3 className="text-sm font-bold uppercase tracking-[0.12em] text-[#D4AF37] sm:text-base">
                {benefit.RedemptionTitle}
              </h3>
            )}

            {/* Redemption Content */}

            {redemptionContentHtml && (
              <div
                className="
                  mt-3
                  text-sm
                  leading-7
                  text-white/65
                  sm:text-[15px]

                  [&_a]:text-[#D4AF37]
                  [&_a]:underline
                  [&_a]:underline-offset-4

                  [&_blockquote]:my-4
                  [&_blockquote]:border-l-2
                  [&_blockquote]:border-[#D4AF37]/50
                  [&_blockquote]:pl-4

                  [&_code]:rounded
                  [&_code]:bg-white/10
                  [&_code]:px-1.5
                  [&_code]:py-0.5

                  [&_em]:text-white/80

                  [&_h1]:mb-3
                  [&_h1]:font-bold
                  [&_h1]:text-white

                  [&_h2]:mb-3
                  [&_h2]:font-bold
                  [&_h2]:text-white

                  [&_h3]:mb-3
                  [&_h3]:font-bold
                  [&_h3]:text-white

                  [&_li]:ml-5
                  [&_li]:list-disc

                  [&_ol]:my-3
                  [&_ol]:space-y-1
                  [&_ol]:pl-5

                  [&_p]:mb-3
                  [&_p:last-child]:mb-0

                  [&_strong]:font-semibold
                  [&_strong]:text-white

                  [&_ul]:my-3
                  [&_ul]:space-y-1
                  [&_ul]:pl-5
                "
                dangerouslySetInnerHTML={{
                  __html: redemptionContentHtml,
                }}
              />
            )}
          </div>
        )}
      </div>
    </article>
  );
}
