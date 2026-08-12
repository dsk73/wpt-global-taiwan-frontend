//src/app/[locale]/legal/terms-and-conditions/LegalContent.tsx
"use client";

import { motion } from "framer-motion";
import ReactMarkdown from "react-markdown";
import remarkGfm from "remark-gfm";
import rehypeRaw from "rehype-raw";

import type { ReactNode } from "react";
import { Children, isValidElement } from "react";

/* ============================================================
   Legal Content Props
============================================================ */

interface LegalContentProps {
  content: string;
}

/* ============================================================
   Extract Plain Text From ReactMarkdown Children
============================================================ */

function extractText(node: ReactNode): string {
  let result = "";

  Children.forEach(node, (child) => {
    if (typeof child === "string" || typeof child === "number") {
      result += String(child);
      return;
    }

    if (isValidElement(child)) {
      const props = child.props as {
        children?: ReactNode;
      };

      result += extractText(props.children);
    }
  });

  return result;
}

/* ============================================================
   Detect Structural Markdown
============================================================ */

function isStructuralLine(line: string): boolean {
  const trimmed = line.trim();

  if (!trimmed) {
    return true;
  }

  /*
   * Markdown headings
   */

  if (/^#{1,6}\s+/.test(trimmed)) {
    return true;
  }

  /*
   * Bold standalone lines
   */

  if (/^\*\*.+\*\*$/.test(trimmed)) {
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
   * Table separator
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
   * Horizontal rule
   */

  if (/^([-*_])(?:\s*\1){2,}$/.test(trimmed)) {
    return true;
  }

  return false;
}

/* ============================================================
   Normalize Markdown
============================================================ */

function normalizeMarkdown(content: string): string {
  if (!content) {
    return "";
  }

  const normalized = content.replace(/\r\n/g, "\n").replace(/\r/g, "\n").trim();

  if (!normalized) {
    return "";
  }

  const lines = normalized.split("\n");

  const output: string[] = [];

  let insideCodeBlock = false;
  let previousWasProse = false;

  for (let index = 0; index < lines.length; index += 1) {
    const rawLine = lines[index];

    const line = rawLine.trimEnd();
    const trimmed = line.trim();

    /*
     * ==========================================================
     * CODE BLOCK
     * ==========================================================
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

    if (insideCodeBlock) {
      output.push(line);
      previousWasProse = false;

      continue;
    }

    /*
     * ==========================================================
     * EMPTY LINE
     * ==========================================================
     */

    if (!trimmed) {
      if (output.length > 0 && output[output.length - 1] !== "") {
        output.push("");
      }

      previousWasProse = false;

      continue;
    }

    const structural = isStructuralLine(line);

    /*
     * ==========================================================
     * STRUCTURAL MARKDOWN
     * ==========================================================
     */

    if (structural) {
      if (previousWasProse && output.length > 0) {
        output.push("");
      }

      output.push(line);

      previousWasProse = false;

      continue;
    }

    /*
     * ==========================================================
     * NORMAL PROSE
     * ==========================================================
     */

    if (previousWasProse) {
      output.push("");
    }

    output.push(line);

    previousWasProse = true;
  }

  return output
    .join("\n")
    .replace(/\n{3,}/g, "\n\n")
    .trim();
}

/* ============================================================
   Legal Numbering
============================================================ */

type LegalLevel = 1 | 2 | 3 | 4 | 5 | null;

function getLegalLevel(text: string): LegalLevel {
  const value = text.trim();

  /*
   * Level 5
   */

  if (/^\d+\.\d+\.\d+\.\d+\.\d+\.\s+/.test(value)) {
    return 5;
  }

  /*
   * Level 4
   */

  if (/^\d+\.\d+\.\d+\.\d+\.\s+/.test(value)) {
    return 4;
  }

  /*
   * Level 3
   */

  if (/^\d+\.\d+\.\d+\.\s+/.test(value)) {
    return 3;
  }

  /*
   * Level 2
   *
   * Examples:
   *
   * 2.1. Personal Information
   * 2.2. Password
   */

  if (/^\d+\.\d+\.?\s+/.test(value)) {
    return 2;
  }

  /*
   * Level 1
   *
   * Examples:
   *
   * 1. General Information
   * 2. Opening an Account
   */

  if (/^\d+\.\s+/.test(value)) {
    return 1;
  }

  return null;
}

/* ============================================================
   Extract Legal Number
============================================================ */

function getLegalNumber(text: string): string | null {
  const value = text.trim();

  const match = value.match(/^(\d+(?:\.\d+){0,4})\.\s+/);

  return match?.[1] ?? null;
}

/* ============================================================
   Check Whether A Level-2 Section Has Subpoints
============================================================ */

function hasSubpoints(currentNumber: string, fullContent: string): boolean {
  const escapedNumber = currentNumber.replace(/[.*+?^${}()|[\]\\]/g, "\\$&");

  const subpointRegex = new RegExp(
    `(?:^|\\n)\\s*${escapedNumber}\\.\\d+\\.\\s+`,
    "m",
  );

  return subpointRegex.test(fullContent);
}

/* ============================================================
   Check ## Line
============================================================ */

function isDoubleHashLine(text: string): boolean {
  return /^##(?:\s+|$)/.test(text.trim());
}

/* ============================================================
   Legal Paragraph
============================================================ */

interface LegalParagraphProps {
  children?: ReactNode;
  fullContent: string;
}

/**
 * ============================================================
 * SPACING SYSTEM
 * ============================================================
 *
 * Level 3 / 3+:
 *   Small spacing
 *
 * Level 2:
 *   Medium spacing
 *
 * Level 1:
 *   Larger spacing
 *
 * The overall spacing is intentionally tighter than before.
 *
 * ============================================================
 *
 * FONT SYSTEM
 * ============================================================
 *
 * Normal content:
 *   15px / 16px
 *
 * Level 1:
 *   18px
 *
 * Level 2:
 *   Same size as normal content
 *
 * Level 3+:
 *   Same size as normal content
 *
 * ============================================================
 */

function LegalParagraph({ children, fullContent }: LegalParagraphProps) {
  const text = extractText(children);
  const level = getLegalLevel(text);

  const legalNumber = getLegalNumber(text);

  const levelTwoHasSubpoints =
    level === 2 && legalNumber ? hasSubpoints(legalNumber, fullContent) : false;

  /*
   * ==========================================================
   * LEVEL 1
   *
   * 1.
   * 2.
   * 3.
   *
   * ALWAYS BOLD
   *
   * Slightly larger than the rest of the content.
   * ==========================================================
   */

  if (level === 1) {
    return (
      <p
        className="
          m-0
          pt-16
          text-[18px]
          font-bold
          leading-8
          text-white

          first:pt-0

          sm:pt-18
          sm:text-[18px]

          md:pt-20
        "
      >
        {children}
      </p>
    );
  }

  /*
   * ==========================================================
   * LEVEL 2
   *
   * 2.1.
   * 2.2.
   * 2.3.
   *
   * BOLD ONLY IF IT HAS SUBPOINTS.
   *
   * Otherwise normal weight.
   * ==========================================================
   */

  if (level === 2) {
    return (
      <p
        className={`
          m-0
          pt-9
          text-[15px]
          leading-8

          ${
            levelTwoHasSubpoints
              ? "font-bold text-white"
              : "font-normal text-white/75"
          }

          sm:pt-10
          sm:text-base

          md:pt-11
        `}
      >
        {children}
      </p>
    );
  }

  /*
   * ==========================================================
   * LEVEL 3
   *
   * 2.1.1.
   * 2.1.2.
   * 2.1.3.
   *
   * ALWAYS NORMAL
   * ==========================================================
   */

  if (level === 3) {
    return (
      <p
        className="
          m-0
          pt-4
          text-[15px]
          font-normal
          leading-8
          text-white/75

          sm:pt-5
          sm:text-base

          md:pt-5
        "
      >
        {children}
      </p>
    );
  }

  /*
   * ==========================================================
   * LEVEL 4+
   *
   * ALWAYS NORMAL
   * ==========================================================
   */

  if (level !== null) {
    return (
      <p
        className="
          m-0
          pt-3
          text-[15px]
          font-normal
          leading-8
          text-white/75

          sm:pt-4
          sm:text-base

          md:pt-4
        "
      >
        {children}
      </p>
    );
  }

  /*
   * ==========================================================
   * NORMAL PARAGRAPH
   * ==========================================================
   */

  return (
    <p
      className="
        m-0
        text-[15px]
        font-normal
        leading-8
        text-white/75

        sm:text-base
      "
    >
      {children}
    </p>
  );
}

/* ============================================================
   Main Legal Content
============================================================ */

export default function LegalContent({ content }: LegalContentProps) {
  const normalizedContent = normalizeMarkdown(content);

  return (
    <main className="bg-[#050505] text-white">
      {/* ======================================================
          DOCUMENT CONTENT

          The previous Back / Legal header has intentionally
          been removed from this component.

          Page title, Last Updated, Back, and Legal navigation
          should now be handled by page.tsx.
      ====================================================== */}

      <section className="relative">
        {/* Background Glow */}

        <div
          className="
            pointer-events-none
            absolute
            left-1/2
            top-0
            h-175
            w-full
            -translate-x-1/2
            bg-blue-500/[0.012]
            blur-3xl
          "
        />

        <div
          className="
            relative
            mx-auto
            w-full
            max-w-375
            px-3
            py-12

            sm:px-5
            sm:py-16

            md:px-7
            md:py-20

            lg:px-8
            lg:py-24

            xl:px-10
            xl:py-28
          "
        >
          <motion.section
            initial={{
              opacity: 0,
              y: 24,
            }}
            animate={{
              opacity: 1,
              y: 0,
            }}
            transition={{
              duration: 0.5,
            }}
            className="
              rounded-3xl
              border
              border-white/10
              bg-white/2.5
              p-6
              backdrop-blur-sm

              sm:p-8

              md:p-12

              lg:p-14

              xl:p-16
            "
          >
            <article
              className="
                prose
                prose-invert
                max-w-none

                /*
                 * ==================================================
                 * GLOBAL CONTENT SIZE
                 * ==================================================
                 */

                text-[15px]
                leading-8
                text-white/75

                sm:text-base

                /*
                 * ==================================================
                 * REMOVE PROSE DEFAULT SIZE DIFFERENCES
                 * ==================================================
                 */

                prose-p:m-0
                prose-p:text-[15px]
                prose-p:leading-8
                prose-p:text-white/75

                sm:prose-p:text-base

                prose-headings:text-[15px]
                prose-headings:leading-8
                prose-headings:tracking-normal

                sm:prose-headings:text-base

                /*
                 * ==================================================
                 * H1
                 * ==================================================
                 */

                prose-h1:m-0
                prose-h1:text-[15px]
                prose-h1:font-bold
                prose-h1:leading-8
                prose-h1:text-white

                sm:prose-h1:text-base

                /*
                 * ==================================================
                 * H2
                 * ==================================================
                 */

                prose-h2:m-0
                prose-h2:border-0
                prose-h2:border-b
                prose-h2:border-white/10
                prose-h2:pb-4
                prose-h2:pt-16
                prose-h2:text-[15px]
                prose-h2:font-bold
                prose-h2:leading-8
                prose-h2:text-white

                sm:prose-h2:pt-18
                sm:prose-h2:text-base

                md:prose-h2:pt-20

                /*
                 * ==================================================
                 * H3
                 * ==================================================
                 */

                prose-h3:m-0
                prose-h3:pt-9
                prose-h3:text-[15px]
                prose-h3:font-bold
                prose-h3:leading-8
                prose-h3:text-white

                sm:prose-h3:pt-10
                sm:prose-h3:text-base

                md:prose-h3:pt-11

                /*
                 * ==================================================
                 * H4
                 * ==================================================
                 */

                prose-h4:m-0
                prose-h4:pt-7
                prose-h4:text-[15px]
                prose-h4:font-bold
                prose-h4:leading-8
                prose-h4:text-white

                sm:prose-h4:text-base

                /*
                 * ==================================================
                 * STRONG
                 * ==================================================
                 */

                prose-strong:font-bold
                prose-strong:text-white

                /*
                 * ==================================================
                 * LINKS
                 * ==================================================
                 */

                prose-a:text-blue-400
                prose-a:underline
                prose-a:decoration-blue-400/30
                prose-a:underline-offset-4
                prose-a:transition-colors
                prose-a:duration-200

                hover:prose-a:text-blue-300
                hover:prose-a:decoration-blue-400

                /*
                 * ==================================================
                 * LISTS
                 * ==================================================
                 */

                prose-ul:my-5
                prose-ol:my-5

                [&>ul]:pl-5
                [&>ol]:pl-5

                [&_ul]:list-disc
                [&_ol]:list-decimal

                /*
                 * ==================================================
                 * LIST ITEMS
                 * ==================================================
                 */

                prose-li:my-1
                prose-li:text-[15px]
                prose-li:leading-8
                prose-li:text-white/75

                sm:prose-li:text-base

                prose-li:marker:text-blue-400

                /*
                 * ==================================================
                 * NESTED LISTS
                 * ==================================================
                 */

                [&_li>ul]:my-2
                [&_li>ol]:my-2
                [&_li>ul]:pl-5
                [&_li>ol]:pl-5

                /*
                 * ==================================================
                 * BLOCKQUOTE
                 * ==================================================
                 */

                prose-blockquote:my-7
                prose-blockquote:border-l-4
                prose-blockquote:border-blue-400
                prose-blockquote:bg-white/[0.04]
                prose-blockquote:px-6
                prose-blockquote:py-4
                prose-blockquote:text-[15px]
                prose-blockquote:leading-8
                prose-blockquote:text-white/70

                sm:prose-blockquote:text-base

                /*
                 * ==================================================
                 * CODE
                 * ==================================================
                 */

                prose-code:text-[15px]
                prose-code:font-normal
                prose-code:text-blue-300

                sm:prose-code:text-base

                prose-code:before:content-none
                prose-code:after:content-none

                /*
                 * ==================================================
                 * CODE BLOCK
                 * ==================================================
                 */

                prose-pre:my-7
                prose-pre:overflow-x-auto
                prose-pre:rounded-2xl
                prose-pre:border
                prose-pre:border-white/10
                prose-pre:bg-[#0F172A]
                prose-pre:p-5

                /*
                 * ==================================================
                 * TABLE
                 * ==================================================
                 */

                [&_table]:w-full
                [&_table]:min-w-180
                [&_table]:border-separate
                [&_table]:border-spacing-0

                [&_thead_th]:border-b
                [&_thead_th]:border-white/10
                [&_thead_th]:bg-white/6
                [&_thead_th]:px-4
                [&_thead_th]:py-4
                [&_thead_th]:text-left
                [&_thead_th]:text-[15px]
                [&_thead_th]:font-bold
                [&_thead_th]:leading-8
                [&_thead_th]:text-white

                sm:[&_thead_th]:text-base

                md:[&_thead_th]:px-5

                [&_tbody_td]:border-b
                [&_tbody_td]:border-white/[0.07]
                [&_tbody_td]:px-4
                [&_tbody_td]:py-4
                [&_tbody_td]:align-top
                [&_tbody_td]:text-[15px]
                [&_tbody_td]:leading-8
                [&_tbody_td]:text-white/75

                sm:[&_tbody_td]:text-base

                md:[&_tbody_td]:px-5

                [&_td_p]:my-0

                /*
                 * ==================================================
                 * HR
                 * ==================================================
                 */

                prose-hr:my-10
                prose-hr:border-0
                prose-hr:border-t
                prose-hr:border-white/10

                md:prose-hr:my-14

                /*
                 * ==================================================
                 * IMAGES
                 * ==================================================
                 */

                prose-img:my-7
                prose-img:w-full
                prose-img:rounded-2xl
                prose-img:border
                prose-img:border-white/10

                /*
                 * ==================================================
                 * FIRST ELEMENT
                 * ==================================================
                 */

                [&>h1:first-child]:pt-0
                [&>h2:first-child]:pt-0
                [&>h3:first-child]:pt-0
                [&>p:first-child]:pt-0

                /*
                 * ==================================================
                 * LAST ELEMENT
                 * ==================================================
                 */

                [&>p:last-child]:mb-0
                [&>ul:last-child]:mb-0
                [&>ol:last-child]:mb-0
              "
            >
              <ReactMarkdown
                remarkPlugins={[remarkGfm]}
                rehypePlugins={[rehypeRaw]}
                components={{
                  /* ==================================================
                     PARAGRAPH
                  ================================================== */

                  p: ({ children }) => {
                    const text = extractText(children);
                    const level = getLegalLevel(text);

                    /*
                     * Numbered legal content
                     */

                    if (level !== null) {
                      return (
                        <LegalParagraph fullContent={normalizedContent}>
                          {children}
                        </LegalParagraph>
                      );
                    }

                    /*
                     * Lines beginning with ##
                     *
                     * These should be bold.
                     */

                    if (isDoubleHashLine(text)) {
                      return (
                        <p
                          className="
                            m-0
                            text-[15px]
                            font-bold
                            leading-8
                            text-white

                            sm:text-base
                          "
                        >
                          {children}
                        </p>
                      );
                    }

                    /*
                     * Normal paragraph
                     */

                    return (
                      <p
                        className="
                          m-0
                          text-[15px]
                          font-normal
                          leading-8
                          text-white/75

                          sm:text-base
                        "
                      >
                        {children}
                      </p>
                    );
                  },

                  /* ==================================================
                     H1
                  ================================================== */

                  h1: ({ children }) => (
                    <h1
                      className="
                        m-0
                        text-[15px]
                        font-bold
                        leading-8
                        text-white

                        sm:text-base
                      "
                    >
                      {children}
                    </h1>
                  ),

                  /* ==================================================
                     H2
                  ================================================== */

                  h2: ({ children }) => (
                    <h2
                      className="
                        m-0
                        border-0
                        border-b
                        border-white/10
                        pb-4
                        pt-16
                        text-[15px]
                        font-bold
                        leading-8
                        text-white

                        first:pt-0

                        sm:pt-18
                        sm:text-base

                        md:pt-20
                      "
                    >
                      {children}
                    </h2>
                  ),

                  /* ==================================================
                     H3
                  ================================================== */

                  h3: ({ children }) => (
                    <h3
                      className="
                        m-0
                        pt-9
                        text-[15px]
                        font-bold
                        leading-8
                        text-white

                        sm:pt-10
                        sm:text-base

                        md:pt-11
                      "
                    >
                      {children}
                    </h3>
                  ),

                  /* ==================================================
                     H4
                  ================================================== */

                  h4: ({ children }) => (
                    <h4
                      className="
                        m-0
                        pt-7
                        text-[15px]
                        font-bold
                        leading-8
                        text-white

                        sm:text-base
                      "
                    >
                      {children}
                    </h4>
                  ),

                  /* ==================================================
                     UNORDERED LIST
                  ================================================== */

                  ul: ({ children }) => (
                    <ul
                      className="
                        my-5
                        list-disc
                        space-y-1
                        pl-5
                      "
                    >
                      {children}
                    </ul>
                  ),

                  /* ==================================================
                     ORDERED LIST
                  ================================================== */

                  ol: ({ children }) => (
                    <ol
                      className="
                        my-5
                        list-decimal
                        space-y-1
                        pl-5
                      "
                    >
                      {children}
                    </ol>
                  ),

                  /* ==================================================
                     LIST ITEM
                  ================================================== */

                  li: ({ children }) => (
                    <li
                      className="
                        my-1
                        pl-0
                        text-[15px]
                        font-normal
                        leading-8
                        text-white/75

                        sm:text-base
                      "
                    >
                      {children}
                    </li>
                  ),

                  /* ==================================================
                     BLOCKQUOTE
                  ================================================== */

                  blockquote: ({ children }) => (
                    <blockquote
                      className="
                        my-7
                        border-l-4
                        border-blue-400
                        bg-white/4
                        px-6
                        py-4
                        text-[15px]
                        leading-8
                        text-white/70
                        not-italic

                        sm:text-base
                      "
                    >
                      {children}
                    </blockquote>
                  ),

                  /* ==================================================
                     HORIZONTAL RULE
                  ================================================== */

                  hr: () => (
                    <hr
                      className="
                        my-10
                        border-0
                        border-t
                        border-white/10

                        md:my-14
                      "
                    />
                  ),

                  /* ==================================================
                     TABLE
                  ================================================== */

                  table: ({ children }) => (
                    <div
                      className="
                        my-7
                        w-full
                        overflow-x-auto
                        rounded-2xl
                        border
                        border-white/10
                        bg-white/2
                      "
                    >
                      <table>{children}</table>
                    </div>
                  ),

                  /* ==================================================
                     TABLE HEADER
                  ================================================== */

                  th: ({ children }) => <th scope="col">{children}</th>,

                  /* ==================================================
                     TABLE CELL
                  ================================================== */

                  td: ({ children }) => <td>{children}</td>,

                  /* ==================================================
                     LINKS
                  ================================================== */

                  a: ({ href, children, ...props }) => {
                    const isExternal =
                      href?.startsWith("http://") ||
                      href?.startsWith("https://");

                    return (
                      <a
                        href={href}
                        target={isExternal ? "_blank" : undefined}
                        rel={isExternal ? "noopener noreferrer" : undefined}
                        {...props}
                      >
                        {children}
                      </a>
                    );
                  },

                  /* ==================================================
                     STRONG
                  ================================================== */

                  strong: ({ children }) => (
                    <strong className="font-bold text-white">{children}</strong>
                  ),

                  /* ==================================================
                     BR
                  ================================================== */

                  br: () => <br />,
                }}
              >
                {normalizedContent}
              </ReactMarkdown>
            </article>
          </motion.section>
        </div>
      </section>
    </main>
  );
}
