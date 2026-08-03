//src/app/[locale]/community/page.tsx

import { notFound } from "next/navigation";

import CommunityFooterText from "@/features/community/components/CommunityFooterText";
import CommunityHero from "@/features/community/components/CommunityHero";
import CommunityLineCTA from "@/features/community/components/CommunityLineCTA";
import CommunitySocialGrid from "@/features/community/components/CommunitySocialGrid";

import { Footer } from "@/features/footer";

import { getCommunityPage } from "@/services/community-page.service";

import type { Locale } from "@/providers";

interface CommunityPageProps {
  params: Promise<{
    locale: Locale;
  }>;
}

export default async function CommunityPage({ params }: CommunityPageProps) {
  const { locale } = await params;

  const page = await getCommunityPage(locale);

  if (!page) {
    notFound();
  }

  const featuredSocial =
    page.SocialLink.find((social) => social.DisplayOrder === 1) ?? null;

  const remainingSocialLinks = page.SocialLink.filter(
    (social) => social.DisplayOrder !== 1,
  );

  return (
    <>
      <main className="bg-background pt-32">
        <CommunityHero page={page} />

        {featuredSocial && <CommunityLineCTA social={featuredSocial} />}

        <CommunitySocialGrid socialLinks={remainingSocialLinks} />

        <CommunityFooterText content={page.BottomDescription} />
      </main>

      <Footer locale={locale} />
    </>
  );
}
