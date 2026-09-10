// src/app/[locale]/teaching-center/[slug]/page.tsx

import type { Metadata } from "next";
import { notFound } from "next/navigation";

import { Footer } from "@/features/footer";

import {
  TeachingGuideHero,
  TeachingGuideMedia,
  TeachingGuideSections,
} from "@/features/teaching-center-detail";

import { fetchTeachingGuide } from "@/services";

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

interface TeachingCenterDetailPageProps {
  params: Promise<{
    locale: Locale;
    slug: string;
  }>;
}

/* ============================================================
   SEO CONTENT
============================================================ */

const SEO_CONFIG: Record<
  string,
  Record<
    Locale,
    {
      title: string;
      description: string;
      keywords: string[];
    }
  >
> = {
  "registration-guide": {
    "zh-Hant-TW": {
      title: "WPT Global 註冊教學｜WPTG 註冊指南",
      description:
        "WPT Global 台灣註冊教學，了解 WPT Global 與 WPTG 註冊流程、帳戶建立方式及開始遊玩前的重要步驟。",
      keywords: [
        "WPT Global 註冊",
        "WPTG 註冊",
        "WPT Global Registration",
        "WPTG Registration",
        "WPT Global 台灣註冊",
        "WPTG 台灣註冊",
        "WPT Global 註冊教學",
        "WPTG 註冊教學",
      ],
    },

    en: {
      title: "WPT Global Registration Guide | WPTG Registration",
      description:
        "Learn how to register with WPT Global Taiwan, create your WPT Global account and complete the registration steps before getting started.",
      keywords: [
        "WPT Global Registration",
        "WPTG Registration",
        "WPT Global registration guide",
        "WPTG registration guide",
        "WPT Global Taiwan registration",
        "WPT Global registration tutorial",
        "WPTG registration tutorial",
      ],
    },

    "ms-MY": {
      title: "Panduan Pendaftaran WPT Global | Pendaftaran WPTG",
      description:
        "Panduan pendaftaran WPT Global Taiwan untuk membantu anda memahami proses pendaftaran WPT Global dan WPTG serta langkah penting untuk memulakan akaun.",
      keywords: [
        "pendaftaran WPT Global",
        "pendaftaran WPTG",
        "panduan pendaftaran WPT Global",
        "panduan pendaftaran WPTG",
        "WPT Global Taiwan",
        "tutorial pendaftaran WPT Global",
        "tutorial pendaftaran WPTG",
      ],
    },
  },

  "download-guide": {
    "zh-Hant-TW": {
      title: "WPT Global 下載教學｜WPTG 下載指南",
      description:
        "WPT Global 台灣下載教學，了解 WPT Global 與 WPTG 的下載方式及開始使用線上撲克平台前的重要步驟。",
      keywords: [
        "WPT Global 下載",
        "WPTG 下載",
        "WPT Global Download",
        "WPTG Download",
        "WPT Global 台灣下載",
        "WPTG 台灣下載",
        "WPT Global 下載教學",
        "WPTG 下載教學",
      ],
    },

    en: {
      title: "WPT Global Download Guide | WPTG Download",
      description:
        "Learn how to download WPT Global Taiwan and access the WPT Global poker platform with this step-by-step WPTG download guide.",
      keywords: [
        "WPT Global Download",
        "WPTG Download",
        "WPT Global download guide",
        "WPTG download guide",
        "WPT Global Taiwan download",
        "WPT Global download tutorial",
        "WPTG download tutorial",
      ],
    },

    "ms-MY": {
      title: "Panduan Muat Turun WPT Global | Muat Turun WPTG",
      description:
        "Panduan muat turun WPT Global Taiwan untuk membantu anda memahami cara memuat turun WPT Global dan mengakses platform poker WPTG.",
      keywords: [
        "muat turun WPT Global",
        "muat turun WPTG",
        "panduan muat turun WPT Global",
        "panduan muat turun WPTG",
        "WPT Global Taiwan",
        "tutorial muat turun WPT Global",
        "tutorial muat turun WPTG",
      ],
    },
  },

  "prepaid-value-guide": {
    "zh-Hant-TW": {
      title: "WPT Global 儲值教學｜WPTG 儲值與入金指南",
      description:
        "WPT Global 台灣儲值教學，了解 WPT Global 與 WPTG 儲值、入金方式及開始使用線上撲克服務前的相關步驟。",
      keywords: [
        "WPT Global 儲值",
        "WPTG 儲值",
        "WPT Global 入金",
        "WPT Global Stored Value",
        "WPT Global deposit",
        "WPTG 儲值教學",
        "WPT Global 儲值教學",
        "WPT Global 台灣儲值",
      ],
    },

    en: {
      title: "WPT Global Deposit Guide | WPTG Stored Value",
      description:
        "Learn how to deposit and add funds with WPT Global Taiwan through this WPT Global deposit and WPTG stored value guide.",
      keywords: [
        "WPT Global deposit",
        "WPT Global Stored Value",
        "WPTG stored value",
        "WPT Global deposit guide",
        "WPTG deposit guide",
        "WPT Global Taiwan deposit",
        "WPT Global deposit tutorial",
      ],
    },

    "ms-MY": {
      title: "Panduan Deposit WPT Global | Nilai Prabayar WPTG",
      description:
        "Panduan deposit WPT Global Taiwan untuk membantu anda memahami cara menambah nilai dan menggunakan nilai prabayar WPTG.",
      keywords: [
        "deposit WPT Global",
        "nilai prabayar WPTG",
        "panduan deposit WPT Global",
        "panduan WPTG",
        "WPT Global Taiwan",
        "tutorial deposit WPT Global",
        "WPTG stored value",
      ],
    },
  },
};

