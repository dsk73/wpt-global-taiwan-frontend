// src/features/about/components/AboutHero.tsx

import Image from "next/image";

import { getMediaURL } from "@/config";

import type { AboutPage } from "@/types";

interface AboutHeroProps {
  about: AboutPage;
}

export function AboutHero({ about }: AboutHeroProps) {
  return (
    <section className="relative overflow-hidden">
      <div className="relative h-40 w-full sm:h-52 lg:h-70">
        {" "}
        {about.BannerImage ? (
          <Image
            src={getMediaURL(about.BannerImage.url)}
            alt={about.BannerImage.alternativeText ?? about.Title}
            fill
            priority
            sizes="100vw"
            className="object-cover object-center"
          />
        ) : (
          <div className="h-full w-full bg-neutral-900" />
        )}
        {/* Dark overlay */}
        <div className="absolute inset-0 bg-black/75" />
        {/* Bottom fade */}
        <div className="absolute inset-x-0 bottom-0 h-40 bg-linear-to-t from-[#07090F] via-[#07090F]/60 to-transparent" />
        {/* Content */}
        <div className="absolute inset-0 flex items-center justify-center px-6">
          <div className="mx-auto max-w-5xl text-center">
            <h1 className="text-4xl font-bold tracking-tight text-white drop-shadow-xl sm:text-5xl lg:text-6xl">
              {about.Title}
            </h1>
          </div>
        </div>
      </div>
    </section>
  );
}
