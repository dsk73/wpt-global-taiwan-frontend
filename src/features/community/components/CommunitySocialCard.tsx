"use client";

import Image from "next/image";
import Link from "next/link";

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
        p-5
        backdrop-blur-xl
        transition-all
        duration-500
        hover:-translate-y-1
        hover:border-white/20
        hover:bg-white/6
        hover:shadow-2xl
        sm:p-6
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
          flex
          min-h-32
          items-center
          gap-5
        "
      >
        {/* -----------------------------------------------------
         * Social Icon
         * --------------------------------------------------- */}

        <div
          className="
            relative
            flex
            h-24
            w-24
            shrink-0
            items-center
            justify-center
            overflow-hidden
            rounded-3xl
            border
            border-white/10
            bg-white/5
            p-4
            shadow-lg
            transition-all
            duration-500
            group-hover:scale-105
            group-hover:border-white/20
            group-hover:bg-white/10
            group-hover:shadow-xl
          "
        >
          {/* Icon Glow */}

          <div
            className="
              pointer-events-none
              absolute
              inset-0
              rounded-3xl
              bg-(--primary)/10
              opacity-0
              blur-xl
              transition-opacity
              duration-500
              group-hover:opacity-100
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

        {/* -----------------------------------------------------
         * Platform + Username
         * --------------------------------------------------- */}

        <div
          className="
            flex
            min-w-0
            flex-1
            flex-col
            items-start
            justify-center
          "
        >
          {/* Platform */}

          <h3
            className="
              max-w-full
              text-lg
              font-bold
              leading-snug
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

          {/* Username / Label */}

          {social.Label && (
            <span
              className="
                mt-3
                inline-flex
                max-w-full
                items-center
                overflow-hidden
                rounded-lg
                border
                border-(--primary)/30
                bg-(--primary)/10
                px-3
                py-1.5
                text-sm
                font-semibold
                leading-5
                tracking-wide
                text-(--primary)
                shadow-sm
                transition-all
                duration-300
                group-hover:border-(--primary)/50
                group-hover:bg-(--primary)/15
                sm:text-base
              "
            >
              <span className="truncate">{social.Label}</span>
            </span>
          )}
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
