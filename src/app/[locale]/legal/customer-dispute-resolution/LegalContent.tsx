// src/app/[locale]/legal/customer-dispute-resolution/LegalContent.tsx

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

          This section intentionally follows the clean,
          full-width document layout from the reference page.

          No card.
          No rounded container.
          No glass effect.
          No border around the article.
      ====================================================== */}

      <section className="relative">
        {/* ====================================================
            SUBTLE BACKGROUND GLOW
        ==================================================== */}

        <div
          className="
            pointer-events-none
            absolute
            left-1/2
            top-0
            h-150
            w-full
            -translate-x-1/2
            bg-blue-500/[0.008]
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

            px-5
            pt-4
            pb-14

            sm:px-8
            sm:pt-5
            sm:pb-16

            md:px-10
            md:pt-6
            md:pb-20

            lg:px-12
            lg:pt-7
            lg:pb-24

            xl:px-14
            xl:pt-8
            xl:pb-28
          "
        >
          {/* ==================================================
              ARTICLE
          ================================================== */}

          <motion.article
            initial={{
              opacity: 0,
              y: 16,
            }}
            animate={{
              opacity: 1,
              y: 0,
            }}
            transition={{
              duration: 0.45,
              ease: "easeOut",
            }}
            className="
              prose
              prose-invert
              max-w-none

              text-[16px]
              leading-[1.8]
              text-white/75

              sm:text-[17px]

              md:text-[18px]
              md:leading-[1.75]

              /*
               * ==================================================
               * PARAGRAPHS
               * ==================================================
               */

              prose-p:m-0
              prose-p:mb-6
              prose-p:text-[16px]
              prose-p:font-normal
              prose-p:leading-[1.8]
              prose-p:text-white/75

              sm:prose-p:text-[17px]

              md:prose-p:text-[18px]
              md:prose-p:leading-[1.75]

              /*
               * ==================================================
               * HEADINGS
               * ==================================================
               */

              prose-headings:m-0
              prose-headings:tracking-normal
              prose-headings:text-white

              /*
               * ==================================================
               * H1
               * ==================================================
               */

              prose-h1:mb-6
              prose-h1:pt-0
              prose-h1:text-[20px]
              prose-h1:font-bold
              prose-h1:leading-[1.4]
              prose-h1:text-white

              sm:prose-h1:text-[21px]

              md:prose-h1:text-[22px]

              /*
               * ==================================================
               * H2
               * ==================================================
               */

              prose-h2:mb-5
              prose-h2:mt-10
              prose-h2:border-0
              prose-h2:p-0
              prose-h2:text-[19px]
              prose-h2:font-bold
              prose-h2:leading-[1.5]
              prose-h2:text-white

              sm:prose-h2:text-[20px]

              md:prose-h2:text-[21px]

              /*
               * ==================================================
               * H3
               * ==================================================
               */

              prose-h3:mb-4
              prose-h3:mt-8
              prose-h3:p-0
              prose-h3:text-[18px]
              prose-h3:font-bold
              prose-h3:leading-[1.5]
              prose-h3:text-white

              sm:prose-h3:text-[19px]

              md:prose-h3:text-[20px]

              /*
               * ==================================================
               * H4
               * ==================================================
               */

              prose-h4:mb-3
              prose-h4:mt-7
              prose-h4:p-0
              prose-h4:text-[17px]
              prose-h4:font-bold
              prose-h4:leading-[1.5]
              prose-h4:text-white

              sm:prose-h4:text-[18px]

              /*
               * ==================================================
               * STRONG / BOLD
               * ==================================================
               */

              prose-strong:font-bold
              prose-strong:text-white

              /*
               * ==================================================
               * LINKS
               * ==================================================
               */

              prose-a:font-normal
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

              prose-ul:pl-6
              prose-ol:pl-6

              [&_ul]:list-disc
              [&_ol]:list-decimal

              /*
               * ==================================================
               * LIST ITEMS
               * ==================================================
               */

              prose-li:my-1
              prose-li:text-[16px]
              prose-li:leading-[1.8]
              prose-li:text-white/75

              sm:prose-li:text-[17px]

              md:prose-li:text-[18px]
              md:prose-li:leading-[1.75]

              prose-li:marker:text-blue-400

              /*
               * ==================================================
               * NESTED LISTS
               * ==================================================
               */

              [&_li>ul]:my-2
              [&_li>ol]:my-2
              [&_li>ul]:pl-6
              [&_li>ol]:pl-6

              /*
               * ==================================================
               * BLOCKQUOTE
               * ==================================================
               */

              prose-blockquote:my-7
              prose-blockquote:border-l-4
              prose-blockquote:border-blue-400
              prose-blockquote:bg-white/[0.035]
              prose-blockquote:px-6
              prose-blockquote:py-4
              prose-blockquote:text-[16px]
              prose-blockquote:leading-[1.8]
              prose-blockquote:text-white/70

              sm:prose-blockquote:text-[17px]

              /*
               * ==================================================
               * INLINE CODE
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
              prose-pre:rounded-xl
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
              [&_thead_th]:bg-white/5
              [&_thead_th]:px-4
              [&_thead_th]:py-4
              [&_thead_th]:text-left
              [&_thead_th]:text-[15px]
              [&_thead_th]:font-bold
              [&_thead_th]:leading-7
              [&_thead_th]:text-white

              sm:[&_thead_th]:text-base

              md:[&_thead_th]:px-5

              [&_tbody_td]:border-b
              [&_tbody_td]:border-white/[0.07]
              [&_tbody_td]:px-4
              [&_tbody_td]:py-4
              [&_tbody_td]:align-top
              [&_tbody_td]:text-[15px]
              [&_tbody_td]:leading-7
              [&_tbody_td]:text-white/75

              sm:[&_tbody_td]:text-base

              md:[&_tbody_td]:px-5

              [&_td_p]:my-0

              /*
               * ==================================================
               * HORIZONTAL RULE
               * ==================================================
               */

              prose-hr:my-8
              prose-hr:border-0
              prose-hr:border-t
              prose-hr:border-white/10

              md:prose-hr:my-10

              /*
               * ==================================================
               * IMAGES
               * ==================================================
               */

              prose-img:my-7
              prose-img:w-full
              prose-img:rounded-xl
              prose-img:border
              prose-img:border-white/10

              /*
               * ==================================================
               * FIRST ELEMENT
               * ==================================================
               */

              [&>h1:first-child]:mt-0
              [&>h1:first-child]:pt-0

              [&>h2:first-child]:mt-0
              [&>h2:first-child]:pt-0

              [&>h3:first-child]:mt-0
              [&>h3:first-child]:pt-0

              [&>p:first-child]:mt-0

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
                      mb-6
                      text-[16px]
                      font-normal
                      leading-[1.8]
                      text-white/75

                      sm:text-[17px]

                      md:text-[18px]
                      md:leading-[1.75]
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
                      mb-6
                      pt-0
                      text-[20px]
                      font-bold
                      leading-[1.4]
                      text-white

                      sm:text-[21px]

                      md:text-[22px]
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
                      mb-5
                      mt-10
                      pt-0
                      text-[19px]
                      font-bold
                      leading-normal
                      text-white

                      sm:text-[20px]

                      md:text-[21px]
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
                      mb-4
                      mt-8
                      pt-0
                      text-[18px]
                      font-bold
                      leading-normal
                      text-white

                      sm:text-[19px]

                      md:text-[20px]
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
                      mb-3
                      mt-7
                      pt-0
                      text-[17px]
                      font-bold
                      leading-normal
                      text-white

                      sm:text-[18px]
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
                      pl-6
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
                      pl-6
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
                      text-[16px]
                      font-normal
                      leading-[1.8]
                      text-white/75

                      sm:text-[17px]

                      md:text-[18px]
                      md:leading-[1.75]
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
                      bg-white/[0.035]
                      px-6
                      py-4
                      text-[16px]
                      leading-[1.8]
                      text-white/70
                      not-italic

                      sm:text-[17px]
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
                      my-8
                      border-0
                      border-t
                      border-white/10

                      md:my-10
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
                      rounded-xl
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
                    href?.startsWith("http://") || href?.startsWith("https://");

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
          </motion.article>
        </div>
      </section>
    </main>
  );
}
