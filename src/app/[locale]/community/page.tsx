import { Header } from "@/features/header";
import { Footer } from "@/features/footer";
import FeaturedCommunity from "@/features/community/components/FeaturedCommunity";
import CommunityGrid from "@/features/community/components/CommunityGrid";

import { getAllCommunities } from "@/services/community.service";

import type { Locale } from "@/providers";

interface CommunityPageProps {
  params: Promise<{
    locale: Locale;
  }>;
}

const PAGE_TITLE: Record<Locale, string> = {
  "zh-Hant-TW": "撲克交流站",
  en: "Poker Exchange",
  "ms-MY": "Komuniti Poker",
};

const PAGE_DESCRIPTION: Record<Locale, string> = {
  "zh-Hant-TW":
    "探索 WPT Global Taiwan 最新社群文章、玩家故事、攻略與官方消息。",
  en: "Explore the latest community posts, player stories, strategy guides and official updates from WPT Global Taiwan.",
  "ms-MY":
    "Terokai artikel komuniti, kisah pemain, panduan strategi dan berita rasmi WPT Global Taiwan.",
};

export default async function CommunityPage({ params }: CommunityPageProps) {
  const { locale } = await params;

  const communities = await getAllCommunities(locale);

  const featured = communities.find((community) => community.Featured) ?? null;

  const latest = communities.filter(
    (community) => community.documentId !== featured?.documentId,
  );

  return (
    <>
      <Header />

      <main className="bg-[#070B15] pt-32">
        {/* Hero */}
        <section className="border-b border-white/10">
          <div className="mx-auto max-w-7xl px-4 py-20 sm:px-6 lg:px-8">
            <h1 className="text-5xl font-bold text-white md:text-6xl">
              {PAGE_TITLE[locale]}
            </h1>

            <p className="mt-6 max-w-3xl text-lg leading-8 text-white/70">
              {PAGE_DESCRIPTION[locale]}
            </p>
          </div>
        </section>

        {/* Content */}
        <section className="mx-auto max-w-7xl px-4 py-20 sm:px-6 lg:px-8">
          {featured && (
            <FeaturedCommunity community={featured} locale={locale} />
          )}

          {latest.length > 0 && (
            <div className="mt-16">
              <CommunityGrid communities={latest} locale={locale} />
            </div>
          )}
        </section>
      </main>

      <Footer locale={locale} />
    </>
  );
}
