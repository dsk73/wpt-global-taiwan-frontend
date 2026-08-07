// src/features/about/components/AboutGlobalSection.tsx

import Image from "next/image";
import Link from "next/link";

import { getMediaURL } from "@/config";

import type { AboutPage } from "@/types";

interface AboutGlobalSectionProps {
  about: AboutPage;
}

export function AboutGlobalSection({ about }: AboutGlobalSectionProps) {
  const features = [...about.Features]
    .filter((item) => item.Active)
    .sort((a, b) => a.DisplayOrder - b.DisplayOrder);

  return (
    <section className="bg-[#07090F] py-20 lg:py-28">
      <div className="mx-auto max-w-7xl px-6">
        {/* =========================================================
            ABOUT SECTION CARD
        ========================================================= */}

        <div className="overflow-hidden rounded-3xl border border-white/10 bg-[#0D1424] shadow-2xl">
          <div className="grid items-center lg:grid-cols-2">
            {/* Left Image */}

            {/* Left Image */}

            <div className="p-8 lg:p-10">
              <div className="relative overflow-hidden rounded-3xl">
                <div className="relative aspect-4/3 lg:h-125">
                  {about.SectionImage && (
                    <>
                      <Image
                        src={getMediaURL(about.SectionImage.url)}
                        alt={
                          about.SectionImage.alternativeText ??
                          about.SectionTitle
                        }
                        fill
                        priority
                        className="object-cover"
                      />

                      <div className="absolute inset-0 bg-black/15" />
                    </>
                  )}
                </div>
              </div>
            </div>

            {/* Right Content */}

            <div className="p-10 md:p-14 lg:p-16">
              <h2 className="text-4xl font-bold leading-tight text-white lg:text-5xl">
                {about.SectionTitle}
              </h2>

              <div className="mt-8 space-y-7 text-lg leading-9 whitespace-pre-line text-white/75">
                {about.SectionContent}
              </div>
            </div>
          </div>
        </div>

        {/* =========================================================
            FEATURES
        ========================================================= */}

        <div className="mt-28 space-y-28">
          {features.map((feature, index) => (
            <div
              key={feature.id}
              className={`grid items-center gap-16 lg:grid-cols-2 ${
                index % 2 === 1 ? "lg:[&>*:first-child]:order-2" : ""
              }`}
            >
              {/* Image */}

              <div className="overflow-hidden rounded-3xl border border-white/10 bg-[#0D1424] shadow-xl">
                <div className="relative aspect-4/3">
                  {feature.Image && (
                    <Image
                      src={getMediaURL(feature.Image.url)}
                      alt={feature.Image.alternativeText ?? feature.Title}
                      fill
                      className="object-cover transition duration-500 hover:scale-105"
                    />
                  )}
                </div>
              </div>

              {/* Content */}

              <div>
                <h3 className="text-3xl font-bold leading-tight text-white lg:text-4xl">
                  {feature.Title}
                </h3>

                <div className="mt-8 space-y-6 text-lg leading-9 whitespace-pre-line text-white/75">
                  {feature.Description}
                </div>

                {feature.ButtonText && feature.ButtonURL && (
                  <Link
                    href={feature.ButtonURL}
                    className="mt-10 inline-flex rounded-xl bg-linear-to-r from-blue-600 to-cyan-500 px-7 py-3 font-semibold text-white transition-all duration-300 hover:scale-105"
                  >
                    {feature.ButtonText}
                  </Link>
                )}
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
