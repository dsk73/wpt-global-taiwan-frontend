// src/app/[locale]/register/page.tsx

import { permanentRedirect } from "next/navigation";

/**
 * Registration is handled by the external WPT Global
 * registration landing page.
 *
 * This route is intentionally kept as a permanent redirect
 * so existing/internal URLs do not become 404s.
 */
const REGISTER_URL =
  "https://landing.wptglobal.com/zh-TW/invite-bonus-tw?referralCode=I12O4Z";

export default function RegisterPage() {
  permanentRedirect(REGISTER_URL);
}
