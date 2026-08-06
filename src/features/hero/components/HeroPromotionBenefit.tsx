"use client";

import { CheckCircle2, Copy, Gift, Sparkles } from "lucide-react";

import { Button } from "@/components/ui";
import { cn } from "@/lib/utils";
import type { HeroPromotionCard as HeroPromotionCardType } from "@/types/hero";

interface HeroPromotionCardProps {
  promotion: HeroPromotionCardType | null;
  className?: string;
}

export default function HeroPromotionCard({
  promotion,
  className,
}: HeroPromotionCardProps) {
  if (!promotion) return null;

  return (
    <aside
      className={cn(
        "relative w-full max-w-md overflow-hidden rounded-3xl",
        "border border-white/15",
        "bg-white/10 backdrop-blur-xl",
        "shadow-2xl",
        className,
      )}
    >
      {/* Background Glow */}
      <div className="absolute inset-0 bg-linear-to-br from-cyan-500/10 via-transparent to-blue-500/10" />

      <div className="relative z-10 p-7">
        {/* Badge */}

        {promotion.Badge && (
          <div className="mb-5 inline-flex items-center gap-2 rounded-full bg-cyan-500/15 px-4 py-1.5 text-xs font-semibold uppercase tracking-widest text-cyan-300">
            <Sparkles className="h-3.5 w-3.5" />

            {promotion.Badge}
          </div>
        )}

        {/* Title */}

        <h3 className="mb-6 text-2xl font-bold leading-tight text-white">
          {promotion.CardTitle}
        </h3>

        {/* Referral Code */}

        <div className="mb-7 rounded-2xl border border-cyan-400/20 bg-black/25 p-5">
          <p className="mb-2 text-xs uppercase tracking-[0.2em] text-slate-400">
            Referral Code
          </p>

          <div className="flex items-center justify-between gap-3">
            <span className="truncate text-3xl font-black tracking-widest text-cyan-300">
              {promotion.ReferralCode}
            </span>

            <Button
              size="sm"
              variant="secondary"
              className="gap-2 whitespace-nowrap"
            >
              <Copy className="h-4 w-4" />

              Copy
            </Button>
          </div>
        </div>

        {/* Benefits */}

        {promotion.Benefits.length > 0 && (
          <div className="space-y-4">
            {promotion.Benefits.map((benefit) => (
              <div
                key={benefit.id}
                className="flex items-start gap-4 rounded-2xl bg-white/5 p-4 transition-colors duration-300 hover:bg-white/10"
              >
                <div className="flex h-11 w-11 shrink-0 items-center justify-center rounded-xl bg-cyan-500/15">
                  {benefit.Icon ? (
                    // eslint-disable-next-line @next/next/no-img-element
                    <img
                      src={benefit.Icon.url}
                      alt={benefit.Title ?? ""}
                      className="h-6 w-6 object-contain"
                    />
                  ) : (
                    <Gift className="h-5 w-5 text-cyan-300" />
                  )}
                </div>

                <div className="min-w-0">
                  <h4 className="font-semibold text-white">
                    {benefit.Title}
                  </h4>

                  <p className="mt-1 text-sm leading-6 text-slate-300">
                    {benefit.Description}
                  </p>
                </div>
              </div>
            ))}
          </div>
        )}

        {/* Countdown */}

        {promotion.ShowCountdown && (
          <div className="mt-7 flex items-center gap-2 rounded-2xl border border-emerald-500/20 bg-emerald-500/10 px-4 py-3 text-sm text-emerald-300">
            <CheckCircle2 className="h-4 w-4 shrink-0" />

            <span>{promotion.CountdownText}</span>
          </div>
        )}
      </div>
    </aside>
  );
}