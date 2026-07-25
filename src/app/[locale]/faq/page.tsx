import type { Metadata } from "next";

import { notFound } from "next/navigation";
import Footer from "@/features/footer/components/Footer";
import { FAQHero, FAQSection } from "@/features/faq";
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
        : "Frequently Asked Questions | WPT Global Taiwan",

    description:
      locale === "zh-Hant-TW"
        ? "查看有關 WPT Global Taiwan、付款方式、下載、促銷活動、教學中心等常見問題。"
        : "Find answers to common questions about WPT Global Taiwan, payments, downloads, promotions, teaching center, and more.",
  };
}

export default async function FAQPage({ params }: FAQPageProps) {
  const { locale } = await params;

  const faqs = await fetchFAQs(locale);

  if (!faqs) {
    notFound();
  }

  return (
    <>
      <main className="min-h-screen bg-black">
        <FAQHero
          title={
            locale === "zh-Hant-TW" ? "常見問題" : "Frequently Asked Questions"
          }
          subtitle={
            locale === "zh-Hant-TW"
              ? "快速找到有關 WPT Global Taiwan、付款、下載、促銷活動及更多資訊的解答。"
              : "Find answers to the most frequently asked questions about WPT Global Taiwan."
          }
        />
        <section className="py-16 lg:py-20">
          <FAQSection faqs={faqs} locale={locale} showCategories showSearch />
        </section>
      </main>

      <Footer locale={locale} />
    </>
  );
}
