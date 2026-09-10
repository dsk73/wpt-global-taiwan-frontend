// src/app/[locale]/teaching-center/[slug]/page.tsx

import type { Metadata } from "next";
import Link from "next/link";
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
  SITE_URL,
} from "@/lib/metadata";

import { getMediaUrl } from "@/lib/media";

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
   RELATED GUIDE CONTENT
============================================================ */

interface RelatedGuide {
  title: string;
  description: string;
  slug: string;
}

const RELATED_GUIDES: Record<string, Record<Locale, RelatedGuide[]>> = {
  "registration-guide": {
    "zh-Hant-TW": [
      {
        title: "WPT Global 推薦碼教學",
        description: "了解 WPT Global 推薦碼與註冊時的使用方式。",
        slug: "referral-code",
      },
      {
        title: "WPT Global 下載教學",
        description: "了解 WPT Global 下載與開始使用平台的方式。",
        slug: "download-guide",
      },
      {
        title: "WPT Global 儲值教學",
        description: "了解 WPT Global 儲值與入金相關步驟。",
        slug: "prepaid-value-guide",
      },
    ],

    en: [
      {
        title: "WPT Global Referral Code Guide",
        description:
          "Learn how WPT Global referral codes may be used during registration.",
        slug: "referral-code",
      },
      {
        title: "WPT Global Download Guide",
        description:
          "Learn how to download WPT Global and get started with the platform.",
        slug: "download-guide",
      },
      {
        title: "WPT Global Deposit Guide",
        description:
          "Learn about WPT Global deposits and adding funds to your account.",
        slug: "prepaid-value-guide",
      },
    ],

    "ms-MY": [
      {
        title: "Panduan Kod Rujukan WPT Global",
        description:
          "Ketahui cara kod rujukan WPT Global digunakan semasa pendaftaran.",
        slug: "referral-code",
      },
      {
        title: "Panduan Muat Turun WPT Global",
        description:
          "Ketahui cara memuat turun WPT Global dan mula menggunakan platform.",
        slug: "download-guide",
      },
      {
        title: "Panduan Deposit WPT Global",
        description:
          "Ketahui tentang deposit WPT Global dan cara menambah dana.",
        slug: "prepaid-value-guide",
      },
    ],
  },

  "download-guide": {
    "zh-Hant-TW": [
      {
        title: "WPT Global 註冊教學",
        description: "了解 WPT Global 註冊與帳戶建立流程。",
        slug: "registration-guide",
      },
      {
        title: "WPT Global 推薦碼教學",
        description: "了解 WPT Global 推薦碼與推薦連結的使用方式。",
        slug: "referral-code",
      },
      {
        title: "WPT Global 儲值教學",
        description: "了解 WPT Global 儲值與入金相關步驟。",
        slug: "prepaid-value-guide",
      },
    ],

    en: [
      {
        title: "WPT Global Registration Guide",
        description:
          "Learn how to register with WPT Global and create your account.",
        slug: "registration-guide",
      },
      {
        title: "WPT Global Referral Code Guide",
        description:
          "Learn how WPT Global referral codes and links may be used.",
        slug: "referral-code",
      },
      {
        title: "WPT Global Deposit Guide",
        description:
          "Learn about WPT Global deposits and adding funds to your account.",
        slug: "prepaid-value-guide",
      },
    ],

    "ms-MY": [
      {
        title: "Panduan Pendaftaran WPT Global",
        description:
          "Ketahui cara mendaftar dengan WPT Global dan membuat akaun.",
        slug: "registration-guide",
      },
      {
        title: "Panduan Kod Rujukan WPT Global",
        description:
          "Ketahui cara kod dan pautan rujukan WPT Global digunakan.",
        slug: "referral-code",
      },
      {
        title: "Panduan Deposit WPT Global",
        description:
          "Ketahui tentang deposit WPT Global dan cara menambah dana.",
        slug: "prepaid-value-guide",
      },
    ],
  },

  "prepaid-value-guide": {
    "zh-Hant-TW": [
      {
        title: "WPT Global 註冊教學",
        description: "完成 WPT Global 註冊後再了解帳戶儲值流程。",
        slug: "registration-guide",
      },
      {
        title: "WPT Global 推薦碼教學",
        description: "了解 WPT Global 推薦碼、註冊與優惠相關資訊。",
        slug: "referral-code",
      },
      {
        title: "WPT Global 出金教學",
        description: "了解 WPT Global 出金、提款與 KYC 驗證流程。",
        slug: "withdrawal",
      },
    ],

    en: [
      {
        title: "WPT Global Registration Guide",
        description:
          "Complete your WPT Global registration before reviewing the deposit process.",
        slug: "registration-guide",
      },
      {
        title: "WPT Global Referral Code Guide",
        description:
          "Learn about WPT Global referral codes, registration and promotional information.",
        slug: "referral-code",
      },
      {
        title: "WPT Global Withdrawal Guide",
        description:
          "Learn about WPT Global withdrawals, eligibility and KYC verification.",
        slug: "withdrawal",
      },
    ],

    "ms-MY": [
      {
        title: "Panduan Pendaftaran WPT Global",
        description:
          "Lengkapkan pendaftaran WPT Global sebelum melihat panduan deposit.",
        slug: "registration-guide",
      },
      {
        title: "Panduan Kod Rujukan WPT Global",
        description:
          "Ketahui tentang kod rujukan, pendaftaran dan promosi WPT Global.",
        slug: "referral-code",
      },
      {
        title: "Panduan Pengeluaran WPT Global",
        description:
          "Ketahui tentang pengeluaran WPT Global, kelayakan dan pengesahan KYC.",
        slug: "withdrawal",
      },
    ],
  },
};

