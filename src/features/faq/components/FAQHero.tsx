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
    <section className="relative overflow-hidden border-b border-white/10 bg-linear-to-b from-black via-zinc-950 to-black">
      <div className="container mx-auto max-w-6xl px-4 py-20 md:py-28">
        <div className="mx-auto max-w-3xl text-center">
          <div className="mb-6 inline-flex h-16 w-16 items-center justify-center rounded-full border border-(--primary)/30 bg-(--primary)/10">
            <MessageCircleQuestion className="h-8 w-8 text-(--primary)" />
          </div>

          <h1 className="text-4xl font-bold tracking-tight text-white md:text-5xl lg:text-6xl">
            {title}
          </h1>

          <p className="mx-auto mt-6 max-w-2xl text-base leading-8 text-white/70 md:text-lg">
            {subtitle}
          </p>
        </div>
      </div>
    </section>
  );
}
