import Link from "next/link";

export default function NotFound() {
  return (
    <main className="container flex min-h-[60vh] items-center justify-center py-20">
      <div className="max-w-lg text-center">
        <h1 className="text-5xl font-bold text-white">Guide Not Found</h1>

        <p className="mt-4 text-lg text-white/70">
          The teaching guide you are looking for does not exist or may have been
          removed.
        </p>

        <Link
          href="/zh-Hant-TW/teaching-center"
          className="mt-8 inline-flex rounded-full bg-(--primary) px-6 py-3 font-semibold text-black transition hover:opacity-90"
        >
          Back to Teaching Center
        </Link>
      </div>
    </main>
  );
}
