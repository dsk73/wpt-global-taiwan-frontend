import ReactMarkdown from "react-markdown";

import type { AboutPage } from "@/types";

interface MissionSectionProps {
  about: AboutPage;
}

export function MissionSection({ about }: MissionSectionProps) {
  if (!about.Mission?.trim()) return null;

  return (
    <section className="py-16 md:py-20">
      <div className="container mx-auto max-w-5xl px-4">
        <div className="mb-8">
          <h2 className="text-3xl font-bold md:text-4xl">Our Mission</h2>
        </div>

        <div className="prose prose-lg max-w-none dark:prose-invert">
          <ReactMarkdown>{about.Mission}</ReactMarkdown>
        </div>
      </div>
    </section>
  );
}
