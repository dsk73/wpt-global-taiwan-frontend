// src/app/download/page.tsx

import { permanentRedirect } from "next/navigation";

const DOWNLOAD_URL =
  "https://landing.wptglobal.com/zh-TW/invite-bonus-tw?referralCode=I12O4Z";

export default function DownloadPage() {
  permanentRedirect(DOWNLOAD_URL);
}
