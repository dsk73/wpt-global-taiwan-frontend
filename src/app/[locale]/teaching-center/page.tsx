import { Footer } from "@/features/footer";
import { Header } from "@/features/header";
import {
  FeaturedTeachingCenter,
  TeachingCenterGrid,
  TeachingCenterHero,
} from "@/features/teaching-center";

import { fetchTeachingCenterPage, fetchTeachingGuides } from "@/services";

import type { Locale } from "@/providers";

interface TeachingCenterPageProps {
  params: Promise<{
    locale: Locale;
  }>;
}

export default async function TeachingCenterPage({
  params,
}: TeachingCenterPageProps) {
  const { locale } = await params;

  const [page, guides] = await Promise.all([
    fetchTeachingCenterPage(locale),
    fetchTeachingGuides(locale),
  ]);

  const featured = guides[0] ?? null;

  const remainingGuides = featured
    ? guides.filter((guide) => guide.documentId !== featured.documentId)
    : [];

  return (
    <>
      <Header />

      <main className="bg-[#070B15] pt-32">
        <TeachingCenterHero page={page} />

        <section className="mx-auto max-w-7xl px-4 py-20 sm:px-6 lg:px-8">
          {featured && (
            <FeaturedTeachingCenter guide={featured} locale={locale} />
          )}

          {remainingGuides.length > 0 && (
            <div className="mt-16">
              <TeachingCenterGrid guides={remainingGuides} locale={locale} />
            </div>
          )}
        </section>
      </main>

      <Footer locale={locale} />
    </>
  );
}
