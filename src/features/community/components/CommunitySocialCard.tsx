//src/features/community/components/CommunitySocialCard.tsx

"use client";

import Link from "next/link";
import Image from "next/image";
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
      className="group border-border bg-card hover:border-primary hover:shadow-primary/10 flex h-full flex-col items-center rounded-2xl border p-6 text-center shadow-sm transition-all duration-300 hover:-translate-y-1 hover:shadow-lg"
    >
      <div className="mb-5 flex h-16 w-16 items-center justify-center">
        {social.Icon ? (
          <Image
            src={getMediaUrl(social.Icon.url)}
            alt={social.Label || social.Platform || "Community social icon"}
            width={64}
            height={64}
            className="h-16 w-16 object-contain transition-transform duration-300 group-hover:scale-110"
          />
        ) : (
          <div className="bg-muted text-muted-foreground flex h-16 w-16 items-center justify-center rounded-full text-lg font-semibold">
            {social.Platform.charAt(0)}
          </div>
        )}
      </div>

      <h3 className="text-foreground text-lg font-semibold">{social.Label}</h3>

      <p className="text-muted-foreground mt-1 text-sm">{social.Platform}</p>

      <div className="text-primary mt-5 flex items-center gap-2 text-sm font-medium">
        <span>Visit</span>

        <ExternalLink
          size={16}
          className="transition-transform duration-300 group-hover:translate-x-1"
        />
      </div>
    </Link>
  );
}
