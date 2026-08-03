//src/features/community/components/CommunityFooterText.tsx

"use client";

import ReactMarkdown from "react-markdown";

interface CommunityFooterTextProps {
  content: string;
}

export default function CommunityFooterText({
  content,
}: CommunityFooterTextProps) {
  if (!content) {
    return null;
  }

  return (
    <section className="px-6 pb-20 pt-8 md:px-8 md:pb-24">
      <div className="mx-auto max-w-4xl">
        <div className="prose prose-neutral dark:prose-invert mx-auto max-w-none text-center">
          <ReactMarkdown>{content}</ReactMarkdown>
        </div>
      </div>
    </section>
  );
}
