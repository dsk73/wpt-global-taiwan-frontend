// src/features/about/components/AboutGlobalSection.tsx

import Image from "next/image";

import { getMediaURL } from "@/config";

import type { AboutPage } from "@/types";

interface AboutGlobalSectionProps {
  about: AboutPage;
}

export function AboutGlobalSection({ about }: AboutGlobalSectionProps) {
  if (!about.GlobalImage) {
    return null;
  }

  return (
    <section className="bg-[#07090F] py-8 sm:py-12 lg:py-20">
      <div className="mx-auto max-w-7xl px-6">
        <div className="relative mx-auto aspect-video w-full max-w-6xl">
          <Image
            src={getMediaURL(about.GlobalImage.url)}
            alt={about.GlobalImage.alternativeText ?? "Global WPT Network"}
            fill
            priority={false}
            className="object-contain"
            sizes="(max-width: 768px) 100vw, 1200px"
          />
        </div>
      </div>
    </section>
  );
}
