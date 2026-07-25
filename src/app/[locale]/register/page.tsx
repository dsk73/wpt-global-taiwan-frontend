import type { Metadata } from "next";
import { notFound } from "next/navigation";

import { getMediaURL } from "@/config/api";

import Footer from "@/features/footer/components/Footer";
import Header from "@/features/header/components/Header";
import {
  RegisterContent,
  RegisterHero,
  RegisterSteps,
} from "@/features/register";

import type { Locale } from "@/providers";
import { fetchRegisterPage } from "@/services";

interface RegisterPageProps {
  params: Promise<{
    locale: Locale;
  }>;
}

export async function generateMetadata({
  params,
}: RegisterPageProps): Promise<Metadata> {
  const { locale } = await params;

  const register = await fetchRegisterPage(locale);

  if (!register) {
    return {
      title: "Register",
    };
  }

  const seo = register.SEO;

  return {
    title: seo?.MetaTitle || register.Title,
    description: seo?.MetaDescription,

    keywords: seo?.Keywords?.split(",")
      .map((keyword) => keyword.trim())
      .filter(Boolean),

    alternates: seo?.CanonicalURL
      ? {
          canonical: seo.CanonicalURL,
        }
      : undefined,

    robots: seo?.Robots || undefined,

    openGraph: {
      title: seo?.MetaTitle || register.Title,
      description: seo?.MetaDescription,
      images: seo?.OGImage?.url ? [getMediaURL(seo.OGImage.url)] : undefined,
    },
  };
}

export default async function RegisterPage({ params }: RegisterPageProps) {
  const { locale } = await params;

  const register = await fetchRegisterPage(locale);

  if (!register) {
    notFound();
  }

  return (
    <>
      <Header />

      <main className="min-h-screen">
        <RegisterHero register={register} />

        <RegisterContent register={register} />

        <RegisterSteps register={register} />
      </main>

      <Footer locale={locale} />
    </>
  );
}
