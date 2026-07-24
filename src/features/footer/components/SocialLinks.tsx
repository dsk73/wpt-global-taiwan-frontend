"use client";

import Link from "next/link";
import { motion } from "framer-motion";

import { cn } from "@/lib/utils";

export interface SocialLink {
  label: string;
  href: string;
}

interface SocialLinksProps {
  title: string;
  links: SocialLink[];
  className?: string;
}

export default function SocialLinks({
  title,
  links,
  className,
}: SocialLinksProps) {
  return (
    <motion.div
      initial={{ opacity: 0, y: 24 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true }}
      transition={{ duration: 0.45 }}
      className={cn("space-y-6", className)}
    >
      <h3 className="text-lg font-semibold tracking-wide text-white">
        {title}
      </h3>

      <ul className="space-y-4">
        {links.map((link) => (
          <li key={link.label}>
            <Link
              href={link.href}
              target="_blank"
              rel="noopener noreferrer"
              className="inline-flex items-center text-white/60 transition-all duration-300 hover:translate-x-1 hover:text-blue-400"
            >
              {link.label}
            </Link>
          </li>
        ))}
      </ul>
    </motion.div>
  );
}
