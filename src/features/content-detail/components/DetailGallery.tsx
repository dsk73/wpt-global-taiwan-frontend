//src/features/content-detail/components/DetailGallery.tsx

"use client";

import Image from "next/image";
import { motion } from "framer-motion";

import { cn } from "@/lib/utils";

import type { DetailGalleryData } from "../types";

import { DEFAULT_ANIMATION_DURATION } from "../constants";

interface DetailGalleryProps {
  data: DetailGalleryData;
  className?: string;
}

export default function DetailGallery({ data, className }: DetailGalleryProps) {
  if (!data.images?.length) {
    return null;
  }

  return (
    <section className={cn("mt-20", className)}>
      <div className="grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
        {data.images.map((image, index) => (
          <motion.div
            key={image.id}
            initial={{ opacity: 0, y: 24 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{
              duration: DEFAULT_ANIMATION_DURATION,
              delay: index * 0.1,
            }}
            className="relative aspect-video overflow-hidden rounded-2xl"
          >
            <Image
              src={image.url}
              alt={image.alternativeText ?? "Gallery Image"}
              fill
              sizes="(max-width:768px)100vw,(max-width:1200px)50vw,33vw"
              className="object-cover transition-transform duration-500 hover:scale-105"
            />
          </motion.div>
        ))}
      </div>
    </section>
  );
}
