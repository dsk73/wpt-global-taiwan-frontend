"use client";

import Image from "next/image";

import { getMediaUrl } from "@/lib/media";

import type { GuideSection } from "@/types/teaching-guide";

interface TeachingGuideSectionProps {
  section: GuideSection;
  reverse?: boolean;
}

export default function TeachingGuideSection({
  section,
  reverse = false,
}: TeachingGuideSectionProps) {
  return (
    <section className="py-12">
      <div
        className={`grid items-center gap-12 lg:grid-cols-2 ${
          reverse ? "lg:[&>*:first-child]:order-2" : ""
        }`}
      >
        <div className="relative aspect-4/3 overflow-hidden rounded-3xl border border-white/10">
          <Image
            src={getMediaUrl(section.Image?.url) || "/images/placeholder.jpg"}
            alt={section.Title}
            fill
            sizes="(max-width:1024px)100vw,50vw"
            className="object-cover"
          />
        </div>

        <div>
          <h2 className="mb-6 text-3xl font-bold text-white">
            {section.Title}
          </h2>

          <div
            className="prose prose-invert prose-lg max-w-none
              prose-headings:text-white
              prose-p:text-white/80
              prose-li:text-white/80
              prose-strong:text-white
              prose-a:text-(--primary)"
            dangerouslySetInnerHTML={{
              __html: section.Description,
            }}
          />
        </div>
      </div>
    </section>
  );
}
