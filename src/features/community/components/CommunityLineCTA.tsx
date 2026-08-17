
"use client";

import Image from "next/image";
import Link from "next/link";
import { ArrowRight } from "lucide-react";

import { getMediaUrl } from "@/lib/media";

import type { CommunitySocialLink } from "@/types/community-page";
import type { Locale } from "@/providers";

interface CommunityLineCTAProps {
  social: CommunitySocialLink;
  lineId: string;
  lineButtonText: string;
  lineButtonURL: string;
  locale: Locale;
}

const CONTENT: Record<
  Locale,
  {
    title: string;
    description: string;
  }
> = {
  "zh-Hant-TW": {
    title: "需要協助？立即聯繫我們",
    description: "加入官方 LINE，真人客服即時為您服務",
  },

  en: {
    title: "Need help? Contact us now",
    description:
      "Join our official LINE for real-time assistance from our customer support team.",
  },

  "ms-MY": {
    title: "Perlukan bantuan? Hubungi kami sekarang",
    description:
      "Sertai LINE rasmi kami untuk mendapatkan bantuan segera daripada pasukan khidmat pelanggan kami.",
  },
};

export default function CommunityLineCTA({
  social,
  lineId,
  lineButtonText,
  lineButtonURL,
  locale,
}: CommunityLineCTAProps) {
  const content = CONTENT[locale];

  if (!content) {
    return null;
  }

  return (
    <section className="py-10 sm:py-12">
      {/* -------------------------------------------------------
       * Wider Container
       * ----------------------------------------------------- */}

      <div className="mx-auto max-w-350 px-4 sm:px-6 lg:px-8">
        {/* -----------------------------------------------------
         * LINE CTA Card
         * --------------------------------------------------- */}

        <div
          className="
            group
            relative
            overflow-hidden
            rounded-3xl
            border
            border-white/10
            bg-white/[0.035]
            px-6
            py-7
            backdrop-blur-xl
            transition-all
            duration-500
            hover:border-white/20
            hover:bg-white/5
            hover:shadow-2xl
            sm:px-8
            sm:py-8
            lg:px-10
          "
        >
          {/* Background Glow */}

          <div
            className="
              pointer-events-none
              absolute
              -right-20
              -top-20
              h-48
              w-48
              rounded-full
              bg-(--primary)/10
              blur-3xl
              transition-all
              duration-500
              group-hover:bg-(--primary)/15
            "
          />

          {/* -----------------------------------------------------
           * Main Content
           * --------------------------------------------------- */}

          <div
            className="
              relative
              flex
              flex-col
              gap-6
              md:grid
              md:grid-cols-[minmax(0,1fr)_auto_auto]
              md:items-center
              md:gap-8
              lg:gap-10
            "
          >
            {/* -------------------------------------------------
             * Icon + Text
             * ----------------------------------------------- */}

            <div className="flex min-w-0 items-center gap-5">
              {/* LINE Icon */}

              <div
                className="
                  flex
                  h-20
                  w-20
                  shrink-0
                  items-center
                  justify-center
                  overflow-hidden
                  rounded-2xl
                  border
                  border-white/10
                  bg-white/5
                  p-2.5
                  transition-all
                  duration-500
                  group-hover:scale-105
                  group-hover:border-white/20
                  group-hover:bg-white/10
                  md:h-24
                  md:w-24
                  md:rounded-3xl
                  md:p-3
                "
              >
                {social.Icon ? (
                  <Image
                    src={getMediaUrl(social.Icon.url)}
                    alt={
                      social.Icon.alternativeText ||
                      social.Label ||
                      social.Platform ||
                      "Community social icon"
                    }
                    width={96}
                    height={96}
                    className="
                      h-full
                      w-full
                      object-contain
                      transition-transform
                      duration-500
                      group-hover:scale-110
                    "
                  />
                ) : (
                  <span className="text-3xl font-bold text-white md:text-4xl">
                    {social.Platform?.charAt(0)}
                  </span>
                )}
              </div>

              {/* Text */}

              <div className="min-w-0">
                <h2 className="text-xl font-bold text-white md:text-2xl">
                  {content.title}
                </h2>

                <p className="mt-2 text-sm leading-6 text-white/60 md:text-base">
                  {content.description}
                </p>

                {/* LINE ID — Mobile */}

                {lineId && (
                  <div
                    className="
                      mt-3
                      inline-flex
                      items-center
                      rounded-lg
                      border
                      border-(--primary)/30
                      bg-(--primary)/10
                      px-3
                      py-1.5
                      shadow-sm
                      transition-all
                      duration-300
                      group-hover:border-(--primary)/50
                      group-hover:bg-(--primary)/15
                      md:hidden
                    "
                  >
                    <span className="text-xs font-semibold uppercase tracking-wider text-(--primary)">
                      LINE ID:
                    </span>

                    <span className="ml-2 text-sm font-bold tracking-wide text-white">
                      {lineId}
                    </span>
                  </div>
                )}
              </div>
            </div>

            {/* -------------------------------------------------
             * LINE ID — Desktop / Tablet
             * ------------------------------------------------- */}

            {lineId && (
              <div
                className="
                  hidden
                  items-center
                  rounded-lg
                  border
                  border-(--primary)/30
                  bg-(--primary)/10
                  px-4
                  py-2
                  shadow-sm
                  transition-all
                  duration-300
                  group-hover:border-(--primary)/50
                  group-hover:bg-(--primary)/15
                  md:inline-flex
                "
              >
                <span className="text-sm font-semibold uppercase tracking-wider text-(--primary)">
                  LINE ID:
                </span>

                <span className="ml-2 text-base font-bold tracking-wide text-white">
                  {lineId}
                </span>
              </div>
            )}

            {/* -------------------------------------------------
             * Official LINE Button
             * ------------------------------------------------- */}

            {lineButtonText && lineButtonURL && (
              <Link
                href={lineButtonURL}
                target="_blank"
                rel="noopener noreferrer"
                className="
                  inline-flex
                  shrink-0
                  items-center
                  justify-center
                  gap-2
                  rounded-xl
                  bg-(--primary)
                  px-6
                  py-3
                  font-semibold
                  text-black
                  transition-all
                  duration-300
                  hover:scale-105
                  md:px-7
                  md:py-3.5
                "
              >
                {lineButtonText}

                <ArrowRight
                  className="
                    h-5
                    w-5
                    transition-transform
                    duration-300
                    group-hover:translate-x-1
                  "
                />
              </Link>
            )}
          </div>

          {/* Bottom Accent */}

          <div
            className="
              pointer-events-none
              absolute
              bottom-0
              left-8
              right-8
              h-px
              bg-white/10
              transition-colors
              duration-500
              group-hover:bg-(--primary)/40
            "
          />
        </div>
      </div>
    </section>
  );
}
