import type { Metadata } from "next";

import { notFound } from "next/navigation";

import Footer from "@/features/footer/components/Footer";
import { FAQHero, FAQPage } from "@/features/faq";

import { fetchFAQs } from "@/services";

import type { Locale } from "@/providers";

interface FAQPageProps {
  params: Promise<{
    locale: Locale;
  }>;
}

export async function generateMetadata({
  params,
}: FAQPageProps): Promise<Metadata> {
  const { locale } = await params;

  return {
    title:
      locale === "zh-Hant-TW"
        ? "常見問題 | WPT Global Taiwan"
        : locale === "ms-MY"
          ? "Soalan Lazim | WPT Global Taiwan"
          : "Frequently Asked Questions | WPT Global Taiwan",

    description:
      locale === "zh-Hant-TW"
        ? "查看有關 WPT Global Taiwan、付款方式、下載、促銷活動、帳戶及更多資訊的常見問題。"
        : locale === "ms-MY"
          ? "Cari jawapan kepada soalan lazim mengenai WPT Global Taiwan, pembayaran, promosi, akaun dan banyak lagi."
          : "Find answers to frequently asked questions about WPT Global Taiwan, payments, promotions, accounts and more.",
  };
}

export default async function FAQPageRoute({ params }: FAQPageProps) {
  const { locale } = await params;

  const groupedFAQs = await fetchFAQs(locale);

  if (!groupedFAQs) {
    notFound();
  }

  return (
    <>
      <main className="min-h-screen bg-[#070B15]">
        <FAQHero
          title={
            locale === "zh-Hant-TW"
              ? "常見問題"
              : locale === "ms-MY"
                ? "Soalan Lazim"
                : "Frequently Asked Questions"
          }
          subtitle={
            locale === "zh-Hant-TW"
              ? "快速找到有關 WPT Global Taiwan、付款、提款、KYC、優惠活動及更多資訊的解答。"
              : locale === "ms-MY"
                ? "Cari jawapan kepada soalan lazim mengenai WPT Global Taiwan."
                : "Find answers to the most frequently asked questions about WPT Global Taiwan."
          }
        />

        <FAQPage locale={locale} groupedFAQs={groupedFAQs} />
      </main>

      <Footer locale={locale} />
    </>
  );
}
