//src/app/[locale]/community/error.tsx
"use client";

import { useEffect } from "react";

interface ErrorProps {
  error: Error & {
    digest?: string;
  };
  reset: () => void;
}

export default function Error({ error, reset }: ErrorProps) {
  useEffect(() => {
    console.error(error);
  }, [error]);

  return (
    <main className="flex min-h-screen items-center justify-center bg-black px-6">
      <div className="max-w-lg text-center">
        <h1 className="mb-4 text-4xl font-bold text-white">
          Something went wrong
        </h1>

        <p className="mb-8 text-neutral-400">
          We could not load the community page. Please try again.
        </p>

        <button
          onClick={reset}
          className="rounded-full bg-[#D2B48C] px-6 py-3 font-semibold text-black transition hover:scale-105"
        >
          Try Again
        </button>
      </div>
    </main>
  );
}
