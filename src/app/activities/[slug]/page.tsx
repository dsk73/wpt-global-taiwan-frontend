// src/app/activities/[slug]/page.tsx

import { permanentRedirect } from "next/navigation";

interface ActivityRedirectPageProps {
  params: Promise<{
    slug: string;
  }>;
}

const LEGACY_ACTIVITY_REDIRECTS: Record<string, string> = {
  "community-poker-festival-2026":
    "/zh-Hant-TW/activities/community-poker-festival-2026",
};

export default async function ActivityRedirectPage({
  params,
}: ActivityRedirectPageProps) {
  const { slug } = await params;

  const redirectUrl = LEGACY_ACTIVITY_REDIRECTS[slug];

  if (redirectUrl) {
    permanentRedirect(redirectUrl);
  }

  permanentRedirect("/zh-Hant-TW");
}
