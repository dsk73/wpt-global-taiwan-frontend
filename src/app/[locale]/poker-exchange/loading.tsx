export default function PokerExchangeLoading() {
  return (
    <main className="container mx-auto px-4 py-16 lg:px-8">
      <div className="animate-pulse space-y-8">
        <div className="h-12 w-72 rounded bg-slate-800" />

        <div className="aspect-16/7 rounded-3xl bg-slate-800" />

        <div className="grid gap-8 md:grid-cols-2 xl:grid-cols-3">
          {Array.from({ length: 6 }).map((_, index) => (
            <div
              key={index}
              className="overflow-hidden rounded-3xl border border-white/10"
            >
              <div className="aspect-16/10 bg-slate-800" />

              <div className="space-y-4 p-6">
                <div className="h-4 w-32 rounded bg-slate-800" />
                <div className="h-7 w-full rounded bg-slate-800" />
                <div className="h-4 w-full rounded bg-slate-800" />
                <div className="h-4 w-5/6 rounded bg-slate-800" />
              </div>
            </div>
          ))}
        </div>
      </div>
    </main>
  );
}
