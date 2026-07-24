import * as React from "react";

import { cn } from "@/lib/utils";

import { Badge } from "./Badge";

export interface SectionTitleProps {
  badge?: string;

  title: string;

  subtitle?: string;

  align?: "left" | "center";

  className?: string;
}

export function SectionTitle({
  badge,
  title,
  subtitle,
  align = "center",
  className,
}: SectionTitleProps) {
  return (
    <div
      className={cn(
        "mx-auto mb-14 max-w-3xl",

        align === "center" && "text-center",

        align === "left" && "text-left",

        className,
      )}
    >
      {badge && <Badge className="mb-5">{badge}</Badge>}

      <h2
        className={cn(
          "text-4xl font-bold tracking-tight text-white",

          "md:text-5xl",

          "lg:text-6xl",
        )}
      >
        {title}
      </h2>

      {subtitle && (
        <p
          className={cn(
            "mt-6 text-lg leading-8 text-slate-400",

            "md:text-xl",
          )}
        >
          {subtitle}
        </p>
      )}
    </div>
  );
}
