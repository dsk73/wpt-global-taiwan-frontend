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
    <main className="container flex min-h-[60vh] items-center justify-center py-20">
      <div className="max-w-lg text-center">
        <h1 className="text-4xl font-bold text-white">Something went wrong</h1>

        <p className="mt-4 text-white/70">
          We could not load the Teaching Center at the moment. Please try again.
        </p>

        <button
          onClick={reset}
          className="mt-8 rounded-full bg-(--primary) px-6 py-3 font-semibold text-black transition hover:opacity-90"
        >
          Try Again
        </button>
      </div>
    </main>
  );
}
