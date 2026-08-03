//src/features/community/components/CommunityHero.tsx

"use client";

import ReactMarkdown from "react-markdown";

import type { CommunityPage } from "@/types/community-page";

interface CommunityHeroProps {
  page: CommunityPage;
}

export default function CommunityHero({ page }: CommunityHeroProps) {
  return (
    <section className="border-border bg-background border-b">
      <div className="mx-auto flex max-w-4xl flex-col items-center px-6 py-8 text-center md:px-8 md:py-12">
        <h1 className="text-foreground text-4xl font-bold tracking-tight md:text-5xl lg:text-6xl">
          {page.HeroTitle}
        </h1>

        {page.HeroDescription && (
          <div className="prose prose-neutral dark:prose-invert text-muted-foreground mt-4 max-w-2xl text-base leading-7 md:text-lg">
            <ReactMarkdown>{page.HeroDescription}</ReactMarkdown>
          </div>
        )}
      </div>
    </section>
  );
}
