// src/app/layout.tsx

import type { Metadata } from "next";

import "./globals.css";

import { SITE_NAME, SITE_URL } from "@/lib/metadata";

/* ============================================================
   GLOBAL SEO CONFIG
============================================================ */

const GLOBAL_TITLE = "WPT Global Taiwan | WPTG Official Portal";

const GLOBAL_DESCRIPTION =
  "WPT Global Taiwan official portal for WPTG Taiwan. Find WPTG registration, download, deposit and top-up tutorials, online poker, Texas Hold'em, latest offers, teaching resources and more.";

/* ============================================================
   GLOBAL SEO METADATA
============================================================ */

export const metadata: Metadata = {
  metadataBase: new URL(SITE_URL),

  applicationName: SITE_NAME,

  title: {
    default: GLOBAL_TITLE,
    template: "%s | WPT Global Taiwan",
  },

  description: GLOBAL_DESCRIPTION,

  keywords: [
    /* Core brand keywords */
    "WPT",
    "WPTG",
    "WPT Global",
    "WPT Global Taiwan",
    "WPTG Taiwan",

    /* Registration */
    "WPT Global Registration",
    "WPTG Registration",

    /* Download */
    "WPT Global Download",
    "WPTG Download",

    /* Deposit / Stored Value / Top-up */
    "WPT Global deposit",
    "WPT Global Stored Value",
    "WPTG stored value",

    /* Offers / Referral */
    "WPT Global Offers",
    "WPT Global Referral Code",

    /* Teaching */
    "WPT Global Teaching",
    "WPTG Teaching",

    /* Poker */
    "WPT Texas Hold'em",
    "WPT Online Poker",
    "WPT Online",

    /* Taiwan search intent */
    "online poker Taiwan",
    "poker Taiwan",
    "Texas Hold'em Taiwan",
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

    siteName: SITE_NAME,

    title: GLOBAL_TITLE,

    description: GLOBAL_DESCRIPTION,

    url: SITE_URL,

    locale: "zh_TW",
  },

  twitter: {
    card: "summary_large_image",

    title: GLOBAL_TITLE,

    description: GLOBAL_DESCRIPTION,
  },

  formatDetection: {
    telephone: false,
    email: false,
    address: false,
  },
};

/* ============================================================
   ROOT LAYOUT
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