/* ============================================================
   RELATED GUIDE LABELS
============================================================ */

const RELATED_GUIDES_TITLE: Record<Locale, string> = {
  "zh-Hant-TW": "WPT Global 相關指南",
  en: "Related WPT Global Guides",
  "ms-MY": "Panduan WPT Global Berkaitan",
};

const RELATED_GUIDES_DESCRIPTION: Record<Locale, string> = {
  "zh-Hant-TW": "繼續了解 WPT Global 註冊、下載、推薦碼、儲值與出金等相關指南.",
  en: "Continue with related WPT Global guides covering registration, download, referral codes, deposits and withdrawals.",
  "ms-MY":
    "Teruskan dengan panduan WPT Global berkaitan pendaftaran, muat turun, kod rujukan, deposit dan pengeluaran.",
};

const TEACHING_CENTER_LABEL: Record<Locale, string> = {
  "zh-Hant-TW": "返回 WPT Global 撲克教學中心",
  en: "Back to WPT Global Poker Teaching Center",
  "ms-MY": "Kembali ke Pusat Pembelajaran Poker WPT Global",
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

  /* ==========================================================
     SEO VALUES
  ========================================================== */

  const seo = SEO_CONFIG[guide.Slug]?.[locale];

  const pageTitle = seo?.title ?? guide.Title;

  const pageDescription = seo
    ? seo.description
    : `${DEFAULT_SEO_DESCRIPTION[locale]} ${guide.Title}`;

  const canonical = buildCanonical(locale, `/teaching-center/${guide.Slug}`);

  const guideUrl = canonical;

  const thumbnailUrl = guide.Thumbnail
    ? getMediaUrl(guide.Thumbnail.url)
    : undefined;

  const relatedGuides = RELATED_GUIDES[guide.Slug]?.[locale] ?? [];

  /* ==========================================================
     STRUCTURED DATA
  ========================================================== */

  const structuredData = {
    "@context": "https://schema.org",

    "@graph": [
      {
        "@type": "WebPage",

        "@id": `${guideUrl}#webpage`,

        url: guideUrl,

        name: pageTitle,

        description: pageDescription,

        inLanguage: locale,

        isPartOf: {
          "@id": `${SITE_URL}/#website`,
        },

        publisher: {
          "@id": `${SITE_URL}/#organization`,
        },

        breadcrumb: {
          "@id": `${guideUrl}#breadcrumb`,
        },

        ...(thumbnailUrl
          ? {
              primaryImageOfPage: {
                "@type": "ImageObject",
                url: thumbnailUrl,
              },
            }
          : {}),
      },

      {
        "@type": "Article",

        "@id": `${guideUrl}#article`,

        url: guideUrl,

        headline: pageTitle,

        description: pageDescription,

        inLanguage: locale,

        mainEntityOfPage: {
          "@id": `${guideUrl}#webpage`,
        },

        isPartOf: {
          "@id": `${SITE_URL}/#website`,
        },

        publisher: {
          "@id": `${SITE_URL}/#organization`,
        },

        breadcrumb: {
          "@id": `${guideUrl}#breadcrumb`,
        },

        ...(thumbnailUrl
          ? {
              image: [thumbnailUrl],
            }
          : {}),
      },

      {
        "@type": "BreadcrumbList",

        "@id": `${guideUrl}#breadcrumb`,

        itemListElement: [
          {
            "@type": "ListItem",
            position: 1,
            name:
              locale === "zh-Hant-TW"
                ? "首頁"
                : locale === "ms-MY"
                  ? "Laman Utama"
                  : "Home",
            item: buildCanonical(locale, ""),
          },

          {
            "@type": "ListItem",
            position: 2,
            name:
              locale === "zh-Hant-TW"
                ? "撲克教學中心"
                : locale === "ms-MY"
                  ? "Pusat Pembelajaran Poker"
                  : "Poker Teaching Center",
            item: buildCanonical(locale, "/teaching-center"),
          },

          {
            "@type": "ListItem",
            position: 3,
            name: guide.Title,
            item: guideUrl,
          },
        ],
      },
    ],
  };

  return (
    <>
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{
          __html: JSON.stringify(structuredData),
        }}
      />

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
              RELATED GUIDES
          ==================================================== */}

          {relatedGuides.length > 0 && (
            <section
              aria-labelledby="related-guides-heading"
              className="mt-20 border-t border-white/10 pt-12"
            >
              <h2
                id="related-guides-heading"
                className="
                  text-3xl
                  font-bold
                  tracking-tight
                  text-white
                  sm:text-4xl
                "
              >
                {RELATED_GUIDES_TITLE[locale]}
              </h2>

              <p className="mt-5 max-w-3xl leading-7 text-white/65">
                {RELATED_GUIDES_DESCRIPTION[locale]}
              </p>

              <div className="mt-8 grid gap-5 md:grid-cols-3">
                {relatedGuides.map((relatedGuide) => (
                  <Link
                    key={relatedGuide.slug}
                    href={`/${locale}/teaching-center/${relatedGuide.slug}`}
                    className="
                      group
                      rounded-2xl
                      border
                      border-white/10
                      bg-white/3
                      p-6
                      transition-all
                      duration-300
                      hover:-translate-y-1
                      hover:border-(--primary)/40
                      hover:bg-white/5
                    "
                  >
                    <h3 className="text-lg font-semibold text-white transition group-hover:text-(--primary)">
                      {relatedGuide.title}
                    </h3>

                    <p className="mt-3 text-sm leading-6 text-white/60">
                      {relatedGuide.description}
                    </p>
                  </Link>
                ))}
              </div>

              <div className="mt-8">
                <Link
                  href={`/${locale}/teaching-center`}
                  className="
                    inline-flex
                    items-center
                    text-sm
                    font-semibold
                    text-(--primary)
                    transition
                    hover:opacity-80
                  "
                >
                  {TEACHING_CENTER_LABEL[locale]}
                </Link>
              </div>
            </section>
          )}

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
