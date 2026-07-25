//src/features/content-detail/helpers.ts

import type { Locale } from "@/providers";
import type { Media } from "@/types/media";

import { BreadcrumbItem } from "./types";

/**
 * Returns the banner image if available,
 * otherwise falls back to the thumbnail.
 */
export function getHeroImage(
  banner?: Media | null,
  thumbnail?: Media | null,
): Media | null {
  return banner ?? thumbnail ?? null;
}

/**
 * Formats publish date according to locale.
 */
export function formatPublishDate(
  date?: string | null,
  locale: Locale = "en",
): string {
  if (!date) {
    return "";
  }

  try {
    return new Date(date).toLocaleDateString(locale, {
      year: "numeric",
      month: "long",
      day: "numeric",
    });
  } catch {
    return "";
  }
}

/**
 * Formats reading time.
 */
export function formatReadingTime(
  minutes?: number | null,
): string {
  if (!minutes || minutes <= 0) {
    return "";
  }

  return `${minutes} min read`;
}

/**
 * Filters invalid breadcrumb items.
 */
export function buildBreadcrumbs(
  items: Array<BreadcrumbItem | null | undefined>,
): BreadcrumbItem[] {
  return items.filter(
    (item): item is BreadcrumbItem =>
      Boolean(item?.label?.trim()),
  );
}

/**
 * Returns first available tag.
 */
export function getPrimaryTag(
  tags?: string[] | null,
): string | null {
  if (!tags?.length) {
    return null;
  }

  return tags[0];
}

/**
 * Returns gallery only if it contains images.
 */
export function normalizeGallery(
  gallery?: Media[] | null,
): Media[] {
  return gallery?.filter(Boolean) ?? [];
}

/**
 * Safely trims markdown content.
 */
export function normalizeContent(
  content?: string | null,
): string {
  return content?.trim() ?? "";
}

/**
 * Checks whether a gallery exists.
 */
export function hasGallery(
  gallery?: Media[] | null,
): boolean {
  return (gallery?.length ?? 0) > 0;
}

/**
 * Creates a stable React key for gallery items.
 */
export function getGalleryImageKey(
  image: Media,
  index: number,
): string {
  return image.id?.toString() ?? `${image.url}-${index}`;
}