"use client";

import * as React from "react";
import { Slot } from "@radix-ui/react-slot";
import { cva, type VariantProps } from "class-variance-authority";

import { cn } from "@/lib/utils";

const buttonVariants = cva(
  [
    "inline-flex items-center justify-center gap-2",
    "rounded-xl",
    "font-semibold",
    "transition-all duration-300",
    "focus-visible:outline-none",
    "focus-visible:ring-2",
    "focus-visible:ring-offset-2",
    "disabled:pointer-events-none",
    "disabled:opacity-50",
    "select-none",
    "cursor-pointer",
    "whitespace-nowrap",
    "shrink-0",
  ],
  {
    variants: {
      variant: {
        primary: "bg-(--primary) text-black shadow-lg hover:opacity-90",

        secondary:
          "border border-white/15 bg-white/5 text-white hover:bg-white/10",

        outline:
          "border border-(--primary) bg-transparent text-(--primary) hover:bg-(--primary) hover:text-black",

        ghost: "bg-transparent text-white hover:bg-white/10",

        danger: "bg-red-600 text-white hover:bg-red-700",
      },

      size: {
        sm: "h-10 px-4 text-sm",

        md: "h-12 px-6 text-base",

        lg: "h-14 px-8 text-lg",

        icon: "h-12 w-12 p-0",
      },

      fullWidth: {
        true: "w-full",

        false: "",
      },
    },

    defaultVariants: {
      variant: "primary",
      size: "md",
      fullWidth: false,
    },
  },
);

export interface ButtonProps
  extends
    React.ButtonHTMLAttributes<HTMLButtonElement>,
    VariantProps<typeof buttonVariants> {
  asChild?: boolean;

  loading?: boolean;

  leftIcon?: React.ReactNode;

  rightIcon?: React.ReactNode;
}

const Button = React.forwardRef<HTMLButtonElement, ButtonProps>(
  (
    {
      className,
      variant,
      size,
      fullWidth,
      asChild = false,
      loading = false,
      leftIcon,
      rightIcon,
      children,
      disabled,
      type = "button",
      ...props
    },
    ref,
  ) => {

    if (asChild) {
  return (
    <Slot
      className={cn(
        buttonVariants({
          variant,
          size,
          fullWidth,
        }),
        className,
      )}
    >
      {children}
    </Slot>
  );
}

return (
  <button
    ref={ref}
    type={type}
    aria-busy={loading}
    disabled={disabled || loading}
    className={cn(
      buttonVariants({
        variant,
        size,
        fullWidth,
      }),
      className,
    )}
    {...props}
  >
    {loading ? (
      <svg
        className="h-4 w-4 animate-spin"
        viewBox="0 0 24 24"
        fill="none"
        aria-hidden="true"
      >
        <circle
          cx="12"
          cy="12"
          r="10"
          stroke="currentColor"
          strokeOpacity="0.25"
          strokeWidth="4"
        />
        <path
          d="M22 12a10 10 0 0 0-10-10"
          stroke="currentColor"
          strokeWidth="4"
          strokeLinecap="round"
        />
      </svg>
    ) : (
      leftIcon
    )}

    {children}

    {!loading && rightIcon}
  </button>
);
  },
);

Button.displayName = "Button";

export { Button, buttonVariants };
