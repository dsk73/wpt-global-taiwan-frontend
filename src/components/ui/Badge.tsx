import * as React from "react";
import { cva, type VariantProps } from "class-variance-authority";

import { cn } from "@/lib/utils";

const badgeVariants = cva(
  "inline-flex items-center rounded-full border px-3 py-1 text-xs font-semibold transition-colors",
  {
    variants: {
      variant: {
        primary: "border-(--primary)/30 bg-(--primary)/10 text-(--primary)",

        secondary: "border-white/10 bg-white/5 text-slate-200",

        success: "border-green-500/30 bg-green-500/10 text-green-400",

        danger: "border-red-500/30 bg-red-500/10 text-red-400",

        warning: "border-yellow-500/30 bg-yellow-500/10 text-yellow-300",
      },
    },

    defaultVariants: {
      variant: "primary",
    },
  },
);

export interface BadgeProps
  extends
    React.HTMLAttributes<HTMLDivElement>,
    VariantProps<typeof badgeVariants> {}

export function Badge({ className, variant, ...props }: BadgeProps) {
  return (
    <div className={cn(badgeVariants({ variant }), className)} {...props} />
  );
}
