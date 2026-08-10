"use client";

import Image from "next/image";
import Link from "next/link";
import { ArrowRight } from "lucide-react";

import { getMediaUrl } from "@/lib/media";

import type { CommunitySocialLink } from "@/types/community-page";
import type { Locale } from "@/providers";

interface CommunityLineCTAProps {
  social: CommunitySocialLink;
  locale: Locale;
}

const CONTENT: Record<
  Locale,
  {
    title: string;
    description: string;
    button: string;
  }
> = {
  "zh-Hant-TW": {
    title: "需要協助？立即聯繫我們",
    description: "加入官方 LINE，真人客服即時為您服務",
    button: "立即聯繫客服",
  },

  en: {
    title: "Need help? Contact us now",
    description:
      "Join our official LINE for real-time assistance from our customer support team.",
    button: "Contact Support",
  },

  "ms-MY": {
    title: "Perlukan bantuan? Hubungi kami sekarang",
    description:
      "Sertai LINE rasmi kami untuk mendapatkan bantuan segera daripada pasukan khidmat pelanggan kami.",
    button: "Hubungi Sokongan",
  },
};

export default function CommunityLineCTA({
  social,
  locale,
}: CommunityLineCTAProps) {
  const content = CONTENT[locale];

  if (!content) {
    return null;
  }

  return (
    <section className="py-10 sm:py-12">
      {/* -------------------------------------------------------
       * Same Container Width as Community Social Grid
       * ----------------------------------------------------- */}

      <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
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
              items-start
              justify-between
              gap-6
              sm:flex-row
              sm:items-center
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
                  h-16
                  w-16
                  shrink-0
                  items-center
                  justify-center
                  overflow-hidden
                  rounded-2xl
                  border
                  border-white/10
                  bg-white/5
                  p-3
                  transition-all
                  duration-500
                  group-hover:border-white/20
                  group-hover:bg-white/10
                  group-hover:scale-105
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
                    width={64}
                    height={64}
                    className="h-full w-full object-contain"
                  />
                ) : (
                  <span className="text-2xl font-bold text-white">
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
              </div>
            </div>

            {/* -------------------------------------------------
             * Official LINE Button
             * ----------------------------------------------- */}

            <Link
              href={social.URL}
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
              "
            >
              {content.button}

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
