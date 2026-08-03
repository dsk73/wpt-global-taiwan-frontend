import { notFound } from "next/navigation";

import { Footer } from "@/features/footer";
import { Header } from "@/features/header";
import {
  TeachingGuideHero,
  TeachingGuideIntroduction,
  TeachingGuideSections,
} from "@/features/teaching-center-detail";
import TeachingCenterGrid from "@/features/teaching-center/components/TeachingCenterGrid";

import { fetchTeachingGuide, fetchTeachingGuides } from "@/services";

import type { Locale } from "@/providers";

interface TeachingCenterDetailPageProps {
  params: Promise<{
    locale: Locale;
    slug: string;
  }>;
}

export default async function TeachingCenterDetailPage({
  params,
}: TeachingCenterDetailPageProps) {
  const { locale, slug } = await params;

  const guide = await fetchTeachingGuide(slug, locale);

  if (!guide) {
    notFound();
  }

  const relatedGuides = (await fetchTeachingGuides(locale))
    .filter((item) => item.documentId !== guide.documentId)
    .slice(0, 3);

  return (
    <>
      <Header />

      <main className="bg-[#070B15] pt-32">
        <TeachingGuideHero guide={guide} />

        <div className="mx-auto max-w-7xl px-4 py-16 sm:px-6 lg:px-8">
          <TeachingGuideIntroduction guide={guide} />

          <TeachingGuideSections guide={guide} />

          {relatedGuides.length > 0 && (
            <section className="mt-24">
              <h2 className="mb-10 text-3xl font-bold text-white">
                Related Guides
              </h2>

              <TeachingCenterGrid guides={relatedGuides} locale={locale} />
            </section>
          )}
        </div>
      </main>

      <Footer locale={locale} />
    </>
  );
}
