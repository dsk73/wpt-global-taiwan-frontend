"use client";

import Image from "next/image";

import { getMediaUrl } from "@/lib/media";

import type {
  TeachingGuideSection as TeachingGuideSectionType,
  TeachingGuideStep,
} from "@/types/teaching-guide";

interface TeachingGuideSectionProps {
  section: TeachingGuideSectionType;
}

export default function TeachingGuideSection({
  section,
}: TeachingGuideSectionProps) {
  if (!section.Steps?.length) {
    return null;
  }

  const steps = [...section.Steps].sort(
    (a, b) => a.DisplayOrder - b.DisplayOrder,
  );

  /**
   * Columns are controlled from Strapi.
   *
   * Examples:
   * 3 = Computer section → 3 columns + 16:9 images
   * 4 = Mobile section   → 4 columns + 9:16 images
   *
   * We allow between 1 and 6 columns.
   */
  const columns = Math.max(1, Math.min(section.Columns || 1, 6));

  const gridColumnsClass =
    columns === 1
      ? "lg:grid-cols-1"
      : columns === 2
        ? "lg:grid-cols-2"
        : columns === 3
          ? "lg:grid-cols-3"
          : columns === 4
            ? "lg:grid-cols-4"
            : columns === 5
              ? "lg:grid-cols-5"
              : "lg:grid-cols-6";

  return (
    <section>
      {/* -------------------------------------------------------
       * Section Title
       * ----------------------------------------------------- */}

      <div className="mb-10">
        <h2 className="text-3xl font-bold tracking-tight text-white md:text-4xl">
          {section.Title}
        </h2>

        <div className="mt-4 h-1 w-16 rounded-full bg-(--primary)" />
      </div>

      {/* -------------------------------------------------------
       * Step Grid
       * ----------------------------------------------------- */}

      <div
        className={[
          "grid items-stretch gap-6",
          "grid-cols-1",
          "sm:grid-cols-2",
          gridColumnsClass,
        ].join(" ")}
      >
        {steps.map((step) => (
          <TeachingGuideStepCard key={step.id} step={step} columns={columns} />
        ))}
      </div>
    </section>
  );
}

/* ============================================================
 * Step Card
 * ========================================================== */

interface TeachingGuideStepCardProps {
  step: TeachingGuideStep;
  columns: number;
}

function TeachingGuideStepCard({ step, columns }: TeachingGuideStepCardProps) {
  const imageUrl = getMediaUrl(step.Image?.url);

  /**
   * Image aspect ratio is controlled by the section column count.
   *
   * 3 columns → 16:9 landscape
   * 4 columns → 9:16 portrait
   *
   * For any other column count, use 16:9 as the default.
   */
  const imageAspectRatio = columns === 4 ? "aspect-[9/16]" : "aspect-video";

  return (
    <article
      className="
        group
        flex
        h-full
        flex-col
        overflow-hidden
        rounded-2xl
        border
        border-white/10
        bg-white/5
        transition-all
        duration-300
        hover:border-white/20
        hover:bg-white/10
      "
    >
      {/* -------------------------------------------------------
       * Image
       * ----------------------------------------------------- */}

      <div
        className={`relative w-full shrink-0 overflow-hidden bg-white/5 ${imageAspectRatio}`}
      >
        {imageUrl ? (
          <Image
            src={imageUrl}
            alt={step.Image?.alternativeText || `Step ${step.StepNumber}`}
            fill
            sizes="
              (max-width: 639px) 100vw,
              (max-width: 1023px) 50vw,
              25vw
            "
            className="
              object-cover
              transition-transform
              duration-500
              group-hover:scale-105
            "
          />
        ) : (
          <div className="flex h-full w-full items-center justify-center">
            <span className="text-sm text-white/40">
              Step {step.StepNumber}
            </span>
          </div>
        )}
      </div>

      {/* -------------------------------------------------------
       * Content
       * ----------------------------------------------------- */}

      <div className="flex flex-1 flex-col p-5">
        {/* Step Number */}

        <div className="mb-4 flex items-center gap-3">
          <span
            className="
              flex
              h-9
              w-9
              shrink-0
              items-center
              justify-center
              rounded-full
              bg-(--primary)
              text-sm
              font-bold
              text-white
            "
          >
            {step.StepNumber}
          </span>

          <p
            className="
              text-xs
              font-semibold
              uppercase
              tracking-[0.18em]
              text-white/50
            "
          >
            Step {step.StepNumber}
          </p>
        </div>

        {/* Step Content */}

        <div
          className="
            prose
            prose-invert
            max-w-none

            prose-headings:mb-3
            prose-headings:font-bold
            prose-headings:text-white

            prose-p:my-2
            prose-p:text-sm
            prose-p:leading-7
            prose-p:text-white/75

            prose-ul:my-3
            prose-ol:my-3

            prose-li:text-sm
            prose-li:leading-6
            prose-li:text-white/75

            prose-strong:text-white

            prose-a:text-(--primary)
            prose-a:no-underline

            hover:prose-a:underline
          "
          dangerouslySetInnerHTML={{
            __html: step.Content,
          }}
        />
      </div>
    </article>
  );
}
