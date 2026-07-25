import { Header } from "@/features/header";
import { Footer } from "@/features/footer";

import FeaturedTeachingCenter from "@/features/teaching-center/components/FeaturedTeachingCenter";
import TeachingCenterGrid from "@/features/teaching-center/components/TeachingCenterGrid";

import { fetchTeachingCenterArticles } from "@/services";

import type { Locale } from "@/providers";

interface TeachingCenterPageProps {
  params: Promise<{
    locale: Locale;
  }>;
}

const PAGE_TITLE: Record<Locale, string> = {
  "zh-Hant-TW": "教學中心",
  en: "Teaching Center",
  "ms-MY": "Teaching Center",
};

const PAGE_DESCRIPTION: Record<Locale, string> = {
  "zh-Hant-TW":
    "探索 WPT Global Taiwan 的撲克教學、策略指南、職業技巧、錦標賽分析與專業文章。",
  en: "Master your poker skills with strategy guides, tournament tips, beginner tutorials and expert insights from WPT Global Taiwan.",
  "ms-MY":
    "Tingkatkan kemahiran poker anda dengan panduan strategi, tip kejohanan, tutorial untuk pemula dan artikel profesional daripada WPT Global Taiwan.",
};

export default async function TeachingCenterPage({
  params,
}: TeachingCenterPageProps) {
  const { locale } = await params;

  const articles = await fetchTeachingCenterArticles(locale);

  const featured =
    articles.find((article) => article.Featured) ?? articles[0] ?? null;

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
            <FeaturedTeachingCenter article={featured} locale={locale} />
          )}

          {latest.length > 0 && (
            <div className="mt-16">
              <TeachingCenterGrid articles={latest} locale={locale} />
            </div>
          )}
        </section>
      </main>

      <Footer locale={locale} />
    </>
  );
}
