// src/app/[locale]/legal/cookie-policy/page.tsx

import type { Metadata } from "next";
import { ArrowLeft, FileText } from "lucide-react";
import Link from "next/link";

import { Footer } from "@/features/footer";

import type { Locale } from "@/providers";

import {
  buildCanonical,
  buildLanguageAlternates,
  buildPageTitle,
  createMetadata,
  getOpenGraphLocale,
} from "@/lib/metadata";

import LegalContent from "./LegalContent";

import * as cookieEnModule from "./cookie-en";
import * as cookieZhModule from "./cookie-zh";
import * as cookieMsModule from "./cookie-ms";

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

const cookieContent = {
  en: getModuleContent(cookieEnModule as Record<string, unknown>),

  zh: getModuleContent(cookieZhModule as Record<string, unknown>),

  ms: getModuleContent(cookieMsModule as Record<string, unknown>),
};

/* ============================================================
   Page Text
============================================================ */

const pageText = {
  en: {
    title: "Cookie Policy",

    description:
      "Learn how WPT Global uses cookies and similar technologies to operate, improve and personalize your website experience.",

    lastUpdated: "Last Updated: August 12, 2026",

    back: "Back",

    legal: "Legal",

    keywords: [
      "WPT Global Taiwan",
      "WPT Global Cookie Policy",
      "WPT Global cookies",
      "WPT Global privacy",
      "WPT Global website cookies",
      "WPT Global data privacy",
      "WPT Global Taiwan Cookie Policy",
    ],
  },

  zh: {
    title: "Cookie 政策",

    description:
      "了解 WPT Global 如何使用 Cookie 及類似技術，以運作、改善及個人化您的網站使用體驗。",

    lastUpdated: "最後更新：2026年8月12日",

    back: "返回",

    legal: "法律",

    keywords: [
      "WPT Global Taiwan",
      "WPT Global Cookie 政策",
      "WPT Global Cookie",
      "WPT Global 隱私",
      "WPT Global 網站 Cookie",
      "WPT Global 資料隱私",
      "WPT Global Taiwan Cookie 政策",
    ],
  },

  ms: {
    title: "Dasar Cookie",

    description:
      "Ketahui cara WPT Global menggunakan kuki dan teknologi serupa untuk mengendalikan, menambah baik dan memperibadikan pengalaman anda di laman web.",

    lastUpdated: "Kemas Kini Terakhir: 12 Ogos 2026",

    back: "Kembali",

    legal: "Undang-undang",

    keywords: [
      "WPT Global Taiwan",
      "Dasar Cookie WPT Global",
      "kuki WPT Global",
      "privasi WPT Global",
      "kuki laman web WPT Global",
      "privasi data WPT Global",
      "Dasar Cookie WPT Global Taiwan",
    ],
  },
};

/* ============================================================
   Locale Resolver
============================================================ */

function resolveLanguage(locale: string): "en" | "zh" | "ms" {
  if (
    locale === "zh-Hant-TW" ||
    locale === "zh-TW" ||
    locale.startsWith("zh")
  ) {
    return "zh";
  }

  if (locale === "ms-MY" || locale === "ms" || locale.startsWith("ms")) {
    return "ms";
  }

  return "en";
}

/* ============================================================
   Canonical Locale Resolver
============================================================ */

function resolveCanonicalLocale(locale: string): Locale {
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
   Metadata
============================================================ */

export async function generateMetadata({
  params,
}: PageProps): Promise<Metadata> {
  const { locale } = await params;

  const language = resolveLanguage(locale);

  const canonicalLocale = resolveCanonicalLocale(locale);

  const text = pageText[language];

  /*
   * -----------------------------------------------------------
   * Canonical
   * -----------------------------------------------------------
   *
   * Always use the normalized supported locale in canonical
   * URLs so that alternate locale aliases do not create
   * duplicate canonical URLs.
   */

  const canonical = buildCanonical(canonicalLocale, "/legal/cookie-policy");

  /*
   * -----------------------------------------------------------
   * Hreflang
   * -----------------------------------------------------------
   */

  const languages = buildLanguageAlternates("/legal/cookie-policy");

  return createMetadata({
    title: buildPageTitle(text.title),

    description: text.description,

    keywords: text.keywords,

    canonical,

    locale: getOpenGraphLocale(canonicalLocale),

    alternates: {
      canonical,

      languages,
    },
  });
}

/* ============================================================
   Page
============================================================ */

export default async function CookiePolicyPage({ params }: PageProps) {
  const { locale } = await params;

  const language = resolveLanguage(locale);

  const canonicalLocale = resolveCanonicalLocale(locale);

  const text = pageText[language];

  const content = cookieContent[language];

  /* ==========================================================
     Safety fallback
  ========================================================== */

  if (!content) {
    console.error(`Cookie Policy content is missing for locale: ${locale}`);
  }

  /* ==========================================================
     Back URL
  ========================================================== */

  const backHref = `/${canonicalLocale}`;

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
            COOKIE CONTENT
        ====================================================== */}

        <div className="-mt-10">
          <LegalContent content={content} />
        </div>
      </main>

      {/* ======================================================
          FOOTER
      ====================================================== */}

      <Footer locale={canonicalLocale} />
    </>
  );
}
