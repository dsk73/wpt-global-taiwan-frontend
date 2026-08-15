"use client";

import Link from "next/link";
import { motion } from "framer-motion";

import { cn } from "@/lib/utils";

export interface FooterColumnItem {
  label: string;
  href: string;
  external?: boolean;
}

interface FooterColumnProps {
  title: string;
  items: FooterColumnItem[];
  className?: string;
}

export default function FooterColumn({
  title,
  items,
  className,
}: FooterColumnProps) {
  return (
    <motion.div
      initial={{ opacity: 0, y: 24 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true }}
      transition={{ duration: 0.45 }}
      className={cn("self-start", className)}
    >
      {/* Heading */}
      {title && (
        <h3 className="mb-5 text-lg font-semibold tracking-wide text-white">
          {title}
        </h3>
      )}

      {/* Links */}
      <ul className="flex flex-col gap-3">
        {items.map((item) => (
          <li key={item.label}>
            <Link
              href={item.href}
              target={item.external ? "_blank" : undefined}
              rel={item.external ? "noopener noreferrer" : undefined}
              className="
                inline-flex
                items-center
                text-sm
                leading-6
                text-white/60
                transition-all
                duration-300
                hover:translate-x-1
                hover:text-blue-400
              "
            >
              {item.label}
            </Link>
          </li>
        ))}
      </ul>
    </motion.div>
  );
}
