// src/features/about/components/CoreValuesSection.tsx

import type { AboutPage } from "@/types";

interface CoreValuesSectionProps {
  about: AboutPage;
}

export function CoreValuesSection({ about }: CoreValuesSectionProps) {
  if (!about.CoreValues?.length) {
    return null;
  }

  return (
    <section className="bg-[#07090F] py-16 sm:py-20 lg:py-28">
      <div className="mx-auto max-w-7xl px-6">
        <div className="mb-14 text-center">
          <h2 className="text-3xl font-bold text-white sm:text-4xl lg:text-5xl">
            {about.CoreValuesTitle}
          </h2>
        </div>

        <div className="grid gap-6 sm:grid-cols-2 xl:grid-cols-3">
          {about.CoreValues.map((value) => (
            <div
              key={value.id}
              className="rounded-3xl border border-white/10 bg-white/5 p-8 backdrop-blur-sm transition-all duration-300 hover:border-[#2D7FF9] hover:bg-white/8"
            >
              <div className="mb-6 flex h-14 w-14 items-center justify-center rounded-2xl bg-linear-to-br from-[#2D7FF9] to-[#6A3CFF] text-xl font-bold text-white">
                {value.Title.charAt(0)}
              </div>

              <h3 className="mb-4 text-2xl font-semibold text-white">
                {value.Title}
              </h3>

              <p className="leading-8 text-gray-300">{value.Description}</p>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
