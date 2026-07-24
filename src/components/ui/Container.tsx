import * as React from "react";

import { cn } from "@/lib/utils";

interface ContainerProps extends React.HTMLAttributes<HTMLDivElement> {
  children: React.ReactNode;

  size?: "default" | "wide" | "narrow";

  as?: React.ElementType;
}

export function Container({
  children,
  className,
  size = "default",
  as: Component = "div",
  ...props
}: ContainerProps) {
  return (
    <Component
      className={cn(
        "mx-auto w-full px-4 sm:px-6 lg:px-8",

        size === "default" && "max-w-7xl",

        size === "wide" && "max-w-[1600px]",

        size === "narrow" && "max-w-5xl",

        className,
      )}
      {...props}
    >
      {children}
    </Component>
  );
}
