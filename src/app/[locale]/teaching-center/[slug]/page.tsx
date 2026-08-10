import { notFound } from "next/navigation";

import { Footer } from "@/features/footer";

import {
  TeachingGuideHero,
  TeachingGuideSections,
} from "@/features/teaching-center-detail";

import { fetchTeachingGuide } from "@/services";

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

  return (
    <>
      <main className="min-h-screen bg-[#070B15] pt-32">
        {/* -------------------------------------------------------
         * Hero
         * ----------------------------------------------------- */}

        <TeachingGuideHero guide={guide} />

        {/* -------------------------------------------------------
         * Guide Sections
         * ----------------------------------------------------- */}

        <div className="mx-auto max-w-7xl px-4 py-16 sm:px-6 lg:px-8">
          <TeachingGuideSections guide={guide} />

          {/* -------------------------------------------------------
           * CTA
           * ----------------------------------------------------- */}

          {guide.CTA && (
            <section className="mt-20 border-t border-white/10 pt-12">
              <div
                className="
                  flex
                  flex-col
                  items-center
                  justify-between
                  gap-6
                  rounded-3xl
                  border
                  border-white/10
                  bg-white/5
                  px-6
                  py-8
                  sm:flex-row
                  sm:px-10
                "
              >
                <p className="text-center text-lg font-medium text-white sm:text-left">
                  Ready to get started?
                </p>

                <a
                  href={guide.CTA.URL}
                  target={guide.CTA.OpenInNewTab ? "_blank" : undefined}
                  rel={
                    guide.CTA.OpenInNewTab ? "noopener noreferrer" : undefined
                  }
                  className="
                    inline-flex
                    shrink-0
                    items-center
                    justify-center
                    rounded-xl
                    bg-(--primary)
                    px-7
                    py-3
                    font-semibold
                    text-black
                    transition-all
                    duration-300
                    hover:scale-105
                  "
                >
                  {guide.CTA.Label}
                </a>
              </div>
            </section>
          )}
        </div>
      </main>

      <Footer locale={locale} />
    </>
  );
}
