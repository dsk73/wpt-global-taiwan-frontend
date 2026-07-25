"use client";

import Link from "next/link";
import { motion } from "framer-motion";
import { Apple, Download, Laptop, Monitor, Smartphone } from "lucide-react";

import type { DownloadPage } from "@/types/download";

interface DownloadButtonsProps {
  download: DownloadPage;
}

interface DownloadItem {
  label: string;
  description: string;
  url?: string;
  icon: React.ReactNode;
}

export default function DownloadButtons({ download }: DownloadButtonsProps) {
  const items: DownloadItem[] = [
    {
      label: "Windows",
      description: "Download for Windows",
      url: download.WindowsURL,
      icon: <Monitor className="h-7 w-7" />,
    },
    {
      label: "macOS",
      description: "Download for macOS",
      url: download.MacURL,
      icon: <Laptop className="h-7 w-7" />,
    },
    {
      label: "Android",
      description: "Get it on Android",
      url: download.AndroidURL,
      icon: <Smartphone className="h-7 w-7" />,
    },
    {
      label: "iPhone / iPad",
      description: "Download from App Store",
      url: download.IOSURL,
      icon: <Apple className="h-7 w-7" />,
    },
    {
      label: "Android APK",
      description: "Direct APK Download",
      url: download.APKURL,
      icon: <Download className="h-7 w-7" />,
    },
  ].filter((item) => item.url);

  if (items.length === 0) {
    return null;
  }

  return (
    <section className="py-16">
      <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
        <motion.div
          initial={{ opacity: 0, y: 24 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.45 }}
        >
          <h2 className="mb-10 text-center text-3xl font-bold text-white">
            Download WPT Global
          </h2>

          <div className="grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
            {items.map((item) => (
              <Link
                key={item.label}
                href={item.url!}
                target="_blank"
                rel="noopener noreferrer"
                className="group"
              >
                <div className="flex h-full flex-col rounded-2xl border border-white/10 bg-white/5 p-6 transition-all duration-300 hover:-translate-y-1 hover:border-blue-500 hover:bg-white/10">
                  <div className="mb-5 flex h-14 w-14 items-center justify-center rounded-xl bg-blue-600 text-white">
                    {item.icon}
                  </div>

                  <h3 className="text-xl font-semibold text-white">
                    {item.label}
                  </h3>

                  <p className="mt-2 text-sm text-white/70">
                    {item.description}
                  </p>

                  <div className="mt-6 flex items-center gap-2 font-medium text-blue-400 transition-colors group-hover:text-blue-300">
                    Download
                    <Download className="h-4 w-4" />
                  </div>
                </div>
              </Link>
            ))}
          </div>
        </motion.div>
      </div>
    </section>
  );
}
