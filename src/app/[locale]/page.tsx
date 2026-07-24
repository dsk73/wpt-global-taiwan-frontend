import Hero from "@/features/hero/components/Hero";
import Ambassadors from "@/features/ambassadors/components/Ambassadors";
import Payment from "@/features/payment/components/Payment";
import Activities from "@/features/activities/components/Activities";
import Footer from "@/features/footer/components/Footer";

import { getHeroSlides } from "@/services/hero.service";
import { getBrandAmbassadors } from "@/services/ambassadors.service";
import { getPaymentMethods } from "@/services/payment.service";
import { getHomepageActivities } from "@/services/activities.service";

import type { Locale } from "@/providers";

interface HomePageProps {
  params: Promise<{
    locale: Locale;
  }>;
}

export default async function HomePage({ params }: HomePageProps) {
  const { locale } = await params;

  const [slides, ambassadors, payments, activitiesData] = await Promise.all([
    getHeroSlides(locale),
    getBrandAmbassadors(locale),
    getPaymentMethods(locale),
    getHomepageActivities(locale),
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
      </main>

      <Footer locale={locale} />
    </>
  );
}
