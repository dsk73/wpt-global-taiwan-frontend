//src/app/[locale]/community/[slug]/page.tsx
import type { Metadata } from "next";
import { notFound } from "next/navigation";

import { Header } from "@/features/header";
import { Footer } from "@/features/footer";
import type { Locale } from "@/providers";

import {
  DetailHero,
  DetailContent,
  DetailGallery,
  RelatedContent,
} from "@/features/content-detail";

import CommunityGrid from "@/features/community/components/CommunityGrid";

import {
  getCommunity,
  getRelatedCommunities,
  getCommunitySlugs,
} from "@/services/community.service";

import { buildCanonical, buildPageTitle, createMetadata } from "@/lib/metadata";

interface CommunityDetailPageProps {
  params: Promise<{
    locale: Locale;
    slug: string;
  }>;
}

export async function generateStaticParams() {
  return getCommunitySlugs();
}

export async function generateMetadata({
  params,
}: CommunityDetailPageProps): Promise<Metadata> {
  const { locale, slug } = await params;

  const community = await getCommunity(locale, slug);

  if (!community) {
    return {};
  }

  return createMetadata({
    title: buildPageTitle(community.Title),
    description: community.Summary ?? "",
    canonical: buildCanonical(locale, `/community/${slug}`),
    locale,
    type: "article",
  });
}

export default async function CommunityDetailPage({
  params,
}: CommunityDetailPageProps) {
  const { locale, slug } = await params;

  const community = await getCommunity(locale, slug);

  if (!community) {
    notFound();
  }

  const relatedCommunities = await getRelatedCommunities(
    locale,
    community.documentId,
    community.Category?.documentId,
  );

  return (
    <>
      <Header />
      <main className="bg-[#070B15] pb-24">
        <DetailHero
          data={{
            title: community.Title,
            summary: community.Summary,

            bannerImage: community.BannerImage,
            thumbnail: community.Thumbnail,

            publishDate: community.PublishedDate,
            readingTime: community.ReadingTime,

            tags: community.Tags,

            locale,

            breadcrumbs: [
              {
                label: "Home",
                href: `/${locale}`,
              },
              {
                label: "Community",
                href: `/${locale}/community`,
              },
              {
                label: community.Title,
              },
            ],
          }}
        />

        <section className="mx-auto mt-20 max-w-7xl px-4 sm:px-6 lg:px-8">
          <DetailContent
            data={{
              content: community.Content,
            }}
          />

          <DetailGallery
            data={{
              images: community.Gallery,
            }}
          />
          <RelatedContent
            locale={locale}
            data={{
              title: "Related Communities",
              subtitle: "Discover more community stories and updates.",
              children: (
                <CommunityGrid
                  communities={relatedCommunities}
                  locale={locale}
                />
              ),
            }}
          />
        </section>
      </main>

      <Footer locale={locale} />
    </>
  );
}
