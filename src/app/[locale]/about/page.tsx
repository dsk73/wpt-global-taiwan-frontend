// src/app/[locale]/about/page.tsx

import Footer from "@/features/footer/components/Footer";

import {
  AboutGlobalSection,
  AboutHero,
  AboutIntroduction,
  CoreValuesSection,
  MissionSection,
  VisionSection,
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
      <main>
        <AboutHero about={about} />

        <AboutIntroduction about={about} />

        <AboutGlobalSection about={about} />

        <MissionSection about={about} />

        <VisionSection about={about} />

        <CoreValuesSection about={about} />
      </main>

      <Footer locale={locale} />
    </>
  );
}
