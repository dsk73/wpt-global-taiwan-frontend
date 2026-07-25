//src/app/[locale]/community/not-found.tsx

import Link from "next/link";

import { routes } from "@/lib/routes";

export default function NotFound() {
  // Fallback locale because params are not available in not-found.tsx
  const locale = "zh-Hant-TW";

  return (
    <main className="flex min-h-screen items-center justify-center bg-black px-6">
      <div className="max-w-xl text-center">
        <h1 className="mb-4 text-5xl font-bold text-white">
          Community Not Found
        </h1>

        <p className="mb-8 text-lg text-neutral-400">
          The community page you are looking for does not exist or may have been
          removed.
        </p>

        <Link
          href={routes.community(locale)}
          className="inline-flex rounded-full bg-[#D2B48C] px-6 py-3 font-semibold text-black transition hover:scale-105"
        >
          Back to Community
        </Link>
      </div>
    </main>
  );
}
