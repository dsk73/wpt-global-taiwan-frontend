// src/app/[locale]/legal/page.tsx

import type { Metadata } from "next";
import { ArrowLeft, ArrowRight, FileText } from "lucide-react";
import Link from "next/link";

import { Footer } from "@/features/footer";

/* ============================================================
   SEO
============================================================ */

import {
  buildCanonical,
  buildLanguageAlternates,
  buildPageTitle,
  createMetadata,
  getOpenGraphLocale,
} from "@/lib/metadata";

/* ============================================================
   Locale
============================================================ */

type Locale = "en" | "zh-Hant-TW" | "ms-MY";

interface PageProps {
  params: Promise<{
    locale: string;
  }>;
}

/* ============================================================
   Legal Pages
============================================================ */

const LEGAL: Record<Locale, { label: string; href: string }[]> = {
  "zh-Hant-TW": [
    {
      label: "條款與條件",
      href: "/zh-Hant-TW/legal/terms-and-conditions",
    },
    {
      label: "隱私權政策",
      href: "/zh-Hant-TW/legal/privacy-policy",
    },
    {
      label: "Cookie 政策",
      href: "/zh-Hant-TW/legal/cookie-policy",
    },
    {
      label: "KYC 政策和程序",
      href: "/zh-Hant-TW/legal/kyc-policy",
    },
    {
      label: "客戶接受政策",
      href: "/zh-Hant-TW/legal/customer-acceptance-policy",
    },
    {
      label: "獎金政策",
      href: "/zh-Hant-TW/legal/bonus-policy",
    },
    {
      label: "客戶爭議解決",
      href: "/zh-Hant-TW/legal/customer-dispute-resolution",
    },
  ],

  en: [
    {
      label: "Terms & Conditions",
      href: "/en/legal/terms-and-conditions",
    },
    {
      label: "Privacy Policy",
      href: "/en/legal/privacy-policy",
    },
    {
      label: "Cookie Policy",
      href: "/en/legal/cookie-policy",
    },
    {
      label: "KYC Policies and Procedures",
      href: "/en/legal/kyc-policy",
    },
    {
      label: "Customer Acceptance Policy",
      href: "/en/legal/customer-acceptance-policy",
    },
    {
      label: "Bonus Policy",
      href: "/en/legal/bonus-policy",
    },
    {
      label: "Complaint Dispute Resolution",
      href: "/en/legal/customer-dispute-resolution",
    },
  ],

  "ms-MY": [
    {
      label: "Terma & Syarat",
      href: "/ms-MY/legal/terms-and-conditions",
    },
    {
      label: "Dasar Privasi",
      href: "/ms-MY/legal/privacy-policy",
    },
    {
      label: "Dasar Cookie",
      href: "/ms-MY/legal/cookie-policy",
    },
    {
      label: "Dasar & Prosedur KYC",
      href: "/ms-MY/legal/kyc-policy",
    },
    {
      label: "Dasar Penerimaan Pelanggan",
      href: "/ms-MY/legal/customer-acceptance-policy",
    },
    {
      label: "Dasar Bonus",
      href: "/ms-MY/legal/bonus-policy",
    },
    {
      label: "Penyelesaian Aduan",
      href: "/ms-MY/legal/customer-dispute-resolution",
    },
  ],
};

/* ============================================================
   Page Text
============================================================ */

const pageText: Record<
  Locale,
  {
    title: string;
    description: string;
    back: string;
    legal: string;
    keywords: string[];
  }
