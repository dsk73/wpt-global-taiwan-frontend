// src/app/[locale]/layout.tsx

import Header from "@/features/header/components/Header";
import Footer from "@/features/footer/components/Footer";

import { isValidLocale } from "@/config/languages";
import { LocaleProvider, type Locale } from "@/providers";
import { notFound } from "next/navigation";

/* ============================================================
   Locale Layout Props
============================================================ */

interface LocaleLayoutProps {
  children: React.ReactNode;
  params: Promise<{
    locale: string;
  }>;
}

/* ============================================================
   Locale Layout
============================================================ */

export default async function LocaleLayout({
  children,
  params,
}: LocaleLayoutProps) {
  const { locale } = await params;

  /* ==========================================================
     Validate Locale
  ========================================================== */

  if (!isValidLocale(locale)) {
    notFound();
  }

  const currentLocale: Locale = locale;

  /* ==========================================================
     Layout
  ========================================================== */

  return (
    <LocaleProvider locale={currentLocale}>
      {/* ======================================================
          HEADER
      ====================================================== */}

      <Header />

      {/* ======================================================
          PAGE CONTENT
      ====================================================== */}

      <main className="min-h-screen pt-21">{children}</main>

      {/* ======================================================
          FOOTER
      ====================================================== */}

      <Footer locale={currentLocale} />
    </LocaleProvider>
  );
}
