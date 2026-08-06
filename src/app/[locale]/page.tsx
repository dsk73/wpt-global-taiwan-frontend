// src/app/[locale]/page.tsx

import Hero from "@/features/hero/components/Hero";
import Ambassadors from "@/features/ambassadors/components/Ambassadors";
import Activities from "@/features/activities/components/Activities";
import { FAQHeader, FAQSection } from "@/features/faq";
import Footer from "@/features/footer/components/Footer";
import FloatingLineButton from "@/features/floating-line/components/FloatingLineButton";

import { getHeroData } from "@/services/hero.service";
import { getBrandAmbassadors } from "@/services/ambassadors.service";
import { getPaymentMethods } from "@/services/payment.service";
import { getHomepageActivities } from "@/services/activities.service";
import { fetchFAQs } from "@/services";

import type { Locale } from "@/providers";

import { notFound } from "next/navigation";
import { isValidLocale } from "@/config/languages";

interface HomePageProps {
  params: Promise<{
    locale: Locale;
  }>;
}

export default async function HomePage({ params }: HomePageProps) {
  const { locale } = await params;

  if (!isValidLocale(locale)) {
    notFound();
  }

  const [hero, ambassadors, , activitiesData, faqs] = await Promise.all([
    getHeroData(locale),
    getBrandAmbassadors(locale),
    getPaymentMethods(locale),
    getHomepageActivities(locale),
    fetchFAQs(locale),
  ]);

  return (
    <>
      <Hero slides={hero.slides} promotionCard={hero.promotionCard} />

      <main>
        <Ambassadors ambassadors={ambassadors} locale={locale} />

        <Activities
          activities={[
            ...(activitiesData.featured ? [activitiesData.featured] : []),
            ...activitiesData.activities,
          ]}
          locale={locale}
        />

        <section className="py-14 lg:py-20">
          <FAQHeader locale={locale} />

          <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
            <FAQSection faqs={faqs} locale={locale} limit={5} />
          </div>
        </section>
      </main>

      <Footer locale={locale} />
      <FloatingLineButton />
    </>
  );
}
