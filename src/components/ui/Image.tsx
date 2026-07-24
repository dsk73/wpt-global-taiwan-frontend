"use client";

import NextImage, { ImageProps as NextImageProps } from "next/image";
import { useState } from "react";

import { cn } from "@/lib/utils";
import { getMediaURL } from "@/config/api";

interface ImageProps extends Omit<NextImageProps, "src"> {
  src?: string | null;

  fallbackSrc?: string;

  rounded?: boolean;

  skeleton?: boolean;
}

export function Image({
  src,
  alt,
  className,

  fallbackSrc = "/images/placeholder.webp",

  rounded = false,

  skeleton = true,

  onError,

  onLoad,

  ...props
}: ImageProps) {
  const [imageError, setImageError] = useState(false);

  const [loading, setLoading] = useState(true);

  const imageSrc = imageError ? fallbackSrc : getMediaURL(src);

  return (
    <div
      className={cn(
        "relative overflow-hidden",

        rounded && "rounded-3xl",

        className,
      )}
    >
      {loading && skeleton && (
        <div
          className="absolute inset-0 animate-pulse bg-white/5"
          aria-hidden="true"
        />
      )}

      <NextImage
        {...props}
        src={imageSrc || fallbackSrc}
        alt={alt}
        onLoad={(e) => {
          setLoading(false);

          onLoad?.(e);
        }}
        onError={(e) => {
          setImageError(true);

          setLoading(false);

          onError?.(e);
        }}
        className={cn(
          "transition-opacity duration-500",

          loading ? "opacity-0" : "opacity-100",

          className,
        )}
      />
    </div>
  );
}
