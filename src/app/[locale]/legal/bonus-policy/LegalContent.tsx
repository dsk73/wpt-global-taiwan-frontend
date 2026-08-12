"use client";

import { motion } from "framer-motion";
import ReactMarkdown from "react-markdown";
import remarkGfm from "remark-gfm";
import rehypeRaw from "rehype-raw";

/* ============================================================
   Legal Content Props
============================================================ */

interface LegalContentProps {
  content: string;
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

    /* ========================================================
       CODE BLOCK
    ======================================================== */

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

    /* ========================================================
       EMPTY LINE
    ======================================================== */

    if (!trimmed) {
      if (output.length > 0 && output[output.length - 1] !== "") {
        output.push("");
      }

      previousWasProse = false;

      continue;
    }

    /* ========================================================
       STRUCTURAL MARKDOWN
       
       Keep headings and list items together so that Markdown
       can correctly construct lists.
    ======================================================== */

    const structural =
      /^#{1,6}\s+/.test(trimmed) ||
      /^[-*+]\s+/.test(trimmed) ||
      /^\d+[.)]\s+/.test(trimmed) ||
      /^>\s?/.test(trimmed) ||
      /^(```|~~~)/.test(trimmed) ||
      /^([-*_])(?:\s*\1){2,}$/.test(trimmed);

    if (structural) {
      if (previousWasProse && output.length > 0) {
        output.push("");
      }

      output.push(line);
      previousWasProse = false;

      continue;
    }

    /* ========================================================
       NORMAL PROSE
    ======================================================== */

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
   Main Legal Content
============================================================ */

export default function LegalContent({ content }: LegalContentProps) {
  const normalizedContent = normalizeMarkdown(content);

  return (
    <main className="bg-[#050505] text-white">
      {/* ======================================================
          DOCUMENT CONTENT

          Page title, Back, Legal navigation and Last Updated
          are handled by page.tsx.
      ====================================================== */}

      <section className="relative">
        {/* ====================================================
            BACKGROUND GLOW
        ==================================================== */}

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

        {/* ====================================================
            CONTENT CONTAINER
        ==================================================== */}

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
          {/* ==================================================
              CONTENT CARD
          ================================================== */}

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
            {/* ==================================================
                ARTICLE
            ================================================== */}

            <article
              className="
                prose
                prose-invert
                max-w-none

                text-[15px]
                leading-8
                text-white/75

                sm:text-base

                /*
                 * ==================================================
                 * PARAGRAPHS
                 * ==================================================
                 */

                prose-p:m-0
                prose-p:text-[15px]
                prose-p:leading-8
                prose-p:text-white/75

                sm:prose-p:text-base

                /*
                 * ==================================================
                 * HEADINGS
                 * ==================================================
                 */

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
                prose-h1:pt-0
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
                 * BOLD TEXT
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
                 * HORIZONTAL RULE
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

                  p: ({ children }) => (
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
                  ),

                  /* ==================================================
                     H1
                  ================================================== */

                  h1: ({ children }) => (
                    <h1
                      className="
                        m-0
                        pt-0
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
