// src/app/[locale]/download/page.tsx

import { permanentRedirect } from "next/navigation";

/**
 * Download is handled by the external WPT Global
 * landing page.
 *
 * This route is intentionally kept as a permanent redirect
 * so existing/internal URLs do not become 404s.
 */
const DOWNLOAD_URL =
  "https://landing.wptglobal.com/zh-TW/invite-bonus-tw?referralCode=I12O4Z";

export default function DownloadPage() {
  permanentRedirect(DOWNLOAD_URL);
}
