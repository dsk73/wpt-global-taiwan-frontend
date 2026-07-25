"use client";

import Image from "next/image";
import { motion } from "framer-motion";

import { getMediaURL } from "@/config/api";

import type { DownloadPage } from "@/types/download";

interface DownloadHeroProps {
  download: DownloadPage;
}

export default function DownloadHero({ download }: DownloadHeroProps) {
  const bannerUrl = download.BannerImage?.url
    ? getMediaURL(download.BannerImage.url)
    : null;

  return (
    <section className="relative overflow-hidden">
      <div className="relative h-80 sm:h-95 lg:h-120">
        {bannerUrl ? (
          <Image
            src={bannerUrl}
            alt={download.Title}
            fill
            priority
            sizes="100vw"
            className="object-cover"
          />
        ) : (
          <div className="absolute inset-0 bg-linear-to-r from-[#071120] via-[#0B1830] to-[#071120]" />
        )}

        {/* Dark Overlay */}
        <div className="absolute inset-0 bg-black/55" />

        {/* Bottom Gradient */}
        <div className="absolute inset-x-0 bottom-0 h-40 bg-linear-to-t from-[#071120] to-transparent" />

        {/* Content */}
        <div className="absolute inset-0 flex items-center">
          <div className="mx-auto w-full max-w-7xl px-4 sm:px-6 lg:px-8">
            <motion.div
              initial={{ opacity: 0, y: 24 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6 }}
              className="max-w-3xl"
            >
              <h1 className="text-4xl font-bold tracking-tight text-white sm:text-5xl lg:text-6xl">
                {download.Title}
              </h1>
            </motion.div>
          </div>
        </div>
      </div>
    </section>
  );
}
