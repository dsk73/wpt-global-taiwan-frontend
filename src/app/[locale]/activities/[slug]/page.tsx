import type { Metadata } from "next";
import { notFound } from "next/navigation";

import Header from "@/features/header/components/Header";
import { Footer } from "@/features/footer";

import ActivityHero from "@/features/activity-detail/components/ActivityHero";
import ActivityContent from "@/features/activity-detail/components/ActivityContent";
import ActivityGallery from "@/features/activity-detail/components/ActivityGallery";
import RelatedActivities from "@/features/activity-detail/components/RelatedActivities";

import {
  getActivity,
  getRelatedActivities,
  getActivitySlugs,
} from "@/services/activities.service";

import type { Locale } from "@/providers";

interface ActivityPageProps {
  params: Promise<{
    locale: Locale;
    slug: string;
  }>;
}

export async function generateMetadata({
  params,
}: ActivityPageProps): Promise<Metadata> {
  const { locale, slug } = await params;

  const activity = await getActivity(locale, slug);

  if (!activity) {
    return {
      title: "Activity Not Found",
    };
  }

  const image = activity.BannerImage?.url ?? activity.Thumbnail?.url;

  return {
    title: activity.SEO?.MetaTitle ?? activity.Title,

    description: activity.SEO?.MetaDescription ?? activity.Summary,

    keywords: activity.SEO?.Keywords,

    robots: activity.SEO?.Robots,

    alternates: {
      canonical:
        activity.SEO?.CanonicalURL ||
        `https://wptglobal.com.tw/${locale}/activities/${activity.Slug}`,
    },

    openGraph: {
      title: activity.SEO?.MetaTitle ?? activity.Title,

      description: activity.SEO?.MetaDescription ?? activity.Summary,

      type: "article",

      publishedTime: activity.PublishDate,

      locale,

      images: image
        ? [
            {
              url: image,
              alt: activity.Title,
            },
          ]
        : [],
    },

    twitter: {
      card: "summary_large_image",

      title: activity.SEO?.MetaTitle ?? activity.Title,

      description: activity.SEO?.MetaDescription ?? activity.Summary,

      images: image ? [image] : [],
    },
  };
}

export async function generateStaticParams() {
  const locales: Locale[] = ["zh-Hant-TW", "en", "ms-MY"];

  const params = await Promise.all(
    locales.map(async (locale) => {
      const slugs = await getActivitySlugs(locale);

      return slugs.map((slug) => ({
        locale,
        slug,
      }));
    }),
  );

  return params.flat();
}

export default async function ActivityPage({ params }: ActivityPageProps) {
  const { locale, slug } = await params;

  const activity = await getActivity(locale, slug);

  if (!activity) {
    notFound();
  }

  const relatedActivities = await getRelatedActivities(
    locale,
    activity.documentId,
  );

  return (
    <>
      <Header />

      <main className="min-h-screen bg-[#070B15]">
        <ActivityHero activity={activity} locale={locale} />

        <section className="mx-auto max-w-7xl px-4 py-20 sm:px-6 lg:px-8">
          <ActivityContent content={activity.Content} />

          <ActivityGallery
            gallery={activity.Gallery}
            locale={locale}
            className="mt-24"
          />

          <RelatedActivities activities={relatedActivities} locale={locale} />
        </section>
      </main>

      <Footer locale={locale} />
    </>
  );
}
