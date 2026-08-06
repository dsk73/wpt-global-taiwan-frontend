"use client";

import { useEffect, useRef, useState } from "react";

import { Check, CheckCircle2, Copy, Gift, Sparkles } from "lucide-react";

import { Button } from "@/components/ui";
import { getMediaUrl } from "@/lib/media";
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
  const [copied, setCopied] = useState(false);

  const timeoutRef = useRef<ReturnType<typeof setTimeout> | null>(null);

  useEffect(() => {
    return () => {
      if (timeoutRef.current) {
        clearTimeout(timeoutRef.current);
      }
    };
  }, []);

  if (!promotion) return null;

  // Safe after the null check above.
  const referralCode = promotion.ReferralCode ?? "";

  async function handleCopy() {
    if (!referralCode) return;

    try {
      await navigator.clipboard.writeText(referralCode);

      setCopied(true);

      if (timeoutRef.current) {
        clearTimeout(timeoutRef.current);
      }

      timeoutRef.current = setTimeout(() => {
        setCopied(false);
      }, 5000);
    } catch (error) {
      console.error("Failed to copy referral code.", error);
    }
  }

  return (
    <aside
      className={cn(
        "relative w-full max-w-115 overflow-hidden rounded-3xl",
        "border border-cyan-400/15",
        "bg-[#0A0F1DE6] backdrop-blur-2xl",
        "shadow-[0_25px_80px_rgba(0,0,0,0.55)]",
        className,
      )}
    >
      {/* Background Glow */}

      <div className="absolute inset-0 bg-linear-to-br from-cyan-500/5 via-transparent to-violet-500/5" />

      <div className="relative z-10 p-6">
        {/* Badge */}

        {promotion.Badge && (
          <div className="mb-5 inline-flex items-center gap-2 rounded-full bg-cyan-500/15 px-3 py-1 text-[11px] font-semibold uppercase tracking-wider text-cyan-300">
            <Sparkles className="h-3.5 w-3.5" />
            {promotion.Badge}
          </div>
        )}

        {/* Title */}

        <h3 className="text-[2rem] font-bold leading-[1.15] text-white">
          {promotion.CardTitle}
        </h3>

        {/* Referral Code */}

        <div className="mt-4 mb-4 rounded-2xl border border-cyan-500/25 bg-[#0B1222] p-5">
          <p className="mb-2 text-[11px] uppercase tracking-[0.25em] text-slate-400">
            Referral Code
          </p>

          <div className="flex items-center justify-between gap-4">
            <span className="truncate text-3xl font-black tracking-widest text-cyan-300">
              {referralCode}
            </span>

            <Button
              size="sm"
              onClick={handleCopy}
              className={cn(
                "h-11 min-w-27 px-4 text-sm transition-all duration-300",
                copied ? "bg-emerald-600 text-white hover:bg-emerald-700" : "",
              )}
              variant={copied ? undefined : "secondary"}
            >
              {copied ? (
                <>
                  <Check className="mr-2 h-4 w-4" />
                  Copied
                </>
              ) : (
                <>
                  <Copy className="mr-2 h-4 w-4" />
                  Copy
                </>
              )}
            </Button>
          </div>
        </div>

        {/* Benefits */}

        {promotion.Benefits.length > 0 && (
          <div>
            {promotion.Benefits.map((benefit, index) => (
              <div key={benefit.id}>
                <div className="flex items-start gap-2 py-3">
                  <div className="flex h-10 w-10 shrink-0 items-center justify-center rounded-lg bg-cyan-500/15">
                    {benefit.Icon ? (
                      // eslint-disable-next-line @next/next/no-img-element
                      <img
                        src={getMediaUrl(benefit.Icon.url)}
                        alt={benefit.Title ?? ""}
                        className="h-5 w-5 object-contain"
                      />
                    ) : (
                      <Gift className="h-5 w-5 text-cyan-300" />
                    )}
                  </div>

                  <div className="min-w-0 flex-1">
                    <h4 className="text-[15px] font-semibold text-white">
                      {benefit.Title}
                    </h4>

                    <p className="mt-1 text-sm leading-5 text-slate-400">
                      {benefit.Description}
                    </p>
                  </div>
                </div>

                {index !== promotion.Benefits.length - 1 && (
                  <div className="border-b border-slate-700/60" />
                )}
              </div>
            ))}
          </div>
        )}

        {/* Countdown */}

        {promotion.ShowCountdown && (
          <div className="mt-4 flex items-center gap-2 rounded-xl border border-emerald-500/30 bg-emerald-900/20 px-4 py-3 text-sm text-emerald-300">
            <CheckCircle2 className="h-4 w-4 shrink-0" />
            <span>{promotion.CountdownText}</span>
          </div>
        )}
      </div>
    </aside>
  );
}
