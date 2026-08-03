//src/features/community/components/CommunityLineCTA.tsx

"use client";

import Image from "next/image";
import Link from "next/link";
import { ArrowRight } from "lucide-react";

import { getMediaUrl } from "@/lib/media";

import type { CommunitySocialLink } from "@/types/community-page";

interface CommunityLineCTAProps {
  social: CommunitySocialLink;
}

export default function CommunityLineCTA({ social }: CommunityLineCTAProps) {
  return (
    <section className="px-6 py-10 md:px-8 md:py-14">
      <div className="mx-auto max-w-5xl">
        <Link
          href={social.URL}
          target="_blank"
          rel="noopener noreferrer"
          className="group border-border bg-card hover:border-primary hover:shadow-primary/10 flex items-center justify-between rounded-3xl border p-6 transition-all duration-300 hover:-translate-y-1 hover:shadow-xl md:p-8"
        >
          <div className="flex min-w-0 items-center gap-5">
            <div className="bg-muted flex h-16 w-16 shrink-0 items-center justify-center rounded-2xl p-2">
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
                <span className="text-primary text-2xl font-bold">
                  {social.Platform.charAt(0)}
                </span>
              )}
            </div>

            <div className="min-w-0">
              <h2 className="text-foreground text-xl font-bold md:text-2xl">
                {social.Label}
              </h2>

              <p className="text-muted-foreground mt-2 text-sm md:text-base">
                Stay connected with the official WPT Global Taiwan community.
              </p>
            </div>
          </div>

          <ArrowRight className="text-muted-foreground ml-6 h-7 w-7 shrink-0 transition-transform duration-300 group-hover:translate-x-2" />
        </Link>
      </div>
    </section>
  );
}
