"use client";

import type { TeachingGuide } from "@/types/teaching-guide";

interface TeachingGuideIntroductionProps {
  guide: TeachingGuide;
}

export default function TeachingGuideIntroduction({
  guide,
}: TeachingGuideIntroductionProps) {
  if (!guide.Content) {
    return null;
  }

  return (
    <section className="py-16">
      <div className="mx-auto max-w-4xl">
        <div
          className="prose prose-invert prose-lg max-w-none
            prose-headings:text-white
            prose-p:text-white/80
            prose-li:text-white/80
            prose-strong:text-white
            prose-a:text-(--primary)"
          dangerouslySetInnerHTML={{
            __html: guide.Content,
          }}
        />
      </div>
    </section>
  );
}
