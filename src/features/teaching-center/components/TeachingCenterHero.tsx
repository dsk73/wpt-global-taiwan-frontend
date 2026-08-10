"use client";

import { motion } from "framer-motion";

import type { TeachingCenterPage } from "@/types/teaching-guide";

interface TeachingCenterHeroProps {
  page: TeachingCenterPage;
}

export default function TeachingCenterHero({ page }: TeachingCenterHeroProps) {
  return (
    <section className="relative overflow-hidden">
      {/* Background */}
      <div className="absolute inset-0 bg-[radial-gradient(circle_at_top,rgba(59,130,246,0.15),transparent_70%)]" />

      <div className="relative mx-auto max-w-7xl px-4 py-24 sm:px-6 lg:px-8">
        <motion.div
          initial={{ opacity: 0, y: 24 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5 }}
          className="mx-auto max-w-4xl text-center"
        >
          {page.HeroTitle && (
            <h1 className="text-4xl font-bold leading-tight tracking-tight text-white md:text-6xl">
              {page.HeroTitle}
            </h1>
          )}
        </motion.div>
      </div>
    </section>
  );
}
