import { TeamExclusiveBenefitCard } from "./TeamExclusiveBenefitCard";

import type { TeamExclusiveBenefit } from "@/types/team-exclusive-benefits";

interface TeamExclusiveBenefitsListProps {
  benefits: TeamExclusiveBenefit[];
}

/* ---------------------------------------
 * Team Exclusive Benefits List
 * ------------------------------------- */

export function TeamExclusiveBenefitsList({
  benefits,
}: TeamExclusiveBenefitsListProps) {
  /* ---------------------------------------
   * Sort Benefits
   *
   * Primary:
   * DisplayOrder
   *
   * Fallback:
   * StepNumber
   * ------------------------------------- */

  const sortedBenefits = [...benefits].sort((a, b) => {
    const displayOrderDifference = a.DisplayOrder - b.DisplayOrder;

    if (displayOrderDifference !== 0) {
      return displayOrderDifference;
    }

    return a.StepNumber - b.StepNumber;
  });

  /* ---------------------------------------
   * Empty State
   * ------------------------------------- */

  if (sortedBenefits.length === 0) {
    return null;
  }

  return (
    <section
      aria-label="Team exclusive benefits"
      className="relative overflow-hidden bg-[#070B15] py-12 sm:py-16 lg:py-20"
    >
      {/* ---------------------------------------
       * Background Decoration
       * ------------------------------------- */}

      <div aria-hidden="true" className="pointer-events-none absolute inset-0">
        <div className="absolute left-1/2 top-1/3 h-[500px] w-[900px] -translate-x-1/2 rounded-full bg-[#D4AF37]/[0.025] blur-[140px]" />

        <div className="absolute inset-x-0 top-0 h-px bg-gradient-to-r from-transparent via-[#D4AF37]/20 to-transparent" />
      </div>

      {/* ---------------------------------------
       * Benefits List
       * ------------------------------------- */}

      <div className="relative mx-auto max-w-[1400px] px-4 sm:px-6 lg:px-8">
        <div className="space-y-6 sm:space-y-8 lg:space-y-10">
          {sortedBenefits.map((benefit) => (
            <TeamExclusiveBenefitCard
              key={
                benefit.documentId ??
                `${benefit.StepNumber}-${benefit.DisplayOrder}`
              }
              benefit={benefit}
            />
          ))}
        </div>
      </div>
    </section>
  );
}