> = {
  en: {
    title: "Legal Policies & Terms",
    description:
      "Review the official WPT Global Taiwan terms, privacy policy, cookie policy, KYC procedures, bonus policy, customer acceptance policy and dispute resolution information.",
    back: "Back",
    legal: "Legal",
    keywords: [
      "WPT Global Taiwan legal",
      "WPT Global Taiwan terms",
      "WPT Global Taiwan policies",
      "WPT Global terms and conditions",
      "WPT Global privacy policy",
      "WPT Global cookie policy",
      "WPT Global KYC policy",
      "WPT Global bonus policy",
      "WPT Global customer acceptance policy",
      "WPT Global dispute resolution",
    ],
  },

  "zh-Hant-TW": {
    title: "法律文件與政策",
    description:
      "查看 WPT Global Taiwan 官方條款與政策，包括使用條款、隱私權政策、Cookie 政策、KYC 政策、獎金政策、客戶接受政策及爭議解決資訊。",
    back: "返回",
    legal: "法律",
    keywords: [
      "WPT Global Taiwan 法律文件",
      "WPT Global Taiwan 條款",
      "WPT Global Taiwan 政策",
      "WPT Global 使用條款",
      "WPT Global 隱私權政策",
      "WPT Global Cookie 政策",
      "WPT Global KYC 政策",
      "WPT Global 獎金政策",
      "WPT Global 客戶接受政策",
      "WPT Global 爭議解決",
    ],
  },

  "ms-MY": {
    title: "Dasar & Terma Undang-undang",
    description:
      "Semak terma dan dasar rasmi WPT Global Taiwan termasuk terma dan syarat, dasar privasi, dasar cookie, prosedur KYC, dasar bonus, penerimaan pelanggan dan penyelesaian pertikaian.",
    back: "Kembali",
    legal: "Undang-undang",
    keywords: [
      "WPT Global Taiwan undang-undang",
      "terma WPT Global Taiwan",
      "dasar WPT Global Taiwan",
      "terma dan syarat WPT Global",
      "dasar privasi WPT Global",
      "dasar cookie WPT Global",
      "dasar KYC WPT Global",
      "dasar bonus WPT Global",
      "dasar penerimaan pelanggan WPT Global",
      "penyelesaian pertikaian WPT Global",
    ],
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
   Metadata
============================================================ */

export async function generateMetadata({
  params,
}: PageProps): Promise<Metadata> {
  const { locale } = await params;

  const language = resolveLocale(locale);

  const seo = pageText[language];

  const canonical = buildCanonical(language, "/legal");

  const languages = buildLanguageAlternates("/legal");

  return createMetadata({
    title: buildPageTitle(seo.title),

    description: seo.description,

    keywords: seo.keywords,

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

export default async function LegalPage({ params }: PageProps) {
  const { locale } = await params;

  const language = resolveLocale(locale);

  const text = pageText[language];

  /*
   * Always use the normalized locale for legal-page links.
   *
   * Examples:
   * zh-TW -> zh-Hant-TW
   * zh    -> zh-Hant-TW
   * ms    -> ms-MY
   */

  const legalPages = LEGAL[language];

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
              pb-8

              sm:px-8
              sm:pt-14
              sm:pb-9

              lg:px-10
              lg:pt-16
              lg:pb-10

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
                TITLE
            ================================================== */}

            <div
              className="
                mt-6

                sm:mt-7

                lg:mt-8
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
                  mt-3
                  max-w-3xl
                  text-sm
                  leading-6
                  text-white/50

                  sm:text-base
                  sm:leading-7
                "
              >
                {text.description}
              </p>
            </div>
          </div>
        </section>

        {/* ======================================================
            LEGAL DOCUMENT LIST
        ====================================================== */}

        <section className="relative">
          {/* ====================================================
              BACKGROUND GLOW
          ==================================================== */}

          <div
            className="
              pointer-events-none
              absolute
              left-1/2
              top-0
              h-175
              w-full
              -translate-x-1/2
              bg-blue-500/[0.008]
              blur-3xl
            "
          />

          {/* ====================================================
              CONTENT CONTAINER
          ==================================================== */}

          <div
            className="
              relative
              mx-auto
              w-full
              max-w-375
              px-5
              py-10

              sm:px-8
              sm:py-12

              md:px-10
              md:py-14

              lg:px-12
              lg:py-16

              xl:px-14
            "
          >
            {/* ==================================================
                DOCUMENT LIST
            ================================================== */}

            <div
              className="
                grid
                grid-cols-1
                gap-3

                md:grid-cols-2
                md:gap-4
              "
            >
              {legalPages.map((item, index) => (
                <Link
                  key={item.href}
                  href={item.href}
                  className="
                    group
                    relative
                    flex
                    min-h-24
                    items-center
                    justify-between
                    gap-6
                    rounded-2xl
                    border
                    border-white/10
                    bg-white/2.5
                    px-5
                    py-5
                    transition-all
                    duration-200

                    hover:border-blue-500/30
                    hover:bg-white/4.5

                    sm:px-6
                    sm:py-6
                  "
                >
                  {/* ==================================================
                      LEFT CONTENT
                  ================================================== */}

                  <div className="flex min-w-0 items-center gap-4">
                    {/* Number */}

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
                        border-white/10
                        bg-white/2.5
                        text-xs
                        font-semibold
                        text-white/40
                        transition-colors
                        duration-200

                        group-hover:border-blue-500/30
                        group-hover:bg-blue-500/10
                        group-hover:text-blue-400
                      "
                    >
                      {String(index + 1).padStart(2, "0")}
                    </div>

                    {/* Label */}

                    <span
                      className="
                        text-sm
                        font-semibold
                        leading-6
                        text-white/80
                        transition-colors
                        duration-200

                        group-hover:text-white

                        sm:text-base
                      "
                    >
                      {item.label}
                    </span>
                  </div>

                  {/* ==================================================
                      ARROW
                  ================================================== */}

                  <ArrowRight
                    className="
                      h-5
                      w-5
                      shrink-0
                      text-white/30
                      transition-all
                      duration-200

                      group-hover:translate-x-1
                      group-hover:text-blue-400
                    "
                  />
                </Link>
              ))}
            </div>
          </div>
        </section>
      </main>

      {/* ======================================================
          FOOTER
      ====================================================== */}

      <Footer locale={language} />
    </>
  );
}
