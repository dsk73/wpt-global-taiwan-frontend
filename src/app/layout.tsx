import type { Metadata } from "next";

import "./globals.css";

export const metadata: Metadata = {
  title: "WPT Global Taiwan",
  description: "Official WPT Global Taiwan Website",
};

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
