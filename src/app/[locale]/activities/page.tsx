import { Header } from "@/features/header";
import { Footer } from "@/features/footer";
import FeaturedActivity from "@/features/activities/components/FeaturedActivity";
import ActivityGrid from "@/features/activities/components/ActivityGrid";

import { getAllActivities } from "@/services/activities.service";

import type { Locale } from "@/providers";

interface ActivitiesPageProps {
  params: Promise<{
    locale: Locale;
  }>;
}

const PAGE_TITLE: Record<Locale, string> = {
  "zh-Hant-TW": "最新活動",
  en: "Activities",
  "ms-MY": "Aktiviti",
};

const PAGE_DESCRIPTION: Record<Locale, string> = {
  "zh-Hant-TW": "掌握 WPT Global Taiwan 最新活動、優惠、公告與賽事資訊。",
  en: "Stay updated with the latest WPT Global Taiwan activities, promotions and announcements.",
  "ms-MY":
    "Ikuti perkembangan terkini mengenai aktiviti, promosi dan pengumuman WPT Global Taiwan.",
};

export default async function ActivitiesPage({ params }: ActivitiesPageProps) {
  const { locale } = await params;

  const activities = await getAllActivities(locale);

  const featured = activities.find((activity) => activity.Featured) ?? null;

  const latest = activities.filter(
    (activity) => activity.documentId !== featured?.documentId,
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
          {featured && <FeaturedActivity activity={featured} locale={locale} />}

          {latest.length > 0 && (
            <div className="mt-16">
              <ActivityGrid activities={latest} locale={locale} />
            </div>
          )}
        </section>
      </main>

      <Footer locale={locale} />
    </>
  );
}
