import type { HeroImage, HeroSlide } from "@/types/hero";

/**
 * ============================================================
 * Hero Helpers
 * ============================================================
 *
 * UI helper functions used by Hero components.
 *
 * These helpers should NEVER:
 * - Call APIs
 * - Fetch data
 * - Filter slides
 * - Sort slides
 * - Contain React code
 * ============================================================
 */

/**
 * Returns the most appropriate Hero image.
 *
 * Desktop image has priority.
 * Falls back to mobile image.
 */
export function getHeroImage(
  slide: HeroSlide,
): HeroImage | null {
  return slide.DesktopImage ?? slide.MobileImage ?? null;
}

/**
 * Returns the image URL.
 */
export function getHeroImageUrl(
  slide: HeroSlide,
): string {
  return getHeroImage(slide)?.url ?? "";
}

/**
 * Returns the best available alt text.
 */
export function getHeroImageAlt(
  slide: HeroSlide,
): string {
  return (
    getHeroImage(slide)?.alternativeText ??
    slide.Title ??
    "Hero Banner"
  );
}

/**
 * Returns a safe Hero title.
 */
export function getHeroTitle(
  slide: HeroSlide,
): string {
  return slide.Title ?? "";
}

/**
 * Returns a safe Hero subtitle.
 */
export function getHeroSubtitle(
  slide: HeroSlide,
): string {
  return slide.Subtitle ?? "";
}

/**
 * Returns a safe Hero description.
 */
export function getHeroDescription(
  slide: HeroSlide,
): string {
  return slide.Description ?? "";
}

/**
 * Returns true if a primary CTA exists.
 */
export function hasPrimaryButton(
  slide: HeroSlide,
): boolean {
  return Boolean(
    slide.PrimaryButtonText &&
      slide.PrimaryButtonURL,
  );
}

/**
 * Returns true if a secondary CTA exists.
 */
export function hasSecondaryButton(
  slide: HeroSlide,
): boolean {
  return Boolean(
    slide.SecondaryButtonText &&
      slide.SecondaryButtonURL,
  );
}

/**
 * Returns true if the slide contains any CTA.
 */
export function hasHeroButtons(
  slide: HeroSlide,
): boolean {
  return (
    hasPrimaryButton(slide) ||
    hasSecondaryButton(slide)
  );
}

/**
 * Determines whether a URL is external.
 */
export function isExternalUrl(
  url: string,
): boolean {
  return /^https?:\/\//i.test(url);
}

/**
 * Returns the appropriate target attribute.
 */
export function getLinkTarget(
  url: string,
): "_blank" | "_self" {
  return isExternalUrl(url)
    ? "_blank"
    : "_self";
}

/**
 * Returns the appropriate rel attribute.
 */
export function getLinkRel(
  url: string,
): string | undefined {
  return isExternalUrl(url)
    ? "noopener noreferrer"
    : undefined;
}