import { Footer } from "@/features/footer";
import {
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

  return (
    <>
      <main className="min-h-screen bg-[#070B15] pt-32">
        {/* -------------------------------------------------------
         * Hero
         * ----------------------------------------------------- */}

        {page && <TeachingCenterHero page={page} />}

        {/* -------------------------------------------------------
         * Teaching Guides
         * ----------------------------------------------------- */}

        <section className="mx-auto max-w-7xl px-4 py-20 sm:px-6 lg:px-8">
          {page?.GuideSectionTitle && (
            <div className="mb-12 text-center">
              <h2 className="text-4xl font-bold text-white md:text-5xl">
                {page.GuideSectionTitle}
              </h2>

              {page.GuideSectionDescription && (
                <div
                  className="
                    prose
                    prose-invert
                    mx-auto
                    mt-5
                    max-w-3xl
                    text-lg
                    leading-8
                    text-white/70
                  "
                  dangerouslySetInnerHTML={{
                    __html: page.GuideSectionDescription,
                  }}
                />
              )}
            </div>
          )}

          {guides.length > 0 ? (
            <TeachingCenterGrid guides={guides} locale={locale} />
          ) : (
            <div className="rounded-3xl border border-white/10 bg-white/5 p-12 text-center">
              <p className="text-lg text-white/60">
                No teaching guides are currently available.
              </p>
            </div>
          )}
        </section>
      </main>

      <Footer locale={locale} />
    </>
  );
}
