// src/features/about/components/AboutIntroduction.tsx

import Image from "next/image";

import { getMediaURL } from "@/config";

import type { AboutPage } from "@/types";

interface AboutIntroductionProps {
  about: AboutPage;
}

export function AboutIntroduction({ about }: AboutIntroductionProps) {
  return (
    <section className="bg-[#07090F] py-16 sm:py-20 lg:py-28">
      <div className="mx-auto flex max-w-5xl flex-col items-center px-6 text-center">
        {about.IntroductionLogo && (
          <div className="relative mb-10 h-20 w-56 sm:h-24 sm:w-72">
            <Image
              src={getMediaURL(about.IntroductionLogo.url)}
              alt={about.IntroductionLogo.alternativeText ?? "WPT Global Logo"}
              fill
              className="object-contain"
              sizes="288px"
            />
          </div>
        )}

        <div className="max-w-4xl">
          <p className="text-lg leading-9 whitespace-pre-line text-gray-300 sm:text-xl lg:text-2xl lg:leading-10">
            {about.IntroductionContent}
          </p>
        </div>
      </div>
    </section>
  );
}
