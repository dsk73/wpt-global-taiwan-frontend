// src/features/about/components/AboutIntroduction.tsx

import Image from "next/image";

import { getMediaURL } from "@/config";

import type { AboutPage } from "@/types";

interface AboutIntroductionProps {
  about: AboutPage;
}

export function AboutIntroduction({ about }: AboutIntroductionProps) {
  return (
    <section className="bg-[#07090F] py-20 lg:py-28">
      <div className="mx-auto max-w-6xl px-6">
        <div className="text-center">
          <h2 className="text-4xl font-bold text-white lg:text-5xl">
            {about.AboutTitle}
          </h2>

          {about.AboutLogo && (
            <div className="relative mx-auto mt-10 h-20 w-64 lg:h-24 lg:w-80">
              <Image
                src={getMediaURL(about.AboutLogo.url)}
                alt={about.AboutLogo.alternativeText ?? "WPT Global Logo"}
                fill
                sizes="320px"
                className="object-contain"
              />
            </div>
          )}
        </div>

        <div className="mx-auto mt-14 max-w-5xl">
          <div className="text-center text-lg leading-9 whitespace-pre-line text-white/75 lg:text-xl lg:leading-10">
            {about.AboutContent}
          </div>
        </div>
      </div>
    </section>
  );
}
