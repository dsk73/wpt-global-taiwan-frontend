// src/app/[locale]/legal/privacy-policy/page.tsx

import type { Metadata } from "next";
import { ArrowLeft, FileText } from "lucide-react";
import Link from "next/link";

import { Footer } from "@/features/footer";

import type { Locale } from "@/providers";

import LegalContent from "./LegalContent";

import * as privacyEnModule from "./privacy-en";
import * as privacyZhModule from "./privacy-zh";
import * as privacyMsModule from "./privacy-ms";

import {
  buildCanonical,
  buildLanguageAlternates,
  buildPageTitle,
  createMetadata,
  getOpenGraphLocale,
} from "@/lib/metadata";

/* ============================================================
   Page Props
============================================================ */

interface PageProps {
  params: Promise<{
    locale: string;
  }>;
}

/* ============================================================
   Content Helper
============================================================ */

/*
 * Supports either:
 *
 * export default privacyEn
 *
 * OR
 *
 * export const privacyEn = ...
 *
 * This keeps the page independent from one specific
 * export style in the locale content modules.
 */

function getModuleContent(module: Record<string, unknown>): string {
  const defaultExport = module.default;

  if (typeof defaultExport === "string") {
    return defaultExport;
  }

  const stringExport = Object.values(module).find(
    (value) => typeof value === "string",
  );

  if (typeof stringExport === "string") {
    return stringExport;
  }

  return "";
}

/* ============================================================
   Content
============================================================ */

const privacyContent = {
  en: getModuleContent(privacyEnModule as Record<string, unknown>),

  zh: getModuleContent(privacyZhModule as Record<string, unknown>),

  ms: getModuleContent(privacyMsModule as Record<string, unknown>),
};

/* ============================================================
   Page Text
============================================================ */

const pageText: Record<
  Locale,
  {
    title: string;
    description: string;
    keywords: string[];
    lastUpdated: string;
    back: string;
    legal: string;
  }
> = {
  en: {
    title: "Privacy Policy",

    description:
      "Read the WPT Global Privacy Policy to learn how we collect, use, protect and manage your personal information.",

    keywords: [
      "WPT Global",
      "WPT Global Taiwan",
      "WPT Global Privacy Policy",
      "WPT Global privacy",
      "WPT Global personal information",
      "WPT Global data protection",
      "poker privacy policy",
      "online poker privacy",
    ],

    lastUpdated: "Last Updated: February 18, 2022",

    back: "Back",

    legal: "Legal",
  },

  "zh-Hant-TW": {
    title: "隱私權政策",

    description:
      "查看 WPT Global 隱私權政策，了解我們如何收集、使用、保護及管理您的個人資料。",

    keywords: [
      "WPT Global",
      "WPT Global Taiwan",
      "WPT Global 隱私權政策",
      "WPT Global 隱私",
      "WPT Global 個人資料",
      "WPT Global 資料保護",
      "撲克隱私權政策",
      "線上撲克隱私",
    ],

    lastUpdated: "最後更新：2022年2月18日",

    back: "返回",

    legal: "法律",
  },

  "ms-MY": {
    title: "Dasar Privasi",

    description:
      "Baca Dasar Privasi WPT Global untuk mengetahui cara kami mengumpul, menggunakan, melindungi dan mengurus maklumat peribadi anda.",

    keywords: [
      "WPT Global",
      "WPT Global Taiwan",
      "Dasar Privasi WPT Global",
      "privasi WPT Global",
      "maklumat peribadi WPT Global",
      "perlindungan data WPT Global",
      "dasar privasi poker",
      "privasi poker dalam talian",
    ],

    lastUpdated: "Kemas Kini Terakhir: 18 Februari 2022",

    back: "Kembali",

    legal: "Undang-undang",
  },
};

/* ============================================================
   Locale Resolver
============================================================ */

function resolveLocale(locale: string): Locale {
  if (
    locale === "zh-Hant-TW" ||
    locale === "zh-TW" ||
    locale === "zh" ||
    locale.startsWith("zh")
  ) {
    return "zh-Hant-TW";
  }

  if (locale === "ms-MY" || locale === "ms" || locale.startsWith("ms")) {
    return "ms-MY";
  }

  return "en";
}

/* ============================================================
   Content Language Resolver
============================================================ */

function getContentLanguage(locale: Locale): "en" | "zh" | "ms" {
  if (locale === "zh-Hant-TW") {
    return "zh";
  }

  if (locale === "ms-MY") {
    return "ms";
  }

  return "en";
}

