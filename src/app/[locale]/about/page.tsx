import ReactMarkdown from "react-markdown";

import Header from "@/features/header/components/Header";
import Footer from "@/features/footer/components/Footer";

import {
  AboutHero,
  MissionSection,
  VisionSection,
  CoreValuesSection,
} from "@/features/about";

import { fetchAboutPage } from "@/services";

import type { Locale } from "@/providers";

interface AboutPageProps {
  params: Promise<{
    locale: Locale;
  }>;
}

export default async function AboutPage({ params }: AboutPageProps) {
  const { locale } = await params;

  const about = await fetchAboutPage(locale);

  return (
    <>
      <Header />
      <main>
        <AboutHero about={about} />

        {about.Content?.trim() && (
          <section className="py-16 md:py-20">
            <div className="container mx-auto max-w-5xl px-4">
              <div className="prose prose-lg max-w-none dark:prose-invert">
                <ReactMarkdown>{about.Content}</ReactMarkdown>
              </div>
            </div>
          </section>
        )}

        <MissionSection about={about} />

        <VisionSection about={about} />

        <CoreValuesSection about={about} />
      </main>

      <Footer locale={locale} />
    </>
  );
}
