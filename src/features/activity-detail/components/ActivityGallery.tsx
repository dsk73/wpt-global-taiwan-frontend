"use client";

import Image from "next/image";
import { motion } from "framer-motion";

import { cn } from "@/lib/utils";
import type { Locale } from "@/providers";
import type { Media } from "@/types/media";

interface ActivityGalleryProps {
  gallery?: Media[] | null;
  locale: Locale;
  className?: string;
}

const TITLE: Record<Locale, string> = {
  "zh-Hant-TW": "活動相簿",
  en: "Gallery",
  "ms-MY": "Galeri",
};

const SUBTITLE: Record<Locale, string> = {
  "zh-Hant-TW": "活動精彩時刻",
  en: "Highlights from the Event",
  "ms-MY": "Sorotan Acara",
};

export default function ActivityGallery({
  gallery,
  locale,
  className = "",
}: ActivityGalleryProps) {
  if (!gallery || gallery.length === 0) {
    return null;
  }

  return (
    <section className={cn("mt-20", className)}>
      {/* Heading */}
      <motion.div
        initial={{ opacity: 0, y: 22 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true }}
        transition={{ duration: 0.45 }}
        className="mb-10"
      >
        <h2 className="text-4xl font-bold text-white">{TITLE[locale]}</h2>

        <p className="mt-3 text-lg text-white/60">{SUBTITLE[locale]}</p>
      </motion.div>

      {/* Gallery Grid */}
      <div className="grid grid-cols-1 gap-6 sm:grid-cols-2 xl:grid-cols-3">
        {gallery.map((image, index) => (
          <motion.div
            key={image.id ?? `${image.url}-${index}`}
            initial={{ opacity: 0, y: 24 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{
              duration: 0.45,
              delay: index * 0.08,
            }}
            className="group relative overflow-hidden rounded-3xl border border-white/10 bg-white/5"
          >
            <div className="relative aspect-[4/3] overflow-hidden">
              <Image
                src={image.url}
                alt={image.alternativeText ?? `Gallery Image ${index + 1}`}
                fill
                sizes="(max-width:768px)100vw,(max-width:1280px)50vw,33vw"
                className="object-cover transition duration-700 group-hover:scale-110"
              />

              {/* Overlay */}
              <div className="absolute inset-0 bg-black/0 transition duration-500 group-hover:bg-black/25" />
            </div>
          </motion.div>
        ))}
      </div>
    </section>
  );
}
