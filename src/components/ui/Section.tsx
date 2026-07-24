import * as React from "react";

import { cn } from "@/lib/utils";

import { Container } from "./Container";

interface SectionProps extends React.HTMLAttributes<HTMLElement> {
  children: React.ReactNode;

  container?: boolean;

  containerSize?: "default" | "wide" | "narrow";

  as?: React.ElementType;
}

export function Section({
  children,
  className,
  container = true,
  containerSize = "default",
  as: Component = "section",
  ...props
}: SectionProps) {
  return (
    <Component
      className={cn("relative py-14 md:py-18 lg:py-20", className)}
      {...props}
    >
      {container ? (
        <Container size={containerSize}>{children}</Container>
      ) : (
        children
      )}
    </Component>
  );
}
