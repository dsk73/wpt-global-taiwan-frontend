import type { Metadata } from "next";

import Footer from "@/features/footer/components/Footer";
import {
  DownloadButtons,
  DownloadContent,
  DownloadHero,
  DownloadQR,
} from "@/features/download";
import { fetchDownloadPage } from "@/services";

import type { Locale } from "@/providers";

interface DownloadPageProps {
  params: Promise<{
    locale: Locale;
  }>;
}

export async function generateMetadata({
  params,
}: DownloadPageProps): Promise<Metadata> {
  const { locale } = await params;
  const download = await fetchDownloadPage(locale);

  return {
    title: download.SEO?.MetaTitle || download.Title,
    description: download.SEO?.MetaDescription || undefined,
    keywords: download.SEO?.Keywords || undefined,
    alternates: download.SEO?.CanonicalURL
      ? {
          canonical: download.SEO.CanonicalURL,
        }
      : undefined,
    openGraph: {
      title: download.SEO?.MetaTitle || download.Title,
      description: download.SEO?.MetaDescription || undefined,
      images: download.SEO?.OGImage?.url
        ? [download.SEO.OGImage.url]
        : undefined,
    },
    robots: download.SEO?.Robots || undefined,
  };
}

export default async function DownloadPage({ params }: DownloadPageProps) {
  const { locale } = await params;

  const download = await fetchDownloadPage(locale);

  return (
    <>
      <main className="min-h-screen">
        <DownloadHero download={download} />

        <DownloadButtons download={download} />

        <DownloadContent download={download} />

        <DownloadQR />
      </main>

      <Footer locale={locale} />
    </>
  );
}
