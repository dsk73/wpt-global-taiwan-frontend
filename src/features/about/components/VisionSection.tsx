import ReactMarkdown from "react-markdown";

import type { AboutPage } from "@/types";

interface VisionSectionProps {
  about: AboutPage;
}

export function VisionSection({ about }: VisionSectionProps) {
  if (!about.Vision?.trim()) return null;

  return (
    <section className="bg-muted/30 py-16 md:py-20">
      <div className="container mx-auto max-w-5xl px-4">
        <div className="mb-8">
          <h2 className="text-3xl font-bold md:text-4xl">
            Our Vision
          </h2>
        </div>

        <div className="prose prose-lg max-w-none dark:prose-invert">
          <ReactMarkdown>{about.Vision}</ReactMarkdown>
        </div>
      </div>
    </section>
  );
}