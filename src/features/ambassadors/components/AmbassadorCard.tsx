"use client";

import Image from "next/image";
import { motion } from "framer-motion";

import type { BrandAmbassador } from "@/types/ambassador";

interface AmbassadorCardProps {
  ambassador: BrandAmbassador;
}

export default function AmbassadorCard({ ambassador }: AmbassadorCardProps) {
  return (
    <motion.div
      transition={{
        duration: 0.25,
      }}
      className="group h-full"
    >
      <div
        className="
          h-full
          overflow-hidden
          rounded-3xl
          border
          border-white/10
          bg-white/5
          backdrop-blur-md
          transition-all
          duration-300
          hover:border-cyan-400/40
          hover:shadow-[0_20px_50px_rgba(0,180,255,0.15)]
        "
      >
        <div className="relative aspect-square overflow-hidden">
          <Image
            src={ambassador.Photo.url}
            alt={ambassador.Photo.alternativeText ?? ambassador.Name}
            fill
            sizes="(max-width:768px) 50vw, (max-width:1280px) 33vw, 25vw"
            className="object-cover transition-transform duration-500 group-hover:scale-105"
          />

          <div className="absolute inset-0 bg-linear-to-t from-black/70 via-transparent to-transparent" />
        </div>

        <div className="p-5">
          <h3 className="text-xl font-bold text-white">{ambassador.Name}</h3>

          <p className="mt-2 text-sm font-medium text-cyan-400">
            {ambassador.Position}
          </p>
        </div>
      </div>
    </motion.div>
  );
}
