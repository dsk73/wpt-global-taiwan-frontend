"use client";

interface ErrorProps {
  error: Error;
  reset: () => void;
}

export default function PokerExchangeError({ error, reset }: ErrorProps) {
  return (
    <main className="container mx-auto flex min-h-[60vh] items-center justify-center px-4">
      <div className="max-w-lg text-center">
        <h1 className="mb-4 text-4xl font-bold">Something went wrong</h1>

        <p className="mb-8 text-slate-400">
          {error.message ||
            "An unexpected error occurred while loading this page."}
        </p>

        <button
          onClick={reset}
          className="rounded-full bg-(--primary) px-6 py-3 font-semibold text-black transition hover:opacity-90"
        >
          Try Again
        </button>
      </div>
    </main>
  );
}
