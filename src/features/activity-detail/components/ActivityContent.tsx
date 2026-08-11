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

/**
 * Determines whether a Markdown line is a structural line.
 *
 * Structural lines are kept together because they have special
 * Markdown meaning:
 *
 * - headings
 * - lists
 * - tables
 * - blockquotes
 * - code fences
 */
function isStructuralLine(line: string): boolean {
  const trimmed = line.trim();

  if (!trimmed) return true;

  /*
   * Markdown headings
   */

  if (/^#{1,6}\s+/.test(trimmed)) {
    return true;
  }

  /*
   * Unordered lists
   */

  if (/^[-*+]\s+/.test(trimmed)) {
    return true;
  }

  /*
   * Ordered lists
   */

  if (/^\d+[.)]\s+/.test(trimmed)) {
    return true;
  }

  /*
   * Blockquotes
   */

  if (/^>\s?/.test(trimmed)) {
    return true;
  }

  /*
   * Tables
   */

  if (trimmed.startsWith("|") && trimmed.endsWith("|")) {
    return true;
  }

  /*
   * Markdown table separator
   */

  if (/^\|?[\s:-]+(\|[\s:-]+)+\|?$/.test(trimmed)) {
    return true;
  }

  /*
   * Code fences
   */

  if (/^(```|~~~)/.test(trimmed)) {
    return true;
  }

  /*
   * Horizontal rules
   */

  if (/^([-*_])(?:\s*\1){2,}$/.test(trimmed)) {
    return true;
  }

  return false;
}

/**
 * Normalizes Strapi Markdown without requiring custom [NL] or <nl>
 * markers.
 *
 * The important behavior here is:
 *
 * Consecutive normal text lines are automatically separated into
 * Markdown paragraphs.
 *
 * Structural Markdown such as lists, tables, headings and code
 * blocks is preserved.
 */
function normalizeMarkdown(content: string): string {
  if (!content) return "";

  const normalized = content.replace(/\r\n/g, "\n").replace(/\r/g, "\n").trim();

  if (!normalized) return "";

  const lines = normalized.split("\n");

  const output: string[] = [];

  let insideCodeBlock = false;
  let previousWasProse = false;

  for (let index = 0; index < lines.length; index += 1) {
    const rawLine = lines[index];
    const line = rawLine.trimEnd();

    const trimmed = line.trim();

    /*
     * ================================================================
     * Code block handling
     * ================================================================
     */

    if (/^(```|~~~)/.test(trimmed)) {
      if (previousWasProse && output.length > 0) {
        output.push("");
      }

      output.push(line);

      insideCodeBlock = !insideCodeBlock;
      previousWasProse = false;

      continue;
    }

    /*
     * Everything inside a code block must remain untouched.
     */

    if (insideCodeBlock) {
      output.push(line);
      previousWasProse = false;
      continue;
    }

    /*
     * ================================================================
     * Existing blank line
     * ================================================================
     */

    if (!trimmed) {
      /*
       * Avoid creating excessive blank lines.
       */

      if (output.length > 0 && output[output.length - 1] !== "") {
        output.push("");
      }

      previousWasProse = false;

      continue;
    }

    const structural = isStructuralLine(line);

    /*
     * ================================================================
     * Structural Markdown
     * ================================================================
     *
     * Headings, lists, tables, blockquotes etc. are kept as their
     * own Markdown structures.
     */

    if (structural) {
      /*
       * If normal prose came immediately before a structural block,
       * insert a blank line.
       */

      if (previousWasProse && output.length > 0) {
        output.push("");
      }

      output.push(line);

      previousWasProse = false;

      continue;
    }

    /*
     * ================================================================
     * Normal prose
     * ================================================================
     *
     * This is the important part.
     *
     * If Strapi gives us:
     *
     * Paragraph one
     * Paragraph two
     * Paragraph three
     *
     * we transform it into:
     *
     * Paragraph one
     *
     * Paragraph two
     *
     * Paragraph three
     *
     * so ReactMarkdown creates separate <p> elements.
     */

    if (previousWasProse) {
      output.push("");
    }

    output.push(line);

    previousWasProse = true;
  }

  /*
   * ================================================================
   * Cleanup
   * ================================================================
   */

  return output
    .join("\n")
    .replace(/\n{3,}/g, "\n\n")
    .trim();
}

