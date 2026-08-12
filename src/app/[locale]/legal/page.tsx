import type { Metadata } from "next";
import { ArrowLeft, ArrowRight, FileText } from "lucide-react";
import Link from "next/link";

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
  }
> = {
  en: {
    title: "Legal",
    description:
      "Review our terms, policies and procedures governing your use of WPT Global.",
    back: "Back",
    legal: "Legal",
  },

  "zh-Hant-TW": {
    title: "法律文件",
    description: "查看規範您使用 WPT Global 的條款、政策及相關程序。",
    back: "返回",
    legal: "法律",
  },

  "ms-MY": {
    title: "Undang-undang",
    description:
      "Semak terma, dasar dan prosedur yang mengawal penggunaan WPT Global anda.",
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

  const text = pageText[language];

  return {
    title: `${text.title} | WPT Global`,
    description: text.description,
  };
}

/* ============================================================
   Page
============================================================ */

export default async function LegalPage({ params }: PageProps) {
  const { locale } = await params;

  const language = resolveLocale(locale);

  const text = pageText[language];

  /*
   * Keep the actual URL locale.
   *
   * This allows the page to work correctly even if
   * the resolver maps zh-TW -> zh-Hant-TW internally.
   */

  const currentLocale =
    locale === "zh-TW"
      ? "zh-Hant-TW"
      : locale === "zh"
        ? "zh-Hant-TW"
        : locale === "ms"
          ? "ms-MY"
          : locale;

  const legalPages = LEGAL[currentLocale as Locale] ?? LEGAL.en;

  const backHref = `/${locale}`;

  return (
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
  );
}
