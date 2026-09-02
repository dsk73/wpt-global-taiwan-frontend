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

/**
 * SEO metadata is focused on the client's priority WPT/WPTG
 * brand terms together with FAQ and player-support search
 * intent relevant to this page.
 *
 * Primary brand intent:
 * - WPT Global Taiwan
 * - WPTG Taiwan
 * - WPT Global
 * - WPTG
 *
 * Supporting FAQ intent:
 * - WPT Global FAQ
 * - WPTG FAQ
 * - WPT Global payments
 * - WPT Global withdrawal
 * - WPT Global KYC
 * - WPT Global promotions
 * - WPT Global account
 * - WPT Global registration
 */
const FAQ_SEO: Record<
  Locale,
  {
    title: string;
    description: string;
    keywords: string[];
  }
> = {
  "zh-Hant-TW": {
    title: "WPT Global Taiwan｜WPTG 常見問題",
    description:
      "查看 WPT Global Taiwan｜WPTG 常見問題與解答，了解 WPT Global 付款、提款、KYC、優惠、帳戶、註冊及玩家支援等資訊。",
    keywords: [
      "WPT Global Taiwan",
      "WPTG Taiwan",
      "WPT Global",
      "WPTG",
      "WPT Global FAQ",
      "WPTG FAQ",
      "WPT Global 常見問題",
      "WPTG 常見問題",
      "WPT Global 付款",
      "WPT Global 提款",
      "WPT Global KYC",
      "WPT Global 優惠",
      "WPT Global 帳戶",
      "WPT Global 註冊",
      "WPTG 註冊",
      "WPT Global 玩家支援",
      "撲克常見問題",
    ],
  },

  en: {
    title: "WPT Global Taiwan | WPTG Frequently Asked Questions",
    description:
      "Find answers to frequently asked questions about WPT Global Taiwan | WPTG, including WPT Global payments, withdrawals, KYC, promotions, accounts, registration and player support.",
    keywords: [
      "WPT Global Taiwan",
      "WPTG Taiwan",
      "WPT Global",
      "WPTG",
      "WPT Global FAQ",
      "WPTG FAQ",
      "WPT Global Taiwan FAQ",
      "WPTG Taiwan FAQ",
      "WPT Global payments",
      "WPT Global withdrawal",
      "WPT Global KYC",
      "WPT Global promotions",
      "WPT Global account",
      "WPT Global registration",
      "WPTG registration",
      "WPT Global player support",
      "poker FAQ",
    ],
  },

  "ms-MY": {
    title: "WPT Global Taiwan | Soalan Lazim WPTG",
    description:
      "Cari jawapan kepada soalan lazim mengenai WPT Global Taiwan | WPTG, termasuk pembayaran, pengeluaran, KYC, promosi, akaun, pendaftaran dan sokongan pemain WPT Global.",
    keywords: [
      "WPT Global Taiwan",
      "WPTG Taiwan",
      "WPT Global",
      "WPTG",
      "WPT Global FAQ",
      "WPTG FAQ",
      "FAQ WPT Global Taiwan",
      "FAQ WPTG Taiwan",
      "pembayaran WPT Global",
      "pengeluaran WPT Global",
      "KYC WPT Global",
      "promosi WPT Global",
      "akaun WPT Global",
      "pendaftaran WPT Global",
      "pendaftaran WPTG",
      "sokongan pemain WPT Global",
      "soalan lazim poker",
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
