import Image from "next/image";

import { getMediaURL } from "@/config";

import type { AboutPage } from "@/types";
interface AboutHeroProps {
  about: AboutPage;
}

export function AboutHero({ about }: AboutHeroProps) {
  return (
    <section className="relative overflow-hidden">
      <div className="relative h-75 w-full md:h-105">
        {about.BannerImage ? (
          <Image
            src={getMediaURL(about.BannerImage.url)}
            alt={about.BannerImage.alternativeText ?? about.Title}
            fill
            priority
            className="object-cover"
            sizes="100vw"
          />
        ) : (
          <div className="h-full w-full bg-neutral-900" />
        )}

        <div className="absolute inset-0 bg-black/55" />

        <div className="absolute inset-0 flex items-center justify-center px-6">
          <div className="mx-auto max-w-5xl text-center">
            <h1 className="text-4xl font-bold text-white md:text-6xl">
              {about.Title}
            </h1>
          </div>
        </div>
      </div>
    </section>
  );
}
