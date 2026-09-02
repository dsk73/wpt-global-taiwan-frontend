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
  buildPageTitle,
  buildSEOImageUrl,
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
  /* ----------------------------------------------------------
     Traditional Chinese
  ---------------------------------------------------------- */

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
      "撲克賽事",
    ],
  },

  /* ----------------------------------------------------------
     English
  ---------------------------------------------------------- */

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
      "poker tournaments",
    ],
  },

  /* ----------------------------------------------------------
     Malay
  ---------------------------------------------------------- */

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
      "kejohanan poker",
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

  /* ----------------------------------------------------------
     Validate locale
  ---------------------------------------------------------- */

  if (!isValidLocale(locale)) {
    notFound();
  }

  /* ----------------------------------------------------------
     Fetch CMS Register Page
  ---------------------------------------------------------- */

  const register = await fetchRegisterPage(locale);

  /* ----------------------------------------------------------
     Static localized fallback
  ---------------------------------------------------------- */

  const fallback = REGISTER_SEO[locale];

  /* ----------------------------------------------------------
     CMS SEO
  ---------------------------------------------------------- */

  const seo = register?.SEO;

  /* ----------------------------------------------------------
     Title
     
     CMS MetaTitle takes priority.
     Static localized title is the fallback.
  ---------------------------------------------------------- */

  const title = seo?.MetaTitle?.trim() || fallback.title;

  /* ----------------------------------------------------------
     Description
     
     CMS MetaDescription takes priority.
     Static localized description is the fallback.
  ---------------------------------------------------------- */

  const description = seo?.MetaDescription?.trim() || fallback.description;

  /* ----------------------------------------------------------
     Keywords
     
     CMS keywords are stored as a comma-separated string.
     Static localized keywords are used when CMS keywords
     are not available.
  ---------------------------------------------------------- */

  const keywords = seo?.Keywords
    ? seo.Keywords.split(",")
        .map((keyword) => keyword.trim())
        .filter(Boolean)
    : fallback.keywords;

  /* ----------------------------------------------------------
     Canonical URL
     
     CMS CanonicalURL takes priority.
     Generated localized canonical is the fallback.
  ---------------------------------------------------------- */

  const canonical =
    seo?.CanonicalURL?.trim() || buildCanonical(locale, "/register");

  /* ----------------------------------------------------------
     Hreflang / Language Alternates
  ---------------------------------------------------------- */

  const languages = buildLanguageAlternates("/register");

  /* ----------------------------------------------------------
     Open Graph Image
     
     Only generate an image URL when the CMS provides
     an OG image.
  ---------------------------------------------------------- */

  const image = seo?.OGImage?.url
    ? buildSEOImageUrl(seo.OGImage.url)
    : undefined;

  /* ----------------------------------------------------------
     Metadata
  ---------------------------------------------------------- */

  return createMetadata({
    /*
     * If the CMS title already contains the brand name,
     * don't append it again.
     */
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

  /* ----------------------------------------------------------
     Validate locale
  ---------------------------------------------------------- */

  if (!isValidLocale(locale)) {
    notFound();
  }

  /* ----------------------------------------------------------
     Fetch Register Page Content
  ---------------------------------------------------------- */

  const register = await fetchRegisterPage(locale);

  /* ----------------------------------------------------------
     Missing CMS content
  ---------------------------------------------------------- */

  if (!register) {
    notFound();
  }

  return (
    <>
      {/* ======================================================
          HEADER
      ====================================================== */}

      <Header />

      {/* ======================================================
          MAIN CONTENT
      ====================================================== */}

      <main className="min-h-screen">
        {/* ------------------------------------------------------
            Register Hero
        ------------------------------------------------------ */}

        <RegisterHero register={register} />

        {/* ------------------------------------------------------
            Register Content
        ------------------------------------------------------ */}

        <RegisterContent register={register} />

        {/* ------------------------------------------------------
            Register Steps
        ------------------------------------------------------ */}

        <RegisterSteps register={register} />
      </main>

      {/* ======================================================
          FOOTER
      ====================================================== */}

      <Footer locale={locale} />
    </>
  );
}
