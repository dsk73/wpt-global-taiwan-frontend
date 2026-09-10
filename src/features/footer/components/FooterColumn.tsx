// src/features/footer/components/FooterColumn.tsx

import Link from "next/link";

import { cn } from "@/lib/utils";

export interface FooterColumnItem {
  label: string;
  href: string;
  external?: boolean;
}

interface FooterColumnProps {
  title: string;
  items: FooterColumnItem[];
  className?: string;
}

export default function FooterColumn({
  title,
  items,
  className,
}: FooterColumnProps) {
  return (
    <div className={cn("self-start", className)}>
      {/* Heading */}
      {title && (
        <h3 className="mb-5 text-lg font-semibold tracking-wide text-white">
          {title}
        </h3>
      )}

      {/* Links */}
      <ul className="flex flex-col gap-3">
        {items.map((item) => (
          <li key={item.label}>
            <Link
              href={item.href}
              target={item.external ? "_blank" : undefined}
              rel={item.external ? "noopener noreferrer" : undefined}
              className="
                inline-flex
                items-center
                text-sm
                leading-6
                text-white/60
                transition-all
                duration-300
                hover:translate-x-1
                hover:text-blue-400
              "
            >
              {item.label}
            </Link>
          </li>
        ))}
      </ul>
    </div>
  );
}
