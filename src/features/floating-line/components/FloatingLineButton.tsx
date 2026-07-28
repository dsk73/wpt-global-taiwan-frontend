"use client";

import Image from "next/image";
import Link from "next/link";
import { motion } from "framer-motion";

const FloatingLineButton = () => {
  return (
    <motion.div
      initial={{ opacity: 0, y: 24 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{
        duration: 0.4,
        ease: "easeOut",
        delay: 0.5,
      }}
      className="fixed right-4 bottom-5 z-50 md:right-6 md:bottom-6"
    >
      <Link
        href="https://lin.ee/ybdTE8k"
        target="_blank"
        rel="noopener noreferrer"
        aria-label="Official LINE"
        title="Official LINE"
        className="group relative flex"
      >
        {/* Tooltip (Desktop Only) */}
        <span className="pointer-events-none absolute top-1/2 right-full mr-3 hidden -translate-y-1/2 rounded-lg bg-black px-3 py-2 text-sm whitespace-nowrap text-white opacity-0 shadow-lg transition-all duration-300 group-hover:opacity-100 lg:block">
          Official LINE
        </span>

        <motion.div
          whileHover={{ scale: 1.08 }}
          whileTap={{ scale: 0.95 }}
          className="flex size-14 items-center justify-center rounded-full bg-white shadow-xl ring-1 ring-black/5 transition-shadow duration-300 hover:shadow-2xl md:size-16"
        >
          <Image
            src="/logos/line.png"
            alt="Official LINE"
            width={40}
            height={40}
            priority
            className="size-8 object-contain md:size-10"
          />
        </motion.div>
      </Link>
    </motion.div>
  );
};

export default FloatingLineButton;
