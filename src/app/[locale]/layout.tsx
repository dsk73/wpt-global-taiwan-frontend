//src/app/[locale]/layout.tsx

import Header from "@/features/header/components/Header";
import { isValidLocale } from "@/config/languages";
import { LocaleProvider, type Locale } from "@/providers";
import { notFound } from "next/navigation";

interface LocaleLayoutProps {
  children: React.ReactNode;
  params: Promise<{
    locale: string;
  }>;
}

export default async function LocaleLayout({
  children,
  params,
}: LocaleLayoutProps) {
  const { locale } = await params;

if (!isValidLocale(locale)) {
  notFound();
}

const currentLocale: Locale = locale;

  return (
    <LocaleProvider locale={currentLocale}>
      <Header />

      <main className="min-h-screen pt-21">{children}</main>
    </LocaleProvider>
  );
}
