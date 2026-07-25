"use client";

import { motion } from "framer-motion";

import { Community } from "@/types/community";
import CommunityCard from "./CommunityCard";
import type { Locale } from "@/providers";

interface CommunityGridProps {
  communities: Community[];
  locale: Locale;
}

export default function CommunityGrid({
  communities,
  locale,
}: CommunityGridProps) {
  if (!communities.length) {
    return (
      <section className="py-16">
        <div className="container mx-auto px-4 text-center">
          <h2 className="text-2xl font-semibold text-white">
            No Communities Found
          </h2>

          <p className="mt-3 text-neutral-400">
            Please check back later for new community updates.
          </p>
        </div>
      </section>
    );
  }

  return (
    <section className="py-16">
      <div className="container mx-auto px-4">
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ duration: 0.4 }}
          className="grid gap-8 sm:grid-cols-2 xl:grid-cols-3"
        >
          {communities.map((community) => (
            <CommunityCard
              key={community.documentId}
              community={community}
              locale={locale}
            />
          ))}
        </motion.div>
      </div>
    </section>
  );
}
