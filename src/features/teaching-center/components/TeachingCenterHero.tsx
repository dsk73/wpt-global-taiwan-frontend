"use client";

import { motion } from "framer-motion";

import type { TeachingCenterPage } from "@/types/teaching-guide";

interface TeachingCenterHeroProps {
  page: TeachingCenterPage;
}

export default function TeachingCenterHero({ page }: TeachingCenterHeroProps) {
  return (
    <section className="relative overflow-hidden bg-linear-to-b from-zinc-950 via-zinc-900 to-black">
      <div className="mx-auto flex min-h-85 max-w-7xl flex-col items-center justify-center px-6 py-24 text-center lg:min-h-105">
        <motion.div
          initial={{ opacity: 0, y: 24 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5 }}
          className="max-w-4xl"
        >
          <h1 className="text-4xl font-bold tracking-tight text-white md:text-5xl lg:text-6xl">
            {page.HeroTitle}
          </h1>

          <div
            className="prose prose-invert mx-auto mt-6 max-w-3xl text-lg leading-8 text-zinc-300"
            dangerouslySetInnerHTML={{
              __html: page.HeroSubtitle,
            }}
          />
        </motion.div>
      </div>
    </section>
  );
}
