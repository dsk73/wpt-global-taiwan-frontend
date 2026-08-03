"use client";

import TeachingGuideSection from "./TeachingGuideSection";

import type { TeachingGuide } from "@/types/teaching-guide";

interface TeachingGuideSectionsProps {
  guide: TeachingGuide;
}

export default function TeachingGuideSections({
  guide,
}: TeachingGuideSectionsProps) {
  if (!guide.GuideSections?.length) {
    return null;
  }

  return (
    <section className="py-8">
      <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
        {guide.GuideSections.map((section, index) => (
          <TeachingGuideSection
            key={section.id}
            section={section}
            reverse={index % 2 === 1}
          />
        ))}
      </div>
    </section>
  );
}
