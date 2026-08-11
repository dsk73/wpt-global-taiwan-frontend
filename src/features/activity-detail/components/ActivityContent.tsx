"use client";

import { motion } from "framer-motion";
import ReactMarkdown from "react-markdown";
import remarkGfm from "remark-gfm";
import rehypeRaw from "rehype-raw";

import { cn } from "@/lib/utils";

interface ActivityContentProps {
  content: string;
  className?: string;
}

export default function ActivityContent({
  content,
  className = "",
}: ActivityContentProps) {
  return (
    <motion.section
      initial={{ opacity: 0, y: 24 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true }}
      transition={{ duration: 0.45 }}
      className={cn(
        "rounded-3xl border border-white/10 bg-white/3 p-6 backdrop-blur-sm sm:p-8 md:p-12",
        className,
      )}
    >
      <article
        className={cn(
          /*
           * ============================================================
           * Base Typography
           * ============================================================
           */

          "prose prose-invert max-w-none",
          "text-white/75",

          /*
           * ============================================================
           * Paragraphs
           * ============================================================
           */

          "prose-p:my-0",
          "prose-p:text-white/75",
          "prose-p:leading-8",
          "prose-p:text-[15px]",
          "sm:prose-p:text-base",

          /*
           * Add a proper blank-line style gap between paragraphs.
           */

          "[&>p+p]:mt-6",

          /*
           * Paragraph spacing after headings.
           */

          "[&>h1+p]:mt-0",
          "[&>h2+p]:mt-0",
          "[&>h3+p]:mt-0",
          "[&>h4+p]:mt-0",

          /*
           * Paragraph spacing before other content blocks.
           */

          "[&>p+ul]:mt-6",
          "[&>p+ol]:mt-6",
          "[&>p+blockquote]:mt-8",
          "[&>p+table]:mt-8",

          /*
           * ============================================================
           * Headings
           * ============================================================
           */

          "prose-headings:font-bold",
          "prose-headings:tracking-tight",
          "prose-headings:text-white",

          /* H1 */

          "prose-h1:mt-0",
          "prose-h1:mb-8",
          "prose-h1:text-3xl",
          "prose-h1:leading-tight",
          "md:prose-h1:text-5xl",

          /* H2 */

          "prose-h2:mt-14",
          "prose-h2:mb-6",
          "prose-h2:text-2xl",
          "prose-h2:leading-tight",
          "md:prose-h2:text-4xl",

          /* H3 */

          "prose-h3:mt-10",
          "prose-h3:mb-5",
          "prose-h3:text-xl",
          "prose-h3:leading-tight",
          "md:prose-h3:text-2xl",

          /* H4 */

          "prose-h4:mt-8",
          "prose-h4:mb-4",
          "prose-h4:text-lg",
          "md:prose-h4:text-xl",

          /*
           * ============================================================
           * Strong / Bold
           * ============================================================
           */

          "prose-strong:font-bold",
          "prose-strong:text-white",

          /*
           * ============================================================
           * Lists
           * ============================================================
           */

          "prose-ul:my-7",
          "prose-ol:my-7",
          "prose-ul:pl-6",
          "prose-ol:pl-6",

          "prose-li:my-2",
          "prose-li:leading-7",
          "prose-li:text-white/75",
          "prose-li:marker:text-(--primary)",

          /*
           * Nested lists.
           */

          "[&_li>ul]:my-2",
          "[&_li>ol]:my-2",
          "[&_li>ul]:pl-5",
          "[&_li>ol]:pl-5",

          /*
           * ============================================================
           * Links
           * ============================================================
           */

          "prose-a:font-medium",
          "prose-a:text-(--primary)",
          "prose-a:underline",
          "prose-a:decoration-(--primary)/30",
          "prose-a:underline-offset-4",
          "prose-a:transition-colors",
          "prose-a:duration-200",
          "hover:prose-a:text-white",
          "hover:prose-a:decoration-(--primary)",

          /*
           * ============================================================
           * Blockquotes
           * ============================================================
           */

          "prose-blockquote:my-8",
          "prose-blockquote:border-l-4",
          "prose-blockquote:border-(--primary)",
          "prose-blockquote:bg-white/[0.04]",
          "prose-blockquote:px-6",
          "prose-blockquote:py-4",
          "prose-blockquote:text-white/70",
          "prose-blockquote:not-italic",

          /*
           * ============================================================
           * Inline Code
           * ============================================================
           */

          "prose-code:rounded-md",
          "prose-code:bg-white/10",
          "prose-code:px-1.5",
          "prose-code:py-0.5",
          "prose-code:text-(--primary)",
          "prose-code:font-normal",
          "prose-code:before:content-none",
          "prose-code:after:content-none",

          /*
           * ============================================================
           * Code Blocks
           * ============================================================
           */

          "prose-pre:my-8",
          "prose-pre:overflow-x-auto",
          "prose-pre:rounded-2xl",
          "prose-pre:border",
          "prose-pre:border-white/10",
          "prose-pre:bg-[#0F172A]",
          "prose-pre:p-5",

          /*
           * ============================================================
           * TABLES
           * ============================================================
           */

          /*
           * Tables stay inside their own scroll container on mobile.
           */

          "[&_table]:w-full",
          "[&_table]:min-w-180",
          "[&_table]:border-separate",
          "[&_table]:border-spacing-0",

          /*
           * Table header.
           */

          "[&_thead_th]:border-b",
          "[&_thead_th]:border-white/10",
          "[&_thead_th]:bg-white/6",
          "[&_thead_th]:px-4",
          "[&_thead_th]:py-4",
          "[&_thead_th]:text-left",
          "[&_thead_th]:text-sm",
          "[&_thead_th]:font-bold",
          "[&_thead_th]:leading-6",
          "[&_thead_th]:text-white",
          "md:[&_thead_th]:px-5",

          /*
           * Table body cells.
           */

          "[&_tbody_td]:border-b",
          "[&_tbody_td]:border-white/[0.07]",
          "[&_tbody_td]:px-4",
          "[&_tbody_td]:py-4",
          "[&_tbody_td]:align-top",
          "[&_tbody_td]:text-sm",
          "[&_tbody_td]:leading-7",
          "[&_tbody_td]:text-white/75",
          "md:[&_tbody_td]:px-5",

          /*
           * Paragraphs inside table cells should NOT receive
           * the large article paragraph spacing.
           */

          "[&_td_p]:my-0",
          "[&_td_p+p]:mt-2",

          /*
           * Table row hover.
           */

          "[&_tbody_tr]:transition-colors",
          "hover:[&_tbody_tr]:bg-white/2.5",

          /*
           * Make raw <br> line breaks look clean.
           */

          "[&_td_br]:block",
          "[&_td_br]:content-['']",
          "[&_td_br]:my-1",

          /*
           * First and last table corners.
           */

          "[&_thead_th:first-child]:rounded-tl-xl",
          "[&_thead_th:last-child]:rounded-tr-xl",

          /*
           * Table strong text.
           */

          "[&_td_strong]:font-bold",
          "[&_td_strong]:text-white",

          /*
           * ============================================================
           * Horizontal Rule
           * ============================================================
           */

          "prose-hr:my-12",
          "prose-hr:border-0",
          "prose-hr:border-t",
          "prose-hr:border-white/10",

          /*
           * ============================================================
           * Images
           * ============================================================
           */

          "prose-img:my-8",
          "prose-img:w-full",
          "prose-img:rounded-2xl",
          "prose-img:border",
          "prose-img:border-white/10",
          "prose-img:shadow-2xl",

          /*
           * ============================================================
           * First / Last Element Cleanup
           * ============================================================
           */

          "[&>h1:first-child]:mt-0",
          "[&>h2:first-child]:mt-0",
          "[&>h3:first-child]:mt-0",
          "[&>p:first-child]:mt-0",

          "[&>p:last-child]:mb-0",
          "[&>ul:last-child]:mb-0",
          "[&>ol:last-child]:mb-0",
          "[&>table:last-child]:mb-0",
        )}
      >
        <ReactMarkdown
          remarkPlugins={[remarkGfm]}
          rehypePlugins={[rehypeRaw]}
          components={{
            /*
             * ==========================================================
             * Responsive Table
             * ==========================================================
             */

            table: ({ children }) => (
              <div className="my-8 w-full overflow-x-auto rounded-2xl border border-white/10 bg-white/2">
                <table>{children}</table>
              </div>
            ),

            /*
             * ==========================================================
             * Table Header
             * ==========================================================
             */

            th: ({ children }) => (
              <th scope="col">{children}</th>
            ),

            /*
             * ==========================================================
             * Table Cell
             * ==========================================================
             */

            td: ({ children }) => <td>{children}</td>,

            /*
             * ==========================================================
             * Paragraph
             * ==========================================================
             */

            p: ({ children }) => (
              <p className="leading-8 text-white/75">{children}</p>
            ),

            /*
             * ==========================================================
             * Horizontal Rule
             * ==========================================================
             */

            hr: () => (
              <hr className="my-12 border-0 border-t border-white/10" />
            ),

            /*
             * ==========================================================
             * BR
             * ==========================================================
             *
             * Explicitly render <br> from Markdown content.
             */

            br: () => <br />,
          }}
        >
          {content}
        </ReactMarkdown>
      </article>
    </motion.section>
  );
}