export default function Loading() {
  return (
    <main className="min-h-screen bg-black pt-28">
      <div className="container mx-auto px-4">
        <div className="animate-pulse">
          <div className="mb-6 h-12 w-72 rounded bg-white/10" />

          <div className="mb-12 h-6 w-full max-w-3xl rounded bg-white/10" />

          <div className="mb-16 h-[420px] rounded-3xl bg-white/10" />

          <div className="grid gap-8 sm:grid-cols-2 xl:grid-cols-3">
            {Array.from({ length: 6 }).map((_, index) => (
              <div
                key={index}
                className="overflow-hidden rounded-2xl border border-white/10 bg-white/5"
              >
                <div className="aspect-[16/9] bg-white/10" />

                <div className="space-y-4 p-6">
                  <div className="h-4 w-28 rounded bg-white/10" />
                  <div className="h-8 rounded bg-white/10" />
                  <div className="h-20 rounded bg-white/10" />
                  <div className="h-10 w-36 rounded bg-white/10" />
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>
    </main>
  );
}
