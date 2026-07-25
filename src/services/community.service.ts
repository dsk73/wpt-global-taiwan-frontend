import {
  getCommunities,
  getCommunityBySlug,
} from "./api/community.api";

import type { Locale } from "@/providers";
import type { Community } from "@/types/community";
import type { Media } from "@/types/media";

function normalizeMedia(media?: Media | null): Media | null {
  if (!media) {
    return null;
  }

  const baseUrl =
    process.env.NEXT_PUBLIC_STRAPI_URL?.replace(/\/$/, "") ?? "";

  return {
    ...media,
    url: media.url.startsWith("http")
      ? media.url
      : `${baseUrl}${media.url}`,
  };
}

function normalizeCommunity(
  community: Community,
): Community {
  return {
    ...community,

    Thumbnail: normalizeMedia(community.Thumbnail),

    BannerImage: normalizeMedia(community.BannerImage),

    Gallery:
      community.Gallery?.map(
        (image) => normalizeMedia(image)!,
      ) ?? [],
  };
}

export async function getHomepageCommunities(
  locale: Locale,
): Promise<Community[]> {
  const communities = await getCommunities(locale);

  return communities
    .filter((community) => community.Featured)
    .map(normalizeCommunity);
}

export async function getAllCommunities(
  locale: Locale,
): Promise<Community[]> {
  const communities = await getCommunities(locale);

  return communities.map(normalizeCommunity);
}

export async function getCommunity(
  locale: Locale,
  slug: string,
): Promise<Community | null> {
  const community = await getCommunityBySlug(
    locale,
    slug,
  );

  if (!community) {
    return null;
  }

  return normalizeCommunity(community);
}

export async function getRelatedCommunities(
  locale: Locale,
  currentDocumentId: string,
  categoryDocumentId?: string,
  limit = 3,
): Promise<Community[]> {
  const communities = await getCommunities(locale);

  const normalized = communities.map(normalizeCommunity);

  const related = normalized.filter((community) => {
    if (community.documentId === currentDocumentId) {
      return false;
    }

    if (!categoryDocumentId) {
      return true;
    }

    return (
      community.Category?.documentId ===
      categoryDocumentId
    );
  });

  return related.slice(0, limit);
}

export async function getCommunitySlugs(
  locale?: Locale,
): Promise<
  {
    locale: Locale;
    slug: string;
  }[]
> {
  const locales: Locale[] = locale
    ? [locale]
    : ["zh-Hant-TW", "en", "ms-MY"];

  const params: {
    locale: Locale;
    slug: string;
  }[] = [];

  for (const currentLocale of locales) {
    const communities =
      await getCommunities(currentLocale);

    communities.forEach((community) => {
      params.push({
        locale: currentLocale,
        slug: community.Slug,
      });
    });
  }

  return params;
}