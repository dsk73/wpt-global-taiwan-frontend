import * as React from "react";

import { cn } from "@/lib/utils";

export interface CardProps extends React.HTMLAttributes<HTMLDivElement> {
  hover?: boolean;
}

export function Card({ className, hover = true, ...props }: CardProps) {
  return (
    <div
      className={cn(
        "rounded-3xl border border-white/10",
        "bg-white/3",
        "backdrop-blur-md",
        "shadow-xl",
        "transition-all duration-300",

        hover &&
          "hover:-translate-y-1 hover:border-(--primary)/30 hover:shadow-2xl",

        className,
      )}
      {...props}
    />
  );
}
