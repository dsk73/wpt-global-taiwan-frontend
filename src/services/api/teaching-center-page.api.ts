import { fetcher } from "@/lib/fetcher";
import { buildQuery } from "@/lib/query-builder";

const ENDPOINT = "/teaching-center-page";

export async function getTeachingCenterPage(locale: string) {
  const query = buildQuery({
    locale,
    populate: "*",
  });

  return fetcher.getSingle(`${ENDPOINT}?${query}`);
}
