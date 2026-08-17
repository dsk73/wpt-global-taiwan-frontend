"use client";

import CommunitySocialCard from "./CommunitySocialCard";

import type { CommunitySocialLink } from "@/types/community-page";

interface CommunitySocialGridProps {
  socialLinks: CommunitySocialLink[];
}

export default function CommunitySocialGrid({
  socialLinks,
}: CommunitySocialGridProps) {
  if (!socialLinks.length) {
    return null;
  }

  return (
    <section className="px-4 py-12 sm:px-6 md:px-8 md:py-16">
      <div className="mx-auto max-w-350">
        <div className="grid gap-6 sm:grid-cols-2 lg:grid-cols-4">
          {socialLinks.map((social) => (
            <CommunitySocialCard key={social.id} social={social} />
          ))}
        </div>
      </div>
    </section>
  );
}
