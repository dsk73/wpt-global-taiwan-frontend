// src/features/payment/components/Payment.tsx

"use client";

import { motion } from "framer-motion";
import { ChevronLeft, ChevronRight } from "lucide-react";

import type { Locale } from "@/providers";
import { cn } from "@/lib/utils";
import type { PaymentMethod } from "@/types/payment";

import { usePayment } from "../hooks/usePayment";
import PaymentCard from "./PaymentCard";

interface PaymentProps {
  payments: PaymentMethod[];
  locale: Locale;
  className?: string;
}

const TITLES: Record<Locale, string> = {
  "zh-Hant-TW": "WPT Global 儲值與付款方式",
  en: "WPT Global Deposit & Payment Methods",
  "ms-MY": "Deposit & Kaedah Pembayaran WPT Global",
};

const SUBTITLES: Record<Locale, string> = {
  "zh-Hant-TW":
    "了解 WPT Global 儲值、入金與付款方式，支援多種安全、快速且可靠的方式，讓您輕鬆完成交易。",
  en: "Explore WPT Global deposit, top-up and payment methods with secure, fast and trusted options for your transactions.",
  "ms-MY":
    "Terokai deposit, tambah nilai dan kaedah pembayaran WPT Global dengan pilihan yang selamat, pantas dan dipercayai untuk transaksi anda.",
};

const EYEBROWS: Record<Locale, string> = {
  "zh-Hant-TW": "WPT GLOBAL 儲值與入金",
  en: "WPT GLOBAL DEPOSIT & TOP-UP",
  "ms-MY": "DEPOSIT & TAMBAH NILAI WPT GLOBAL",
};

export default function Payment({
  payments,
  locale,
  className = "",
}: PaymentProps) {
  const {
    payments: items,
    emblaRef,
    scrollPrev,
    scrollNext,
    scrollTo,
    selectedIndex,
    scrollSnaps,
  } = usePayment(payments);

  if (!items.length) {
    return null;
  }

  return (
    <section
      id="payment-methods"
      className={cn("relative overflow-hidden py-14 lg:py-20", className)}
    >
      {/* Background Glow */}
      <div className="pointer-events-none absolute inset-0 overflow-hidden">
        <div className="absolute left-1/2 top-20 h-72 w-72 -translate-x-1/2 rounded-full bg-blue-500/10 blur-3xl" />
      </div>

      <div className="relative mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
        {/* Header */}
        <motion.div
          initial={{ opacity: 0, x: -30 }}
          whileInView={{ opacity: 1, x: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.5 }}
          className="mb-12"
        >
          <p className="mb-3 text-sm font-semibold uppercase tracking-[0.35em] text-[#8EB8FF]">
            {EYEBROWS[locale]}
          </p>

          <h2 className="text-4xl font-bold text-white md:text-5xl">
            {TITLES[locale]}
          </h2>

          <p className="mt-4 max-w-2xl text-lg leading-8 text-white/70">
            {SUBTITLES[locale]}
          </p>
        </motion.div>

        {/* Carousel */}
        <motion.div
          initial={{ opacity: 0 }}
          whileInView={{ opacity: 1 }}
          viewport={{ once: true }}
          transition={{ delay: 0.15 }}
          className="relative"
        >
          {/* Left Arrow */}
          {scrollSnaps.length > 1 && (
            <button
              onClick={scrollPrev}
              className="
                absolute
                left-0
                top-1/2
                z-20
                hidden
                -translate-x-6
                -translate-y-1/2
                rounded-full
                border
                border-white/10
                bg-black/70
                p-3
                text-white
                backdrop-blur-md
                transition-all
                duration-300
                hover:border-[#d4af37]
                hover:bg-blue-500/20
                lg:flex
              "
            >
              <ChevronLeft size={22} />
            </button>
          )}

          {/* Right Arrow */}
          {scrollSnaps.length > 1 && (
            <button
              onClick={scrollNext}
              className="
                absolute
                right-0
                top-1/2
                z-20
                hidden
                translate-x-6
                -translate-y-1/2
                rounded-full
                border
                border-white/10
                bg-black/70
                p-3
                text-white
                backdrop-blur-md
                transition-all
                duration-300
                hover:border-[#d4af37]
                hover:bg-blue-500/20
                lg:flex
              "
            >
              <ChevronRight size={22} />
            </button>
          )}

          {/* Embla */}
          <div ref={emblaRef} className="overflow-hidden">
            <div className="-ml-4 flex">
              {items.map((payment) => (
                <div
                  key={payment.documentId}
                  className="
                    min-w-0
                    flex-[0_0_100%]
                    pl-4
                    sm:flex-[0_0_50%]
                    lg:flex-[0_0_33.3333%]
                    xl:flex-[0_0_25%]
                  "
                >
                  <PaymentCard payment={payment} locale={locale} />
                </div>
              ))}
            </div>
          </div>
        </motion.div>

        {/* Indicators */}
        {scrollSnaps.length > 1 && (
          <div className="mt-8 flex justify-center gap-3">
            {scrollSnaps.map((_, index) => (
              <button
                key={index}
                onClick={() => scrollTo(index)}
                className={cn(
                  "h-2 rounded-full transition-all duration-300",
                  selectedIndex === index
                    ? "w-8 bg-blue-500"
                    : "w-2 bg-white/30 hover:bg-white/50",
                )}
              />
            ))}
          </div>
        )}
      </div>
    </section>
  );
}
