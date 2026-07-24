const STRAPI_URL =
  process.env.NEXT_PUBLIC_STRAPI_URL ??
  "http://localhost:1338";

/**
 * Returns an absolute media URL.
 */
export function getMediaUrl(
  url?: string | null,
): string {
  if (!url) return "";

  if (url.startsWith("http")) {
    return url;
  }

  return `${STRAPI_URL}${url}`;
}