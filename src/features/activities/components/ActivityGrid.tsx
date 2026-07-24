"use client";

import { motion } from "framer-motion";

import { cn } from "@/lib/utils";
import type { Locale } from "@/providers";
import type { Activity } from "@/types/activity";

import ActivityCard from "./ActivityCard";

interface ActivityGridProps {
  activities: Activity[];
  locale: Locale;
  className?: string;
}

export default function ActivityGrid({
  activities,
  locale,
  className = "",
}: ActivityGridProps) {
  if (!activities.length) {
    return null;
  }

  return (
    <div
      className={cn(
        "grid grid-cols-1 gap-8 md:grid-cols-2 xl:grid-cols-3",
        className,
      )}
    >
      {activities.map((activity, index) => (
        <motion.div
          key={activity.documentId}
          initial={{ opacity: 0, y: 24 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{
            duration: 0.45,
            delay: index * 0.08,
          }}
        >
          <ActivityCard activity={activity} locale={locale} />
        </motion.div>
      ))}
    </div>
  );
}
