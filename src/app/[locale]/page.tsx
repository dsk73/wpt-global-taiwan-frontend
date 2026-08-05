//src/app/[locale]/page.tsx
import Hero from "@/features/hero/components/Hero";
import Ambassadors from "@/features/ambassadors/components/Ambassadors";
import Payment from "@/features/payment/components/Payment";
import Activities from "@/features/activities/components/Activities";
import { FAQHeader, FAQSection } from "@/features/faq";
import Footer from "@/features/footer/components/Footer";
import FloatingLineButton from "@/features/floating-line/components/FloatingLineButton";

import { getHeroSlides } from "@/services/hero.service";
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

  const [slides, ambassadors, payments, activitiesData, faqs] =
    await Promise.all([
      getHeroSlides(locale),
      getBrandAmbassadors(locale),
      getPaymentMethods(locale),
      getHomepageActivities(locale),
      fetchFAQs(locale),
    ]);

  return (
    <>
      <Hero slides={slides} />

	<main>
	<Ambassadors ambassadors={ambassadors} locale={locale} />
        <Payment payments={payments} locale={locale} />

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
	 </section>{" "}
        </main>

      <Footer locale={locale} />
      <FloatingLineButton />  
    </>
  );
}
