// src/app/[locale]/faq/page.tsx

import type { Metadata } from "next";
import { notFound } from "next/navigation";

import Footer from "@/features/footer/components/Footer";
import { FAQHero, FAQPage } from "@/features/faq";

import { fetchFAQs } from "@/services";

import type { Locale } from "@/providers";

import { isValidLocale } from "@/config/languages";

import {
  buildCanonical,
  buildLanguageAlternates,
  buildPageTitle,
  createMetadata,
  getOpenGraphLocale,
} from "@/lib/metadata";

/* ============================================================
   Props
============================================================ */

interface FAQPageProps {
  params: Promise<{
    locale: Locale;
  }>;
}

/* ============================================================
   SEO
============================================================ */

const FAQ_SEO: Record<
  Locale,
  {
    title: string;
    description: string;
    keywords: string[];
  }
> = {
  "zh-Hant-TW": {
    title: "常見問題",
    description:
      "查看有關 WPT Global Taiwan、付款方式、提款、KYC、優惠活動、帳戶及更多資訊的常見問題與解答。",
    keywords: [
      "WPT Global Taiwan",
      "WPT Global 常見問題",
      "WPTG 常見問題",
      "WPT Global FAQ",
      "撲克常見問題",
      "WPT Global 付款",
      "WPT Global KYC",
      "WPT Global 優惠",
    ],
  },

  en: {
    title: "Frequently Asked Questions",
    description:
      "Find answers to frequently asked questions about WPT Global Taiwan, payments, withdrawals, KYC, promotions, accounts and more.",
    keywords: [
      "WPT Global Taiwan",
      "WPT Global FAQ",
      "WPTG FAQ",
      "poker FAQ",
      "WPT Global payments",
      "WPT Global KYC",
      "WPT Global promotions",
      "WPT Global account",
    ],
  },

  "ms-MY": {
    title: "Soalan Lazim",
    description:
      "Cari jawapan kepada soalan lazim mengenai WPT Global Taiwan, pembayaran, pengeluaran, KYC, promosi, akaun dan banyak lagi.",
    keywords: [
      "WPT Global Taiwan",
      "WPT Global FAQ",
      "FAQ WPTG",
      "soalan lazim poker",
      "pembayaran WPT Global",
      "KYC WPT Global",
      "promosi WPT Global",
      "akaun WPT Global",
    ],
  },
};

/* ============================================================
   Metadata
============================================================ */

export async function generateMetadata({
  params,
}: FAQPageProps): Promise<Metadata> {
  const { locale } = await params;

  if (!isValidLocale(locale)) {
    notFound();
  }

  const seo = FAQ_SEO[locale];

  const canonical = buildCanonical(locale, "/faq");

  const languages = buildLanguageAlternates("/faq");

  return createMetadata({
    title: buildPageTitle(seo.title),

    description: seo.description,

    keywords: seo.keywords,

    canonical,

    locale: getOpenGraphLocale(locale),

    alternates: {
      canonical,
      languages,
    },
  });
}

/* ============================================================
   Page
============================================================ */

export default async function FAQPageRoute({ params }: FAQPageProps) {
  const { locale } = await params;

  if (!isValidLocale(locale)) {
    notFound();
  }

  const groupedFAQs = await fetchFAQs(locale);

  if (!groupedFAQs) {
    notFound();
  }

  return (
    <>
      <main className="min-h-screen bg-[#070B15]">
        <FAQHero
          title={
            locale === "zh-Hant-TW"
              ? "常見問題"
              : locale === "ms-MY"
                ? "Soalan Lazim"
                : "Frequently Asked Questions"
          }
          subtitle={
            locale === "zh-Hant-TW"
              ? "快速找到有關 WPT Global Taiwan、付款、提款、KYC、優惠活動及更多資訊的解答。"
              : locale === "ms-MY"
                ? "Cari jawapan kepada soalan lazim mengenai WPT Global Taiwan."
                : "Find answers to the most frequently asked questions about WPT Global Taiwan."
          }
        />

        <FAQPage locale={locale} groupedFAQs={groupedFAQs} />
      </main>

      <Footer locale={locale} />
    </>
  );
}
