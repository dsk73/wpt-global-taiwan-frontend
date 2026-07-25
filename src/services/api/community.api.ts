import type { Community } from "@/types/community";

import { fetcher } from "@/lib/fetcher";

export async function getCommunities(
  locale: string,
): Promise<Community[]> {
  return fetcher.getCollection<Community>(
    `/communities?locale=${encodeURIComponent(
      locale,
    )}&sort[0]=PublishedDate:desc&populate=*`,
  );
}

export async function getCommunityBySlug(
  locale: string,
  slug: string,
): Promise<Community | null> {
  const communities =
    await fetcher.getCollection<Community>(
      `/communities?locale=${encodeURIComponent(
        locale,
      )}&filters[Slug][$eq]=${encodeURIComponent(
        slug,
      )}&populate=*`,
    );

  return communities[0] ?? null;
}