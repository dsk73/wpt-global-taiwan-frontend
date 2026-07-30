//src/features/header/components/Header.tsx

"use client";

import Link from "next/link";
import Image from "next/image";
import { useEffect, useMemo, useState } from "react";
import { usePathname } from "next/navigation";

import clsx from "clsx";

import { Menu, X, ChevronDown } from "lucide-react";

import {
  NAVIGATION,
  HEADER_ACTIONS,
  TOPBAR_LINKS,
  LANGUAGES,
} from "@/config/navigation";

import type { Locale } from "@/types/navigation";

export default function Header() {
  const pathname = usePathname();

  const locale = useMemo<Locale>(() => {
    const segment = pathname.split("/")[1];

    if (segment === "en") return "en";

    if (segment === "ms-MY") return "ms-MY";

    return "zh-Hant-TW";
  }, [pathname]);

  const [mobileOpen, setMobileOpen] = useState(false);

  const [languageOpen, setLanguageOpen] = useState(false);

  useEffect(() => {
    document.body.style.overflow = mobileOpen ? "hidden" : "";

    return () => {
      document.body.style.overflow = "";
    };
  }, [mobileOpen]);

  const localizedHref = (href: string) => {
    return `/${locale}${href}`;
  };

  const switchLanguage = (newLocale: string) => {
    const parts = pathname.split("/");

    parts[1] = newLocale;

    // eslint-disable-next-line react-hooks/immutability
    window.location.href = parts.join("/");
  };

  return (
    <header className="fixed inset-x-0 top-0 z-50 border-b border-white/10 bg-[#070B15] shadow-sm transition-colors duration-300">
      {/* ========================= */}
      {/* TOP BAR */}
      {/* ========================= */}

      <div className="hidden border-b border-white/10 bg-[#070B15] lg:block">
        <div className="container flex h-10 items-center justify-between text-sm">
          <div className="flex items-center gap-6">
            {TOPBAR_LINKS.map((item) => {
              const isFaq = item.href === "/faq";
              const isPartnership = item.href === "/partnership";

              return (
                <Link
                  key={item.href}
                  href={
                    isFaq
                      ? localizedHref("/#faq")
                      : isPartnership
                        ? "https://lin.ee/Ow9fvQx"
                        : localizedHref(item.href)
                  }
                  target={isPartnership ? "_blank" : undefined}
                  rel={isPartnership ? "noopener noreferrer" : undefined}
                  className="text-slate-300 transition hover:text-white"
                >
                  {item.label[locale]}
                </Link>
              );
            })}
          </div>

          <div className="relative">
            <button
              onClick={() => setLanguageOpen(!languageOpen)}
              className="flex items-center gap-2 text-slate-300 hover:text-white"
            >
              {LANGUAGES.find((l) => l.code === locale)?.short}

              <ChevronDown size={16} />
            </button>

            {languageOpen && (
              <div className="absolute right-0 mt-3 w-44 overflow-hidden rounded-xl border border-white/10 bg-slate-900 shadow-2xl">
                {LANGUAGES.map((lang) => (
                  <button
                    key={lang.code}
                    onClick={() => switchLanguage(lang.code)}
                    className="flex w-full items-center justify-between px-4 py-3 text-left hover:bg-slate-800"
                  >
                    <span>{lang.name}</span>

                    <span className="text-xs text-slate-400">{lang.short}</span>
                  </button>
                ))}
              </div>
            )}
          </div>
        </div>
      </div>

      {/* ========================= */}
      {/* MAIN NAVBAR */}
      {/* ========================= */}

      <div className="container flex h-20 items-center justify-between">
        {/* ========================= */}
        {/* LOGO */}
        {/* ========================= */}

        <Link
          href={localizedHref("/")}
          className="flex items-center gap-3 shrink-0"
        >
          <Image
            src="/logos/wpt-logo.png"
            alt="WPT Global Taiwan"
            width={140}
            height={63}
            priority
            className="h-12 lg:h-14"
            style={{ width: "auto" }}
          />
        </Link>

        {/* ========================= */}
        {/* DESKTOP NAVIGATION */}
        {/* ========================= */}

        <nav className="hidden items-center gap-10 lg:flex">
          {NAVIGATION.map((item) => {
            const active = pathname === localizedHref(item.href);

            return (
              <Link
                key={item.href}
                href={localizedHref(item.href)}
                className={clsx(
                  "relative text-sm font-medium transition duration-200",
                  active ? "text-white" : "text-slate-300 hover:text-white",
                )}
              >
                {item.label[locale]}

                {active && (
                  <span className="absolute -bottom-2 left-0 h-0.5 w-full rounded-full bg-(--primary)" />
                )}
              </Link>
            );
          })}
        </nav>

        {/* ========================= */}
        {/* DESKTOP ACTIONS */}
        {/* ========================= */}

        <div className="hidden items-center gap-3 lg:flex">
          {HEADER_ACTIONS.map((action) => (
            <Link
              key={action.href}
              href={localizedHref(action.href)}
              className={
                action.variant === "primary"
                  ? "btn btn-primary"
                  : "btn btn-secondary"
              }
            >
              {action.label[locale]}
            </Link>
          ))}
        </div>

        {/* ========================= */}
        {/* MOBILE MENU BUTTON */}
        {/* ========================= */}

        <button
          aria-label="Toggle Menu"
          onClick={() => setMobileOpen(true)}
          className="flex h-11 w-11 items-center justify-center rounded-xl border border-white/10 bg-white/5 transition hover:bg-white/10 lg:hidden"
        >
          <Menu size={22} />
        </button>
      </div>

      {/* ========================= */}
      {/* MOBILE DRAWER */}
      {/* ========================= */}

      <div
        className={clsx(
          "fixed inset-0 z-60 lg:hidden transition-all duration-300",
          mobileOpen ? "visible opacity-100" : "invisible opacity-0",
        )}
      >
        {/* Overlay */}

        <div
          onClick={() => setMobileOpen(false)}
          className="absolute inset-0 bg-black/70 backdrop-blur-sm"
        />

        {/* Drawer */}

        <aside
          className={clsx(
            "absolute right-0 top-0 flex h-full w-[320px] max-w-[90vw] flex-col bg-slate-950 shadow-2xl transition-transform duration-300",
            mobileOpen ? "translate-x-0" : "translate-x-full",
          )}
        >
          {/* Drawer Header */}

          <div className="flex h-20 items-center justify-between border-b border-white/10 px-6">
            <Image
              src="/logos/wpt-logo.png"
              alt="WPT"
              width={110}
              height={50}
              className="h-11"
              style={{ width: "auto" }}
            />

            <button
              onClick={() => setMobileOpen(false)}
              className="rounded-lg border border-white/10 p-2"
            >
              <X size={20} />
            </button>
          </div>

          <div className="flex flex-1 flex-col px-6 py-8">
            {/* ========================= */}
            {/* MOBILE NAVIGATION */}
            {/* ========================= */}

            <nav className="flex flex-col gap-2">
              {NAVIGATION.map((item) => {
                const active = pathname === localizedHref(item.href);

                return (
                  <Link
                    key={item.href}
                    href={localizedHref(item.href)}
                    onClick={() => setMobileOpen(false)}
                    className={clsx(
                      "rounded-xl px-4 py-3 text-base font-medium transition",
                      active
                        ? "bg-(--primary) text-black"
                        : "text-slate-300 hover:bg-white/5 hover:text-white",
                    )}
                  >
                    {item.label[locale]}
                  </Link>
                );
              })}
            </nav>

            {/* ========================= */}
            {/* MOBILE LANGUAGE */}
            {/* ========================= */}

            <div className="mt-8">
              <p className="mb-3 text-xs font-semibold uppercase tracking-wider text-slate-500">
                Language
              </p>

              <div className="grid grid-cols-3 gap-2">
                {LANGUAGES.map((lang) => (
                  <button
                    key={lang.code}
                    onClick={() => switchLanguage(lang.code)}
                    className={clsx(
                      "rounded-lg border px-3 py-2 text-sm font-medium transition",
                      locale === lang.code
                        ? "border-(--primary) bg-(--primary) text-black"
                        : "border-white/10 bg-white/5 text-slate-300 hover:bg-white/10",
                    )}
                  >
                    {lang.short}
                  </button>
                ))}
              </div>
            </div>

            {/* ========================= */}
            {/* MOBILE CTA */}
            {/* ========================= */}

            <div className="mt-auto space-y-3 pt-10">
              {HEADER_ACTIONS.map((action) => (
                <Link
                  key={action.href}
                  href={localizedHref(action.href)}
                  onClick={() => setMobileOpen(false)}
                  className={
                    action.variant === "primary"
                      ? "btn btn-primary w-full"
                      : "btn btn-secondary w-full"
                  }
                >
                  {action.label[locale]}
                </Link>
              ))}
            </div>
          </div>
        </aside>
      </div>
    </header>
  );
}
