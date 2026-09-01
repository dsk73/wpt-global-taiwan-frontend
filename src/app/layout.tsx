// src/app/layout.tsx

import type { Metadata } from "next";

import "./globals.css";

/* ============================================================
   Global SEO Metadata
============================================================ */

export const metadata: Metadata = {
  metadataBase: new URL("https://www.wptglobal.com.tw"),

  title: {
    default: "WPT Global Taiwan",
    template: "%s | WPT Global Taiwan",
  },

  description:
    "Official WPT Global Taiwan website featuring poker tournaments, poker strategy, teaching resources, community content and more.",

  keywords: [
    "WPT Global Taiwan",
    "WPT Global",
    "poker Taiwan",
    "online poker Taiwan",
    "poker tournaments Taiwan",
    "poker strategy",
    "poker community",
  ],

  robots: {
    index: true,
    follow: true,
    googleBot: {
      index: true,
      follow: true,
      "max-image-preview": "large",
      "max-snippet": -1,
      "max-video-preview": -1,
    },
  },

  openGraph: {
    type: "website",
    siteName: "WPT Global Taiwan",
    title: "WPT Global Taiwan",
    description:
      "Official WPT Global Taiwan website featuring poker tournaments, poker strategy, teaching resources, community content and more.",
    locale: "zh_TW",
  },

  twitter: {
    card: "summary_large_image",
    title: "WPT Global Taiwan",
    description:
      "Official WPT Global Taiwan website featuring poker tournaments, poker strategy, teaching resources, community content and more.",
  },
};

/* ============================================================
   Root Layout
============================================================ */

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html
      lang="zh-Hant-TW"
      suppressHydrationWarning
      data-scroll-behavior="smooth"
      className="h-full antialiased"
    >
      <body className="flex min-h-full flex-col bg-[#070B16] text-white">
        {children}
      </body>
    </html>
  );
}
