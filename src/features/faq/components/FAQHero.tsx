import { MessageCircleQuestion } from "lucide-react";

interface FAQHeroProps {
  title?: string;
  subtitle?: string;
}

export default function FAQHero({
  title = "Frequently Asked Questions",
  subtitle = "Find answers to the most common questions about WPT Global Taiwan, promotions, gameplay, payments, teaching center, and more.",
}: FAQHeroProps) {
  return (
    <section className="relative overflow-hidden pt-32 pb-20">
      {/* Background Glow */}
      <div className="absolute inset-0 bg-[radial-gradient(circle_at_top,rgba(59,130,246,0.18),transparent_70%)]" />

      <div className="relative mx-auto max-w-7xl px-4 text-center sm:px-6 lg:px-8">
        <div className="inline-flex h-18 w-18 items-center justify-center rounded-full border border-blue-500/30 bg-blue-500/10">
          <MessageCircleQuestion className="h-9 w-9 text-blue-400" />
        </div>

        <h1 className="mt-8 text-4xl font-bold text-white md:text-5xl lg:text-6xl">
          {title}
        </h1>

        <p className="mx-auto mt-6 max-w-3xl text-lg leading-8 text-white/70">
          {subtitle}
        </p>
      </div>
    </section>
  );
}