export default function ActivityContent({
  content,
  className = "",
}: ActivityContentProps) {
  const normalizedContent = normalizeMarkdown(content);

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
           * Separate paragraphs.
           *
           * The normalizer creates actual Markdown paragraph blocks.
           */

          "[&>p+p]:mt-6",

          /*
           * ============================================================
           * Headings
           * ============================================================
           */

          "prose-headings:font-bold",
          "prose-headings:tracking-tight",
          "prose-headings:text-white",

          /*
           * H1
           */

          "prose-h1:mt-0",
          "prose-h1:mb-6",
          "prose-h1:text-2xl",
          "prose-h1:leading-tight",
          "md:prose-h1:text-3xl",

          /*
           * H2
           */

          "prose-h2:mt-8",
          "prose-h2:mb-5",
          "prose-h2:text-xl",
          "prose-h2:leading-tight",
          "md:prose-h2:text-2xl",

          /*
           * H3
           */

          "prose-h3:mt-7",
          "prose-h3:mb-4",
          "prose-h3:text-lg",
          "prose-h3:leading-tight",
          "md:prose-h3:text-xl",

          /*
           * H4
           */

          "prose-h4:mt-6",
          "prose-h4:mb-4",
          "prose-h4:text-base",
          "md:prose-h4:text-lg",

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

          "prose-ul:my-5",
          "prose-ol:my-5",

          /*
           * Keep bullet inside content area.
           */

          "[&>ul]:pl-5",
          "[&>ol]:pl-5",

          /*
           * Always use disc bullets.
           */

          "[&_ul]:list-disc",
          "[&_ol]:list-disc",

          /*
           * List items.
           */

          "prose-li:my-2",
          "prose-li:leading-7",
          "prose-li:text-[15px]",
          "prose-li:text-white/75",
          "sm:prose-li:text-base",
          "prose-li:marker:text-(--primary)",

          /*
           * Nested lists.
           */

          "[&_li>ul]:my-2",
          "[&_li>ol]:my-2",
          "[&_li>ul]:pl-5",
          "[&_li>ol]:pl-5",
          "[&_li>ul]:list-disc",
          "[&_li>ol]:list-disc",

          /*
           * ============================================================
           * Spacing between blocks
           * ============================================================
           */

          "[&>ul+h2]:mt-8",
          "[&>ol+h2]:mt-8",

          "[&>ul+h3]:mt-7",
          "[&>ol+h3]:mt-7",

          "[&>p+h2]:mt-8",
          "[&>p+h3]:mt-7",

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
           *
           * Existing table structure is preserved.
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
           * Paragraphs inside table cells.
           */

          "[&_td_p]:my-0",
          "[&_td_p+p]:mt-2",

          /*
           * Table row hover.
           */

          "[&_tbody_tr]:transition-colors",
          "hover:[&_tbody_tr]:bg-white/2.5",

          /*
           * <br> inside table cells.
           */

          "[&_td_br]:block",
          "[&_td_br]:content-['']",
          "[&_td_br]:my-1",

          /*
           * Table corners.
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

          "prose-hr:my-10",
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

            th: ({ children }) => <th scope="col">{children}</th>,

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
              <p className="my-0 text-[15px] leading-8 text-white/75 sm:text-base">
                {children}
              </p>
            ),

            /*
             * ==========================================================
             * H1
             * ==========================================================
             */

            h1: ({ children }) => (
              <h1 className="mt-0 mb-6 text-2xl font-bold leading-tight tracking-tight text-white md:text-3xl">
                {children}
              </h1>
            ),

            /*
             * ==========================================================
             * H2
             * ==========================================================
             */

            h2: ({ children }) => (
              <h2 className="mt-8! mb-5! text-xl font-bold leading-tight tracking-tight text-white md:text-2xl">
                {children}
              </h2>
            ),

            /*
             * ==========================================================
             * H3
             * ==========================================================
             */

            h3: ({ children }) => (
              <h3 className="mt-7 mb-4 text-lg font-bold leading-tight tracking-tight text-white md:text-xl">
                {children}
              </h3>
            ),

            /*
             * ==========================================================
             * H4
             * ==========================================================
             */

            h4: ({ children }) => (
              <h4 className="mt-6 mb-4 text-base font-bold leading-tight tracking-tight text-white md:text-lg">
                {children}
              </h4>
            ),

            /*
             * ==========================================================
             * Unordered List
             * ==========================================================
             */

            ul: ({ children }) => (
              <ul className="my-5 list-disc pl-5">{children}</ul>
            ),

            /*
             * ==========================================================
             * Ordered List
             * ==========================================================
             *
             * Ordered Markdown lists intentionally become disc bullets.
             */

            ol: ({ children }) => (
              <ul className="my-5 list-disc pl-5">{children}</ul>
            ),

            /*
             * ==========================================================
             * List Item
             * ==========================================================
             */

            li: ({ children }) => (
              <li className="my-2 pl-0 text-[15px] leading-7 text-white/75 sm:text-base">
                {children}
              </li>
            ),

            /*
             * ==========================================================
             * Horizontal Rule
             * ==========================================================
             */

            hr: () => (
              <hr className="my-10 border-0 border-t border-white/10" />
            ),

            /*
             * ==========================================================
             * BR
             * ==========================================================
             *
             * Used mainly for <br> inside table cells.
             */

            br: () => <br />,
          }}
        >
          {normalizedContent}
        </ReactMarkdown>
      </article>
    </motion.section>
  );
}
