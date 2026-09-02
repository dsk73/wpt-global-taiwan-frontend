// src/app/[locale]/legal/kyc-policy/page.tsx

import type { Metadata } from "next";
import { ArrowLeft, FileText } from "lucide-react";
import Link from "next/link";

import { Footer } from "@/features/footer";

import LegalContent from "./LegalContent";

import * as kycEnModule from "./kyc-en";
import * as kycZhModule from "./kyc-zh";
import * as kycMsModule from "./kyc-ms";

import type { Locale } from "@/providers";

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

const kycContent = {
  en: getModuleContent(kycEnModule as Record<string, unknown>),

  zh: getModuleContent(kycZhModule as Record<string, unknown>),

  ms: getModuleContent(kycMsModule as Record<string, unknown>),
};

/* ============================================================
   Page Text + SEO
============================================================ */

const pageText = {
  en: {
    title: "KYC Policy",

    description:
      "Learn about WPT Global's KYC policy, identity verification requirements and procedures for poker players.",

    keywords: [
      "WPT Global Taiwan",
      "WPT Global KYC",
      "WPT Global KYC policy",
      "WPT Global identity verification",
      "WPT Global verification",
      "WPT Global account verification",
      "WPT Global player verification",
      "poker KYC",
      "online poker KYC",
      "WPT Global legal",
    ],

    lastUpdated: "Last Updated: August 12, 2026",

    back: "Back",

    legal: "Legal",
  },

  zh: {
    title: "KYC 政策",

    description:
      "了解 WPT Global 的 KYC 政策、身分驗證要求及撲克玩家相關的身份認證程序。",

    keywords: [
      "WPT Global Taiwan",
      "WPT Global KYC",
      "WPT Global KYC 政策",
      "WPT Global 身分驗證",
      "WPT Global 身份認證",
      "WPT Global 帳戶驗證",
      "WPT Global 玩家驗證",
      "撲克 KYC",
      "線上撲克 KYC",
      "WPT Global 法律",
    ],

    lastUpdated: "最後更新：2026年8月12日",

    back: "返回",

    legal: "法律",
  },

  ms: {
    title: "Dasar KYC",

    description:
      "Ketahui tentang dasar KYC WPT Global, keperluan pengesahan identiti dan prosedur untuk pemain poker.",

    keywords: [
      "WPT Global Taiwan",
      "KYC WPT Global",
      "dasar KYC WPT Global",
      "pengesahan identiti WPT Global",
      "pengesahan akaun WPT Global",
      "pengesahan pemain WPT Global",
      "verifikasi WPT Global",
      "KYC poker",
      "KYC poker online",
      "undang-undang WPT Global",
    ],

    lastUpdated: "Kemas Kini Terakhir: 12 Ogos 2026",

    back: "Kembali",

    legal: "Undang-undang",
  },
};

/* ============================================================
   Locale Resolver
============================================================ */

function resolveLanguage(locale: string): "en" | "zh" | "ms" {
  if (
    locale === "zh-Hant-TW" ||
    locale === "zh-TW" ||
    locale === "zh" ||
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
   Metadata
============================================================ */

export async function generateMetadata({
  params,
}: PageProps): Promise<Metadata> {
  const { locale } = await params;

  const language = resolveLanguage(locale);

  const text = pageText[language];

  /*
   * Canonical URL
   *
   * Examples:
   * /en/legal/kyc-policy
   * /zh-Hant-TW/legal/kyc-policy
   * /ms-MY/legal/kyc-policy
   */
  const canonical = buildCanonical(locale as Locale, "/legal/kyc-policy");

  /*
   * Hreflang alternatives for all supported locales.
   */
  const languages = buildLanguageAlternates("/legal/kyc-policy");

  return createMetadata({
    title: buildPageTitle(text.title),

    description: text.description,

    keywords: text.keywords,

    canonical,

    locale: getOpenGraphLocale(locale as Locale),

    alternates: {
      canonical,

      languages,
    },
  });
}

/* ============================================================
   Page
============================================================ */

export default async function KycPolicyPage({ params }: PageProps) {
  const { locale } = await params;

  const language = resolveLanguage(locale);

  const text = pageText[language];

  const content = kycContent[language];

  /* ==========================================================
     Safety fallback
  ========================================================== */

  if (!content) {
    console.error(`KYC Policy content is missing for locale: ${locale}`);
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

      <Footer locale={locale as Locale} />
    </>
  );
}