/* ============================================================
   Metadata
============================================================ */

export async function generateMetadata({
  params,
}: PageProps): Promise<Metadata> {
  const { locale } = await params;

  const language = resolveLocale(locale);

  const text = pageText[language];

  /*
   * Canonical points to the normalized localized URL.
   *
   * Examples:
   *
   * /en/legal/privacy-policy
   * /zh-Hant-TW/legal/privacy-policy
   * /ms-MY/legal/privacy-policy
   */

  const canonical = buildCanonical(language, "/legal/privacy-policy");

  /*
   * Build localized hreflang alternates for the same
   * Privacy Policy page.
   */

  const languages = buildLanguageAlternates("/legal/privacy-policy");

  return createMetadata({
    title: buildPageTitle(text.title),

    description: text.description,

    keywords: text.keywords,

    canonical,

    locale: getOpenGraphLocale(language),

    alternates: {
      canonical,
      languages,
    },
  });
}

/* ============================================================
   Page
============================================================ */

export default async function PrivacyPolicyPage({ params }: PageProps) {
  const { locale } = await params;

  const language = resolveLocale(locale);

  const text = pageText[language];

  const contentLanguage = getContentLanguage(language);

  const content = privacyContent[contentLanguage];

  /* ==========================================================
     Safety fallback
  ========================================================== */

  if (!content) {
    console.error(`Privacy Policy content is missing for locale: ${locale}`);
  }

  /* ==========================================================
     Back URL
  ========================================================== */

  const backHref = `/${locale}`;

  return (
    <>
      <main className="min-h-screen bg-[#050505] text-white">
        {/* ======================================================
            PAGE HEADER
        ====================================================== */}

        <section
          className="
            border-b
            border-white/10
            bg-[#07090d]
          "
        >
          <div
            className="
              mx-auto
              w-full
              max-w-375
              px-5

              pt-12
              pb-7

              sm:px-8
              sm:pt-14
              sm:pb-8

              lg:px-10
              lg:pt-16
              lg:pb-9

              xl:px-12
            "
          >
            {/* ==================================================
                BACK + LEGAL
            ================================================== */}

            <div
              className="
                flex
                items-center
                justify-between
                gap-6
              "
            >
              {/* ==================================================
                  BACK
              ================================================== */}

              <Link
                href={backHref}
                className="
                  group
                  inline-flex
                  items-center
                  gap-2
                  text-sm
                  font-medium
                  text-white/70
                  transition-colors
                  duration-200
                  hover:text-white
                "
              >
                <ArrowLeft
                  className="
                    h-4
                    w-4
                    transition-transform
                    duration-200
                    group-hover:-translate-x-1
                  "
                />

                <span>{text.back}</span>
              </Link>

              {/* ==================================================
                  LEGAL
              ================================================== */}

              <div
                className="
                  flex
                  items-center
                  gap-3
                "
              >
                <div
                  className="
                    flex
                    h-10
                    w-10
                    shrink-0
                    items-center
                    justify-center
                    rounded-lg
                    border
                    border-blue-500/30
                    bg-blue-500/10
                  "
                >
                  <FileText
                    className="
                      h-4
                      w-4
                      text-blue-400
                    "
                  />
                </div>

                <span
                  className="
                    text-[11px]
                    font-semibold
                    uppercase
                    tracking-[0.28em]
                    text-blue-400
                  "
                >
                  {text.legal}
                </span>
              </div>
            </div>

            {/* ==================================================
                PAGE TITLE
            ================================================== */}

            <div
              className="
                mt-2

                sm:mt-2

                lg:mt-4
              "
            >
              <h1
                className="
                  m-0
                  text-3xl
                  font-bold
                  leading-tight
                  tracking-tight
                  text-white

                  sm:text-4xl

                  md:text-5xl
                "
              >
                {text.title}
              </h1>

              <p
                className="
                  m-0
                  mt-2
                  text-sm
                  leading-6
                  text-white/50

                  sm:text-base
                "
              >
                {text.lastUpdated}
              </p>
            </div>
          </div>
        </section>

        {/* ======================================================
            LEGAL CONTENT

            Reduced gap between header and content.
        ====================================================== */}

        <div className="-mt-10">
          <LegalContent content={content} />
        </div>
      </main>

      {/* ======================================================
          FOOTER
      ====================================================== */}

      <Footer locale={language} />
    </>
  );
}
