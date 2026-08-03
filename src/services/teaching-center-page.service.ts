import { teachingCenterPageSchema } from "@/schemas/teaching-center.schema";
import { getTeachingCenterPage } from "@/services/api/teaching-center-page.api";

import type { Locale } from "@/providers";
import type { TeachingCenterPage } from "@/types/teaching-guide";

export async function fetchTeachingCenterPage(
  locale: Locale,
): Promise<TeachingCenterPage> {
  const data = await getTeachingCenterPage(locale);

  return teachingCenterPageSchema.parse(data);
}