const DEFAULT_SEO_DESCRIPTION: Record<Locale, string> = {
  en: "Learn more with this WPT Global Taiwan poker teaching guide covering practical poker rules, strategies, tips and techniques.",

  "zh-Hant-TW":
    "透過 WPT Global Taiwan 撲克教學指南，了解實用的撲克規則、策略、技巧與遊戲方法。",

  "ms-MY":
    "Pelajari lebih lanjut melalui panduan pembelajaran poker WPT Global Taiwan yang merangkumi peraturan, strategi, tip dan teknik poker praktikal.",
};

/* ============================================================
   METADATA
============================================================ */

export async function generateMetadata({
  params,
}: TeachingCenterDetailPageProps): Promise<Metadata> {
  const { locale, slug } = await params;

  /* ----------------------------------------------------------
     Validate locale
  ---------------------------------------------------------- */

  if (!isValidLocale(locale)) {
    notFound();
  }

  /* ----------------------------------------------------------
     Fetch teaching guide
  ---------------------------------------------------------- */

  const guide = await fetchTeachingGuide(slug, locale);

  /* ----------------------------------------------------------
     Guide not found
  ---------------------------------------------------------- */

  if (!guide) {
    return {
      title: "Teaching Guide",
      robots: {
        index: false,
        follow: false,
      },
    };
  }

  /* ----------------------------------------------------------
     SEO configuration
  ---------------------------------------------------------- */

  const seo = SEO_CONFIG[guide.Slug]?.[locale];

  const title = seo?.title ?? guide.Title;

  const description = seo
    ? seo.description
    : `${DEFAULT_SEO_DESCRIPTION[locale]} ${guide.Title}`;

  const keywords = seo?.keywords ?? [];

  /* ----------------------------------------------------------
     Canonical URL
  ---------------------------------------------------------- */

  const canonical = buildCanonical(locale, `/teaching-center/${guide.Slug}`);

  /* ----------------------------------------------------------
     Hreflang / language alternates
  ---------------------------------------------------------- */

  const languages = buildLanguageAlternates(`/teaching-center/${guide.Slug}`);

  /* ----------------------------------------------------------
     Metadata
  ---------------------------------------------------------- */

  return createMetadata({
    title: buildPageTitle(title),

    description,

    keywords,

    canonical,

    locale: getOpenGraphLocale(locale),

    type: "article",

    alternates: {
      canonical,
      languages,
    },
  });
}

/* ============================================================
   PAGE
============================================================ */

export default async function TeachingCenterDetailPage({
  params,
}: TeachingCenterDetailPageProps) {
  const { locale, slug } = await params;

  /* ----------------------------------------------------------
     Validate locale
  ---------------------------------------------------------- */

  if (!isValidLocale(locale)) {
    notFound();
  }

  /* ----------------------------------------------------------
     Fetch teaching guide
  ---------------------------------------------------------- */

  const guide = await fetchTeachingGuide(slug, locale);

  /* ----------------------------------------------------------
     Guide not found
  ---------------------------------------------------------- */

  if (!guide) {
    notFound();
  }

  return (
    <>
      <main className="min-h-screen bg-[#070B15] pt-32">
        {/* ======================================================
            HERO
        ====================================================== */}

        <TeachingGuideHero guide={guide} />

        {/* ======================================================
            GUIDE MEDIA
        ====================================================== */}

        <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
          <TeachingGuideMedia guide={guide} />
        </div>

        {/* ======================================================
            GUIDE SECTIONS
        ====================================================== */}

        <div className="mx-auto max-w-7xl px-4 py-16 sm:px-6 lg:px-8">
          <TeachingGuideSections guide={guide} />

          {/* ====================================================
              CTA
          ==================================================== */}

          {guide.CTA && (
            <section className="mt-20 border-t border-white/10 pt-12">
              <div
                className="
                  flex
                  flex-col
                  items-center
                  justify-between
                  gap-6
                  rounded-3xl
                  border
                  border-white/10
                  bg-white/5
                  px-6
                  py-8

                  sm:flex-row
                  sm:px-10
                "
              >
                <p
                  className="
                    text-center
                    text-lg
                    font-medium
                    text-white

                    sm:text-left
                  "
                >
                  Ready to get started?
                </p>

                <a
                  href={guide.CTA.URL}
                  target={guide.CTA.OpenInNewTab ? "_blank" : undefined}
                  rel={
                    guide.CTA.OpenInNewTab ? "noopener noreferrer" : undefined
                  }
                  className="
                    inline-flex
                    shrink-0
                    items-center
                    justify-center
                    rounded-xl
                    bg-(--primary)
                    px-7
                    py-3
                    font-semibold
                    text-black
                    transition-all
                    duration-300
                    hover:scale-105
                  "
                >
                  {guide.CTA.Label}
                </a>
              </div>
            </section>
          )}
        </div>
      </main>

      {/* ======================================================
          FOOTER
      ====================================================== */}

      <Footer locale={locale} />
    </>
  );
}
