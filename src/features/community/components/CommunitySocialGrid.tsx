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
    <section className="px-6 py-12 md:px-8 md:py-16">
      <div className="mx-auto max-w-7xl">
        <div className="grid gap-6 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4">
          {socialLinks.map((social) => (
            <CommunitySocialCard key={social.id} social={social} />
          ))}
        </div>
      </div>
    </section>
  );
}
