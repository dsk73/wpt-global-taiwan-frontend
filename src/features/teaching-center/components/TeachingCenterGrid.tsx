"use client";

import TeachingCenterCard from "./TeachingCenterCard";

import type { Locale } from "@/providers";
import type { TeachingGuide } from "@/types/teaching-guide";

interface TeachingCenterGridProps {
  guides: TeachingGuide[];
  locale: Locale;
}

export default function TeachingCenterGrid({
  guides,
  locale,
}: TeachingCenterGridProps) {
  if (!guides.length) {
    return null;
  }

  return (
    <div className="grid gap-8 md:grid-cols-2 xl:grid-cols-3">
      {guides.map((guide) => (
        <TeachingCenterCard
          key={guide.documentId}
          guide={guide}
          locale={locale}
        />
      ))}
    </div>
  );
}
