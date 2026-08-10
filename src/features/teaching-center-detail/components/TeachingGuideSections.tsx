"use client";

import TeachingGuideSection from "./TeachingGuideSection";

import type { TeachingGuide } from "@/types/teaching-guide";

interface TeachingGuideSectionsProps {
  guide: TeachingGuide;
}

export default function TeachingGuideSections({
  guide,
}: TeachingGuideSectionsProps) {
  if (!guide.Sections?.length) {
    return null;
  }

  const sections = [...guide.Sections].sort(
    (a, b) => a.DisplayOrder - b.DisplayOrder,
  );

  return (
    <section className="py-8">
      <div className="space-y-20">
        {sections.map((section) => (
          <TeachingGuideSection key={section.id} section={section} />
        ))}
      </div>
    </section>
  );
}
