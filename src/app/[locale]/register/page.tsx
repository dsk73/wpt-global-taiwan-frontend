// src/app/[locale]/register/page.tsx

import type { Metadata } from "next";
import { notFound } from "next/navigation";

import Footer from "@/features/footer/components/Footer";
import Header from "@/features/header/components/Header";

import {
  RegisterContent,
  RegisterHero,
  RegisterSteps,
} from "@/features/register";

import type { Locale } from "@/providers";

import { isValidLocale } from "@/config/languages";

import { fetchRegisterPage } from "@/services";

import {
  buildCanonical,
  buildLanguageAlternates,
  buildSEOImageUrl,
  buildPageTitle,
  createMetadata,
  getOpenGraphLocale,
} from "@/lib/metadata";

/* ============================================================
   Props
============================================================ */

interface RegisterPageProps {
  params: Promise<{
    locale: Locale;
  }>;
}

/* ============================================================
   PAGE SEO
============================================================ */

const REGISTER_SEO: Record<
  Locale,
  {
    title: string;
    description: string;
    keywords: string[];
  }
> = {
  "zh-Hant-TW": {
    title: "註冊 WPT Global Taiwan",
    description:
      "立即註冊 WPT Global Taiwan，加入全球撲克平台，開始遊玩線上撲克、參與賽事並享受玩家專屬活動。",
    keywords: [
      "WPT Global Taiwan",
      "WPT Global 註冊",
      "WPTG 註冊",
      "線上撲克註冊",
      "撲克平台",
      "德州撲克",
      "線上撲克",
    ],
  },

  en: {
    title: "Register | WPT Global Taiwan",
    description:
      "Register with WPT Global Taiwan and join a global poker platform to play online poker, enter tournaments and access player promotions.",
    keywords: [
      "WPT Global Taiwan",
      "WPT Global registration",
      "WPTG registration",
      "online poker registration",
      "poker platform",
      "Texas Hold'em",
      "online poker",
    ],
  },

  "ms-MY": {
    title: "Daftar WPT Global Taiwan",
    description:
      "Daftar dengan WPT Global Taiwan dan sertai platform poker global untuk bermain poker dalam talian, menyertai kejohanan dan menikmati promosi pemain.",
    keywords: [
      "WPT Global Taiwan",
      "pendaftaran WPT Global",
      "pendaftaran WPTG",
      "pendaftaran poker online",
      "platform poker",
      "Texas Hold'em",
      "poker online",
    ],
  },
};

/* ============================================================
   METADATA
============================================================ */

export async function generateMetadata({
  params,
}: RegisterPageProps): Promise<Metadata> {
  const { locale } = await params;

  if (!isValidLocale(locale)) {
    notFound();
  }

  const register = await fetchRegisterPage(locale);

  const seo = register?.SEO;

  /*
   * CMS SEO fields take priority.
   * Static localized SEO acts as the fallback.
   */
  const fallback = REGISTER_SEO[locale];

  const title = seo?.MetaTitle || fallback.title;

  const description = seo?.MetaDescription || fallback.description;

  const keywords = seo?.Keywords
    ? seo.Keywords.split(",")
        .map((keyword) => keyword.trim())
        .filter(Boolean)
    : fallback.keywords;

  const canonical = seo?.CanonicalURL || buildCanonical(locale, "/register");

  const languages = buildLanguageAlternates("/register");

  const image = buildSEOImageUrl(seo?.OGImage?.url);

  return createMetadata({
    title: title.includes("WPT Global Taiwan") ? title : buildPageTitle(title),

    description,

    keywords,

    robots: seo?.Robots ?? undefined,

    canonical,

    image,

    locale: getOpenGraphLocale(locale),

    alternates: {
      canonical,
      languages,
    },
  });
}

/* ============================================================
   PAGE
============================================================ */

export default async function RegisterPage({ params }: RegisterPageProps) {
  const { locale } = await params;

  if (!isValidLocale(locale)) {
    notFound();
  }

  const register = await fetchRegisterPage(locale);

  if (!register) {
    notFound();
  }

  return (
    <>
      <Header />

      <main className="min-h-screen">
        <RegisterHero register={register} />

        <RegisterContent register={register} />

        <RegisterSteps register={register} />
      </main>

      <Footer locale={locale} />
    </>
  );
}
