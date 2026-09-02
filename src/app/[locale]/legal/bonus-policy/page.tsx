// src/app/[locale]/legal/bonus-policy/page.tsx

import type { Metadata } from "next";
import { ArrowLeft, FileText } from "lucide-react";
import Link from "next/link";

import { Footer } from "@/features/footer";

import type { Locale } from "@/providers";

import LegalContent from "./LegalContent";

import * as bonusEnModule from "./bonus-en";
import * as bonusZhModule from "./bonus-zh";
import * as bonusMsModule from "./bonus-ms";

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

const bonusContent = {
  en: getModuleContent(bonusEnModule as Record<string, unknown>),

  zh: getModuleContent(bonusZhModule as Record<string, unknown>),

  ms: getModuleContent(bonusMsModule as Record<string, unknown>),
};

/* ============================================================
   Page Text
============================================================ */

const pageText = {
  en: {
    title: "Bonus Policy",

    description:
      "Learn about the bonus terms, conditions and requirements that apply to promotional bonuses offered by WPT Global Taiwan.",

    lastUpdated: "Last Updated: August 12, 2026",

    back: "Back",

    legal: "Legal",

    keywords: [
      "WPT Global Taiwan Bonus Policy",
      "WPT Global bonus policy",
      "WPT Global bonuses",
      "WPT Global promotional bonus",
      "WPT Global bonus terms",
      "WPT Global bonus conditions",
      "WPT Global bonus requirements",
      "WPT Global promotions",
      "WPTG bonus policy",
      "online poker bonus terms",
    ],
  },

  zh: {
    title: "獎勵政策",

    description:
      "了解 WPT Global Taiwan 提供的促銷獎勵所適用的條款、條件及相關要求，包括獎勵使用與資格規定。",

    lastUpdated: "最後更新：2026年8月12日",

    back: "返回",

    legal: "法律",

    keywords: [
      "WPT Global Taiwan 獎勵政策",
      "WPT Global 獎勵政策",
      "WPT Global 獎勵",
      "WPT Global 促銷獎勵",
      "WPT Global 獎勵條款",
      "WPT Global 獎勵條件",
      "WPT Global 獎勵資格",
      "WPT Global 優惠",
      "WPTG 獎勵政策",
      "線上撲克獎勵",
    ],
  },

  ms: {
    title: "Polisi Bonus",

    description:
      "Ketahui terma, syarat dan keperluan bonus promosi yang ditawarkan oleh WPT Global Taiwan, termasuk syarat kelayakan dan penggunaan bonus.",

    lastUpdated: "Kemas Kini Terakhir: 12 Ogos 2026",

    back: "Kembali",

    legal: "Undang-undang",

    keywords: [
      "Polisi Bonus WPT Global Taiwan",
      "polisi bonus WPT Global",
      "bonus WPT Global",
      "bonus promosi WPT Global",
      "terma bonus WPT Global",
      "syarat bonus WPT Global",
      "keperluan bonus WPT Global",
      "promosi WPT Global",
      "polisi bonus WPTG",
      "bonus poker online",
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
   Metadata
============================================================ */

export async function generateMetadata({
  params,
}: PageProps): Promise<Metadata> {
  const { locale } = await params;

  const language = resolveLanguage(locale);

  const text = pageText[language];

  const normalizedLocale: Locale =
    language === "zh" ? "zh-Hant-TW" : language === "ms" ? "ms-MY" : "en";

  const canonical = buildCanonical(normalizedLocale, "/legal/bonus-policy");

  const languages = buildLanguageAlternates("/legal/bonus-policy");

  return createMetadata({
    title: buildPageTitle(text.title),

    description: text.description,

    keywords: text.keywords,

    canonical,

    locale: getOpenGraphLocale(normalizedLocale),

    alternates: {
      canonical,
      languages,
    },
  });
}

/* ============================================================
   Page
============================================================ */

export default async function BonusPolicyPage({ params }: PageProps) {
  const { locale } = await params;

  const language = resolveLanguage(locale);

  const text = pageText[language];

  const content = bonusContent[language];

  /* ==========================================================
     Safety fallback
  ========================================================== */

  if (!content) {
    console.error(`Bonus Policy content is missing for locale: ${locale}`);
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
