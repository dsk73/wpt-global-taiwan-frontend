import type { FooterColumnItem } from "../components/FooterColumn";

/**
 * Returns true if the provided URL points to an external website.
 */
export function isExternalLink(href: string): boolean {
  return /^https?:\/\//i.test(href);
}

/**
 * Returns the current year.
 */
export function getCurrentYear(): number {
  return new Date().getFullYear();
}

/**
 * Returns whether a navigation item matches the current pathname.
 */
export function isActiveFooterLink(
  item: FooterColumnItem,
  pathname: string,
): boolean {
  if (item.href === "/") {
    return pathname === "/";
  }

  return pathname.startsWith(item.href);
}

/**
 * Returns a formatted copyright string.
 */
export function getCopyright(
  companyName: string,
  year: number = getCurrentYear(),
): string {
  return `© ${year} ${companyName}. All Rights Reserved.`;
}