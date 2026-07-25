import { Header } from "@/features/header";
import { Footer } from "@/features/footer";

import FeaturedPokerExchange from "@/features/poker-exchange/components/FeaturedPokerExchange";
import PokerExchangeGrid from "@/features/poker-exchange/components/PokerExchangeGrid";

import { getAllPokerExchangeArticles } from "@/services/poker-exchange.service";

import type { Locale } from "@/providers";

interface PokerExchangePageProps {
  params: Promise<{
    locale: Locale;
  }>;
}

const PAGE_TITLE: Record<Locale, string> = {
  "zh-Hant-TW": "撲克交流站",
  en: "Poker Exchange",
  "ms-MY": "Poker Exchange",
};

const PAGE_DESCRIPTION: Record<Locale, string> = {
  "zh-Hant-TW":
    "掌握最新 Poker Exchange 策略、產業資訊、賽事新聞與 WPT Global Taiwan 專業文章。",
  en: "Explore the latest Poker Exchange strategies, industry insights, tournament news and expert articles from WPT Global Taiwan.",
  "ms-MY":
    "Terokai strategi Poker Exchange terkini, berita kejohanan, perkembangan industri dan artikel pakar daripada WPT Global Taiwan.",
};

export default async function PokerExchangePage({
  params,
}: PokerExchangePageProps) {
  const { locale } = await params;

  const articles = await getAllPokerExchangeArticles(locale);

  const featured = articles.find((article) => article.Featured) ?? null;

  const latest = articles.filter(
    (article) => article.documentId !== featured?.documentId,
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
            <FeaturedPokerExchange article={featured} locale={locale} />
          )}

          {latest.length > 0 && (
            <div className="mt-16">
              <PokerExchangeGrid articles={latest} locale={locale} />
            </div>
          )}
        </section>
      </main>

      <Footer locale={locale} />
    </>
  );
}
