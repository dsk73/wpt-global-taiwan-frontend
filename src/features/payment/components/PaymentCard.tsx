"use client";

import Image from "next/image";
import { motion } from "framer-motion";
import { Clock3, Wallet, Globe2 } from "lucide-react";

import type { Locale } from "@/providers";
import type { PaymentMethod } from "@/types/payment";

import {
  formatCurrencies,
  formatDepositRange,
  formatProcessingTime,
} from "../utils/payment.helpers";

interface PaymentCardProps {
  payment: PaymentMethod;
  locale: Locale;
}

const LABELS: Record<
  Locale,
  {
    processing: string;
    deposit: string;
    supported: string;
  }
> = {
  "zh-Hant-TW": {
    processing: "處理時間",
    deposit: "存款範圍",
    supported: "支援貨幣",
  },
  en: {
    processing: "Processing Time",
    deposit: "Deposit Range",
    supported: "Supported Currencies",
  },
  "ms-MY": {
    processing: "Masa Pemprosesan",
    deposit: "Julat Deposit",
    supported: "Mata Wang Disokong",
  },
};

export default function PaymentCard({ payment, locale }: PaymentCardProps) {
  const labels = LABELS[locale];

  return (
    <motion.article
      initial={{ opacity: 0, y: 20 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true }}
      transition={{ duration: 0.4 }}
      className="group flex h-full flex-col overflow-hidden rounded-3xl border border-white/10 bg-white/5 p-5 backdrop-blur-xl transition-all duration-300 hover:border-blue-500/40 hover:bg-white/8 hover:shadow-[0_18px_50px_rgba(212,175,55,0.12)]"
    >
      {/* Logo */}
      <div className="mb-5 flex justify-center">
        <div className="relative flex h-16 w-16 items-center justify-center rounded-2xl bg-white p-3 shadow-lg transition-all duration-300 group-hover:scale-105">
          <Image
            src={payment.Logo.url}
            alt={payment.Logo.alternativeText ?? payment.Name}
            fill
            sizes="64px"
            className="object-contain p-2 transition-transform duration-300 group-hover:scale-110"
          />
        </div>
      </div>

      {/* Name */}
      <h3 className="mb-5 text-center text-lg font-bold leading-tight text-white">
        {payment.Name}
      </h3>

      {/* Divider */}
      <div className="mb-5 h-px bg-linear-to-r from-transparent via-white/10 to-transparent" />

      {/* Processing */}
      <div className="flex items-center gap-2 text-sm">
        <Clock3 size={16} className="shrink-0 text-blue-400" />

        <span className="whitespace-nowrap text-white/60">
          {labels.processing}:
        </span>

        <span className="truncate font-medium text-white">
          {formatProcessingTime(payment.ProcessingTime)}
        </span>
      </div>

      {/* Deposit */}
      <div className="mt-3 flex items-center gap-2 text-sm">
        <Wallet size={16} className="shrink-0 text-blue-400" />

        <span className="whitespace-nowrap text-white/60">
          {labels.deposit}:
        </span>

        <span className="truncate font-semibold text-white">
          {formatDepositRange(payment.MinimumDeposit, payment.MaximumDeposit)}
        </span>
      </div>

      {/* Supported */}
      <div className="mt-3 flex items-center gap-2 text-sm">
        <Globe2 size={16} className="shrink-0 text-blue-400" />

        <span className="whitespace-nowrap text-white/60">
          {labels.supported}:
        </span>

        <span className="break-all text-white">
          {formatCurrencies(payment.SupportedCurrencies)}
        </span>
      </div>

      {/* Bottom Accent */}
      <div className="mt-auto pt-6">
        <div className="h-px bg-linear-to-r from-transparent via-[#d4af37] to-transparent opacity-60 transition-all duration-300 group-hover:opacity-100" />
      </div>
    </motion.article>
  );
}
