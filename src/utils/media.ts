const STRAPI_URL =
  process.env.NEXT_PUBLIC_STRAPI_URL || "http://localhost:1337";

export function getMedia(url?: string | null) {
  if (!url) return "/images/placeholder.png";

  if (url.startsWith("http")) return url;

  return `${STRAPI_URL}${url}`;
}