"use client";

import Image from "next/image";
import Link from "next/link";
import { ExternalLink } from "lucide-react";

import { getMediaUrl } from "@/lib/media";

import type { CommunitySocialLink } from "@/types/community-page";

interface CommunitySocialCardProps {
  social: CommunitySocialLink;
}

export default function CommunitySocialCard({
  social,
}: CommunitySocialCardProps) {
  return (
    <Link
      href={social.URL}
      target="_blank"
      rel="noopener noreferrer"
      className="
        group
        relative
        block
        overflow-hidden
        rounded-3xl
        border
        border-white/10
        bg-white/[0.035]
        p-4
        backdrop-blur-xl
        transition-all
        duration-500
        hover:-translate-y-1
        hover:border-white/20
        hover:bg-white/6
        hover:shadow-2xl
        sm:p-5
      "
    >
      {/* -------------------------------------------------------
       * Background Glow
       * ----------------------------------------------------- */}

      <div
        className="
          pointer-events-none
          absolute
          -right-20
          -top-20
          h-44
          w-44
          rounded-full
          bg-(--primary)/10
          blur-3xl
          transition-all
          duration-500
          group-hover:bg-(--primary)/20
        "
      />

      {/* -------------------------------------------------------
       * Main Card Layout
       * ----------------------------------------------------- */}

      <div
        className="
          relative
          grid
          min-h-32
          grid-cols-[40%_60%]
          items-center
        "
      >
        {/* -----------------------------------------------------
         * Left Side — Icon
         * --------------------------------------------------- */}

        <div className="flex items-center justify-center pr-3 sm:pr-4">
          <div
            className="
              relative
              flex
              aspect-square
              w-full
              max-w-24
              items-center
              justify-center
              overflow-hidden
              rounded-2xl
              border
              border-white/10
              bg-white/5
              p-3
              shadow-lg
              transition-all
              duration-500
              group-hover:border-white/20
              group-hover:bg-white/10
              group-hover:shadow-xl
              sm:rounded-3xl
              sm:p-4
            "
          >
            {/* Icon Glow */}

            <div
              className="
                pointer-events-none
                absolute
                inset-0
                rounded-2xl
                bg-(--primary)/10
                opacity-0
                blur-xl
                transition-opacity
                duration-500
                group-hover:opacity-100
                sm:rounded-3xl
              "
            />

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
                  relative
                  h-full
                  w-full
                  object-contain
                  transition-transform
                  duration-500
                  group-hover:scale-110
                "
              />
            ) : (
              <span className="relative text-3xl font-bold text-white">
                {social.Platform?.charAt(0)}
              </span>
            )}
          </div>
        </div>

        {/* -----------------------------------------------------
         * Right Side — Platform + Visit
         * --------------------------------------------------- */}

        <div
          className="
            flex
            min-w-0
            flex-col
            items-start
            justify-center
            pl-3
            sm:pl-5
          "
        >
          {/* Platform */}

          <h3
            className="
              text-lg
              font-bold
              uppercase
              tracking-wide
              text-white
              transition-colors
              duration-300
              group-hover:text-(--primary)
              sm:text-xl
            "
          >
            {social.Platform}
          </h3>

          {/* Visit Button */}

          <span
            className="
              mt-4
              inline-flex
              items-center
              gap-2
              rounded-xl
              border
              border-white/10
              bg-white/5
              px-4
              py-2
              text-sm
              font-semibold
              text-white/70
              transition-all
              duration-300
              group-hover:border-(--primary)/40
              group-hover:bg-(--primary)
              group-hover:text-black
            "
          >
            <span>Visit</span>

            <ExternalLink
              size={15}
              className="
                transition-transform
                duration-300
                group-hover:translate-x-0.5
                group-hover:-translate-y-0.5
              "
            />
          </span>
        </div>
      </div>

      {/* -------------------------------------------------------
       * Bottom Accent
       * ----------------------------------------------------- */}

      <div
        className="
          pointer-events-none
          absolute
          bottom-0
          left-5
          right-5
          h-px
          bg-white/10
          transition-colors
          duration-500
          group-hover:bg-(--primary)/40
        "
      />
    </Link>
  );
}
