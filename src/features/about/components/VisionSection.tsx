// src/features/about/components/VisionSection.tsx

import Image from "next/image";
import ReactMarkdown from "react-markdown";

import { getMediaURL } from "@/config";

import type { AboutPage } from "@/types";

interface VisionSectionProps {
  about: AboutPage;
}

export function VisionSection({ about }: VisionSectionProps) {
  if (!about.VisionContent.trim()) {
    return null;
  }

  return (
    <section className="bg-[#07090F] py-16 sm:py-20 lg:py-28">
      <div className="mx-auto grid max-w-7xl items-center gap-12 px-6 lg:grid-cols-2 lg:gap-20">
        {/* Content */}
        <div className="order-2 lg:order-1">
          <h2 className="mb-8 text-3xl font-bold text-white sm:text-4xl lg:text-5xl">
            {about.VisionTitle}
          </h2>

          <div className="prose prose-lg max-w-none prose-invert prose-p:text-gray-300 prose-p:leading-8">
            <ReactMarkdown>{about.VisionContent}</ReactMarkdown>
          </div>
        </div>

        {/* Image */}
        <div className="order-1 lg:order-2">
          {about.VisionImage && (
            <div className="relative aspect-4/3 overflow-hidden rounded-3xl">
              <Image
                src={getMediaURL(about.VisionImage.url)}
                alt={about.VisionImage.alternativeText ?? about.VisionTitle}
                fill
                className="object-cover"
                sizes="(max-width: 1024px) 100vw, 50vw"
              />
            </div>
          )}
        </div>
      </div>
    </section>
  );
}
