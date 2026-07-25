import Link from "next/link";

export default function PokerExchangeNotFound() {
  return (
    <main className="container mx-auto flex min-h-[60vh] items-center justify-center px-4">
      <div className="max-w-xl text-center">
        <h1 className="mb-4 text-5xl font-bold">Article Not Found</h1>

        <p className="mb-8 text-slate-400">
          The Poker Exchange article you are looking for does not exist or has
          been removed.
        </p>

        <Link
          href="/"
          className="inline-flex rounded-full bg-(--primary) px-6 py-3 font-semibold text-black transition hover:opacity-90"
        >
          Back to Home
        </Link>
      </div>
    </main>
  );
}
