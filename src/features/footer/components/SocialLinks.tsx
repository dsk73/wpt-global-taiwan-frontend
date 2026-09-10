// src/features/footer/components/SocialLinks.tsx

import Link from "next/link";

import { cn } from "@/lib/utils";

export interface SocialLink {
  label: string;
  href: string;
}

interface SocialLinksProps {
  title: string;
  links: SocialLink[];
  className?: string;
}

export default function SocialLinks({
  title,
  links,
  className,
}: SocialLinksProps) {
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
        {links.map((link) => (
          <li key={link.label}>
            <Link
              href={link.href}
              target="_blank"
              rel="noopener noreferrer"
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
              {link.label}
            </Link>
          </li>
        ))}
      </ul>
    </div>
  );
}
